import React, { useState, useMemo } from 'react';

export const HoursCalculator: React.FC = () => {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');

    const duration = useMemo(() => {
        if (!startTime || !endTime) return null;

        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime.split(':').map(Number);
        
        const startDate = new Date(0, 0, 0, startH, startM);
        const endDate = new Date(0, 0, 0, endH, endM);
        
        let diff = endDate.getTime() - startDate.getTime();
        
        if (diff < 0) { // Spans midnight
            diff += 24 * 60 * 60 * 1000;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return { hours, minutes };
    }, [startTime, endTime]);
    
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-4">
                <div>
                    <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                    <input type="time" id="start-time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" />
                </div>
                <div>
                    <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                    <input type="time" id="end-time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" />
                </div>
            </div>
             <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Duration</h3>
                     {duration ? (
                         <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                             {duration.hours} <span className="text-2xl font-medium">hours</span> {duration.minutes} <span className="text-2xl font-medium">minutes</span>
                         </p>
                    ) : (
                        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">--</p>
                    )}
                </div>
            </div>
        </div>
    );
};
