import React, { useState, useMemo } from 'react';

const parseTime = (timeStr: string) => {
    const [h, m, s] = timeStr.split(':').map(Number);
    return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
};

const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 0) {
        totalSeconds = 86400 + (totalSeconds % 86400);
    }
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
};

export const TimeCalculator: React.FC = () => {
    const [startTime, setStartTime] = useState('10:00:00');
    const [op, setOp] = useState<'add' | 'subtract'>('add');
    const [opTime, setOpTime] = useState('01:30:00');

    const resultTime = useMemo(() => {
        const startSeconds = parseTime(startTime);
        const opSeconds = parseTime(opTime);
        const result = op === 'add' ? startSeconds + opSeconds : startSeconds - opSeconds;
        return formatTime(result);
    }, [startTime, op, opTime]);

    const TimeInput: React.FC<{value: string, setValue: (v: string) => void}> = ({value, setValue}) => (
        <input type="time" step="1" value={value} onChange={e => setValue(e.target.value)} className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 text-2xl font-mono" />
    );

    return (
        <div className="max-w-md mx-auto space-y-4">
            <div className="text-center">
                <label className="text-sm font-medium">Start Time</label>
                <TimeInput value={startTime} setValue={setStartTime} />
            </div>

            <div className="flex items-center justify-center gap-4">
                <button onClick={() => setOp('add')} className={`px-6 py-2 rounded-full text-2xl font-bold ${op === 'add' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>+</button>
                <button onClick={() => setOp('subtract')} className={`px-6 py-2 rounded-full text-2xl font-bold ${op === 'subtract' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>-</button>
            </div>
            
            <div className="text-center">
                <label className="text-sm font-medium">Add / Subtract Time</label>
                <TimeInput value={opTime} setValue={setOpTime} />
            </div>

            <div className="text-center pt-4 border-t dark:border-gray-700">
                <label className="text-lg font-medium">Result</label>
                <p className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md text-4xl font-mono font-bold text-indigo-600 dark:text-indigo-400">{resultTime}</p>
            </div>
        </div>
    );
};
