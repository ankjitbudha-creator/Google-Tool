import React, { useState, useMemo } from 'react';

const pluralize = (count: number, noun: string) => `${count} ${noun}${count !== 1 ? 's' : ''}`;

export const TimeDurationCalculator: React.FC = () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const [startDateTime, setStartDateTime] = useState(now.toISOString().slice(0, 16));
    const [endDateTime, setEndDateTime] = useState(oneHourLater.toISOString().slice(0, 16));
    
    const duration = useMemo(() => {
        if (!startDateTime || !endDateTime) return null;

        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        if (start > end) return { error: "Start date must be before end date." };

        let diff = end.getTime() - start.getTime();

        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(diff / (1000 * 60));
        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        const totalDays = diff / (1000 * 60 * 60 * 24);

        let tempEnd = new Date(end);
        let years = tempEnd.getFullYear() - start.getFullYear();
        let months = tempEnd.getMonth() - start.getMonth();
        let days = tempEnd.getDate() - start.getDate();
        let hours = tempEnd.getHours() - start.getHours();
        let minutes = tempEnd.getMinutes() - start.getMinutes();
        let seconds = tempEnd.getSeconds() - start.getSeconds();
        
        if (seconds < 0) { minutes--; seconds += 60; }
        if (minutes < 0) { hours--; minutes += 60; }
        if (hours < 0) { days--; hours += 24; }
        if (days < 0) {
            months--;
            const lastMonth = new Date(tempEnd.getFullYear(), tempEnd.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) { years--; months += 12; }

        return {
            breakdown: { years, months, days, hours, minutes, seconds },
            totals: { days: totalDays.toFixed(2), hours: totalHours, minutes: totalMinutes, seconds: totalSeconds }
        };
    }, [startDateTime, endDateTime]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="start-datetime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date & Time</label>
                    <input type="datetime-local" id="start-datetime" value={startDateTime} onChange={e => setStartDateTime(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                 <div>
                    <label htmlFor="end-datetime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date & Time</label>
                    <input type="datetime-local" id="end-datetime" value={endDateTime} onChange={e => setEndDateTime(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
            </div>
            {duration ? (
                 duration.error ? <p className="text-center text-red-500">{duration.error}</p> : (
                    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-center mb-2">Duration Breakdown</h3>
                            {/* FIX: Cast `unknown` values to `number` for comparison and function arguments */}
                            <div className="flex flex-wrap justify-center items-baseline gap-x-4 gap-y-2 text-center">
                                {Object.entries(duration.breakdown).filter(([, val]) => (val as number) > 0).length > 0 ? Object.entries(duration.breakdown).map(([unit, value]) => (value as number) > 0 && (
                                    <p key={unit}><span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{value as number}</span> <span className="text-lg">{pluralize(value as number, unit)}</span></p>
                                )) : <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">0 seconds</p>}
                            </div>
                        </div>
                        <div className="pt-4 border-t dark:border-gray-700">
                             <h3 className="text-xl font-semibold text-center mb-2">Total Duration</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
                                <p>{duration.totals.days} days</p>
                                <p>{duration.totals.hours.toLocaleString()} hours</p>
                                <p>{duration.totals.minutes.toLocaleString()} minutes</p>
                                <p>{duration.totals.seconds.toLocaleString()} seconds</p>
                            </div>
                        </div>
                    </div>
                )
            ) : <p className="text-center">Enter dates to calculate duration.</p>}
        </div>
    );
};
