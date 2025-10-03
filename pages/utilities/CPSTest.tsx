import React, { useState, useEffect, useRef } from 'react';

type GameState = 'idle' | 'running' | 'finished';

const TEST_DURATION = 5; // seconds

export const CPSTest: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [timer, setTimer] = useState<number>(TEST_DURATION);
    const [clickCount, setClickCount] = useState<number>(0);
    
    const intervalRef = useRef<number | null>(null);

    const cps = (clickCount / TEST_DURATION).toFixed(2);

    useEffect(() => {
        if (gameState === 'running') {
            intervalRef.current = window.setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        setGameState('finished');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [gameState]);

    const handleStart = () => {
        setGameState('running');
    };
    
    const handleReset = () => {
        setGameState('idle');
        setTimer(TEST_DURATION);
        setClickCount(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
    
    const handleClick = () => {
        if (gameState === 'running') {
            setClickCount(prev => prev + 1);
        }
    };
    
    const getButtonText = () => {
        switch(gameState) {
            case 'idle': return 'Click here to start';
            case 'running': return 'Click as fast as you can!';
            case 'finished': return 'Test Finished!';
        }
    }

    const getRank = (cpsScore: number) => {
        if (cpsScore < 5) return "Slow";
        if (cpsScore < 8) return "Average";
        if (cpsScore < 10) return "Fast";
        return "Insane!";
    }
    
    const clickAreaClass = `w-full h-64 rounded-lg flex items-center justify-center text-3xl font-bold text-white transition-colors duration-200 select-none ${
        gameState === 'idle' ? 'bg-indigo-500 cursor-pointer hover:bg-indigo-600' :
        gameState === 'running' ? 'bg-emerald-500 cursor-pointer' :
        'bg-gray-500 cursor-default'
    }`;

    return (
        <div className="flex flex-col items-center space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full text-center">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Time Remaining</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{timer}s</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Clicks</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{clickCount}</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg col-span-2 md:col-span-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">CPS</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {gameState === 'finished' ? cps : '0.00'}
                    </p>
                </div>
            </div>

            <div 
                className={clickAreaClass}
                onClick={gameState === 'idle' ? handleStart : handleClick}
            >
                {getButtonText()}
            </div>
            
            {gameState === 'finished' && (
                <div className="text-center w-full p-6 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Your Score: {cps} CPS</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Total Clicks: {clickCount}</p>
                    <p className="mt-2 text-xl font-semibold text-primary">Rank: {getRank(parseFloat(cps))}</p>
                    <button 
                        onClick={handleReset}
                        className="mt-4 px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-full transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}
             {gameState !== 'finished' && (
                 <button 
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors disabled:opacity-50"
                    disabled={gameState === 'idle'}
                 >
                    Reset
                 </button>
            )}
        </div>
    );
};