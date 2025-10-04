import React, { useState, useMemo } from 'react';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const DayOfTheWeekCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);

    const result = useMemo(() => {
        if (!selectedDate) return null;
        const date = new Date(`${selectedDate}T00:00:00`); // Avoid timezone issues
        const dayOfWeek = daysOfWeek[date.getDay()];
        
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        return { dayOfWeek, dayOfYear };
    }, [selectedDate]);

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-sm space-y-2">
                 <label htmlFor="date-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 text-center">Select a Date</label>
                <input
                    type="date"
                    id="date-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-center text-lg"
                />
            </div>
            <div className="w-full max-w-sm p-8 bg-indigo-600 text-white rounded-lg text-center">
                {result ? (
                    <>
                        <p className="text-4xl font-bold">{result.dayOfWeek}</p>
                        <p className="text-indigo-200 mt-2">It's the {result.dayOfYear}{result.dayOfYear === 1 ? 'st' : result.dayOfYear === 2 ? 'nd' : result.dayOfYear === 3 ? 'rd' : 'th'} day of the year.</p>
                    </>
                ) : (
                    <p>Select a date to see the day of the week.</p>
                )}
            </div>
        </div>
    );
};
