import React, { useState, useMemo } from 'react';

export const DayCounter: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [includeEndDay, setIncludeEndDay] = useState(false);

    const dayCount = useMemo(() => {
        if (!startDate || !endDate) return null;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) return { error: "Start date cannot be after end date." };

        const diffTime = end.getTime() - start.getTime();
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (includeEndDay) {
            diffDays += 1;
        }

        return { days: diffDays };
    }, [startDate, endDate, includeEndDay]);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-4">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    />
                </div>
                <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    />
                </div>
                <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeEndDay}
                            onChange={(e) => setIncludeEndDay(e.target.checked)}
                            className="h-4 w-4 rounded text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Include end day in total</span>
                    </label>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Days</h3>
                    {dayCount?.error ? (
                        <p className="text-2xl font-bold text-red-500">{dayCount.error}</p>
                    ) : (
                        <p className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">
                            {dayCount?.days ?? '--'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
