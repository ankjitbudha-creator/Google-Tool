import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TrophyIcon, ClockIcon, CursorArrowRaysIcon, ArrowPathIcon } from '../../components/Icons';

type GameState = 'idle' | 'running' | 'finished';

const DURATION_OPTIONS = [5, 10, 30, 60];

const HistoryGraph: React.FC<{ history: number[], duration: number }> = ({ history, duration }) => {
    const cpsPerSecond = useMemo(() => {
        const buckets = Array(duration).fill(0);
        history.forEach(timestamp => {
            const second = Math.floor(timestamp);
            if (second >= 0 && second < duration) {
                buckets[second]++;
            }
        });
        return buckets;
    }, [history, duration]);

    const maxCps = Math.max(...cpsPerSecond, 5);

    return (
        <div className="w-full h-40 p-4 bg-gray-100 dark:bg-slate-700/50 rounded-lg">
            <svg width="100%" height="100%" viewBox={`0 0 ${duration * 20} 100`} preserveAspectRatio="none">
                {cpsPerSecond.map((cps, index) => (
                    <rect
                        key={index}
                        x={index * 20}
                        y={100 - (cps / maxCps) * 100}
                        width="15"
                        height={(cps / maxCps) * 100}
                        className="fill-current text-primary"
                        rx="2"
                    />
                ))}
            </svg>
        </div>
    );
};


export const CPSTest: React.FC = () => {
    const [selectedDuration, setSelectedDuration] = useState<number>(5);
    const [gameState, setGameState] = useState<GameState>('idle');
    const [timer, setTimer] = useState<number>(selectedDuration);
    const [clickCount, setClickCount] = useState<number>(0);
    const [highScore, setHighScore] = useState(0);
    const [clickHistory, setClickHistory] = useState<number[]>([]);
    
    const intervalRef = useRef<number | null>(null);

    const cps = useMemo(() => {
        if (gameState !== 'finished') return 0;
        return clickCount / selectedDuration;
    }, [clickCount, selectedDuration, gameState]);

    useEffect(() => {
        const savedScore = localStorage.getItem(`cps_highscore_${selectedDuration}`);
        setHighScore(savedScore ? parseFloat(savedScore) : 0);
        handleReset(selectedDuration);
    }, [selectedDuration]);

    useEffect(() => {
        if (gameState === 'running') {
            const startTime = Date.now();
            intervalRef.current = window.setInterval(() => {
                const elapsedTime = (Date.now() - startTime) / 1000;
                const newTimerValue = selectedDuration - elapsedTime;
                
                if (newTimerValue <= 0) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setGameState('finished');
                    setTimer(0);
                    const finalCps = clickCount / selectedDuration;
                    if (finalCps > highScore) {
                        setHighScore(finalCps);
                        localStorage.setItem(`cps_highscore_${selectedDuration}`, finalCps.toFixed(2));
                    }
                } else {
                    setTimer(newTimerValue);
                }
            }, 50); // Update timer more frequently for smoothness
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [gameState, clickCount, selectedDuration, highScore]);

    const handleDurationChange = (newDuration: number) => {
        setSelectedDuration(newDuration);
    };
    
    const handleReset = (duration = selectedDuration) => {
        setGameState('idle');
        setTimer(duration);
        setClickCount(0);
        setClickHistory([]);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
    
    const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (gameState === 'idle') {
            setGameState('running');
        }
        if (gameState === 'running') {
            setClickCount(prev => prev + 1);
            setClickHistory(prev => [...prev, Date.now()]);

            // Ripple effect
            const clickArea = e.currentTarget;
            const ripple = document.createElement('span');
            const rect = clickArea.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            ripple.className = 'ripple';
            clickArea.appendChild(ripple);
            ripple.onanimationend = () => ripple.remove();
        }
    };
    
    const getRank = (cpsScore: number) => {
        if (cpsScore < 5) return { name: "Turtle", color: "text-gray-500" };
        if (cpsScore < 8) return { name: "Average", color: "text-blue-500" };
        if (cpsScore < 11) return { name: "Cheetah", color: "text-green-500" };
        if (cpsScore < 15) return { name: "Pro", color: "text-purple-500" };
        return { name: "Godlike", color: "text-amber-500" };
    };

    const handleShare = () => {
        const textToCopy = `I scored ${cps.toFixed(2)} CPS in the ${selectedDuration}-second test on Babal Tools! Can you beat me? ${window.location.href}`;
        navigator.clipboard.writeText(textToCopy);
    };

    const rank = getRank(cps);

    const clickAreaClass = `w-full h-80 rounded-lg flex items-center justify-center text-3xl font-bold text-white transition-all duration-300 select-none relative overflow-hidden shadow-lg ${
        gameState === 'idle' ? 'bg-indigo-500 cursor-pointer hover:bg-indigo-600' :
        gameState === 'running' ? 'bg-emerald-500 cursor-pointer' :
        'bg-slate-700 cursor-default'
    }`;
    
    return (
        <div className="flex flex-col items-center space-y-6">
            <style>{`
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    background-color: rgba(255, 255, 255, 0.7);
                }
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `}</style>
            
            <div className="w-full">
                <div className="flex justify-center bg-gray-200 dark:bg-slate-800 rounded-lg p-1">
                    {DURATION_OPTIONS.map(duration => (
                        <button 
                            key={duration}
                            onClick={() => handleDurationChange(duration)}
                            disabled={gameState === 'running'}
                            className={`w-full py-2 rounded-md transition text-sm font-semibold disabled:cursor-not-allowed ${selectedDuration === duration ? 'bg-primary text-white shadow-md' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                            {duration} seconds
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full text-center">
                <StatCard icon={ClockIcon} title="Time" value={`${timer.toFixed(1)}s`} />
                <StatCard icon={CursorArrowRaysIcon} title="Clicks" value={clickCount.toString()} />
                <StatCard icon={TrophyIcon} title="High Score" value={highScore.toFixed(2)} />
                <StatCard icon={TrophyIcon} title="Current CPS" value={(clickCount / Math.max(0.1, selectedDuration - timer)).toFixed(2)} />
            </div>

            <div className={clickAreaClass} onClick={handleAreaClick}>
                {gameState === 'idle' && 'Click to Start'}
                {gameState === 'running' && 'Click!'}
                {gameState === 'finished' && 'Finished!'}
            </div>
            
            {gameState === 'finished' && (
                <div className="w-full max-w-2xl p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl text-center animate-fade-in space-y-4 border dark:border-slate-700">
                    <h3 className="text-3xl font-bold">Your Score: <span className="text-primary">{cps.toFixed(2)} CPS</span></h3>
                    <p className={`text-2xl font-semibold ${rank.color}`}>{rank.name}</p>
                    <HistoryGraph history={clickHistory.map(ts => (ts - clickHistory[0]) / 1000)} duration={selectedDuration} />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={() => handleReset()} className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <ArrowPathIcon className="w-5 h-5"/> Try Again
                        </button>
                         <button onClick={handleShare} className="w-full px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 font-bold rounded-lg transition-colors">
                           Share Score
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard: React.FC<{ icon: React.FC<any>, title: string, value: string }> = ({ icon: Icon, title, value }) => (
    <div className="p-4 bg-gray-100 dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Icon className="w-4 h-4" />
            <p className="text-sm font-medium">{title}</p>
        </div>
        <p className="text-3xl font-bold text-primary dark:text-indigo-400">{value}</p>
    </div>
);
