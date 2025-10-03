"use client";

import React, { useState } from 'react';

const DateSelect: React.FC<{
  day: string; setDay: (d: string) => void;
  month: string; setMonth: (m: string) => void;
  year: string; setYear: (y: string) => void;
  months: { value: string; label: string }[];
  years: number[];
}> = ({ day, setDay, month, setMonth, year, setYear, months, years }) => (
  <div className="flex gap-4">
    <select value={day} onChange={e => setDay(e.target.value)} className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
      {Array.from({ length: 32 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
    </select>
    <select value={month} onChange={e => setMonth(e.target.value)} className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
      {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
    </select>
    <select value={year} onChange={e => setYear(e.target.value)} className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
      {years.map(y => <option key={y} value={y}>{y}</option>)}
    </select>
  </div>
);

export const NepaliDateConverter: React.FC = () => {
    // Note: The actual date conversion logic is highly complex and requires a dedicated library.
    // This component implements the UI and state management as per the design, with placeholder functionality.

    const currentYearAD = new Date().getFullYear();
    const yearsAD = Array.from({ length: 100 }, (_, i) => currentYearAD - i);
    const monthsAD = [
        { value: '1', label: 'Jan' }, { value: '2', label: 'Feb' }, { value: '3', label: 'Mar' },
        { value: '4', label: 'Apr' }, { value: '5', label: 'May' }, { value: '6', label: 'Jun' },
        { value: '7', label: 'Jul' }, { value: '8', label: 'Aug' }, { value: '9', label: 'Sep' },
        { value: '10', label: 'Oct' }, { value: '11', label: 'Nov' }, { value: '12', label: 'Dec' }
    ];

    const currentYearBS = 2081;
    const yearsBS = Array.from({ length: 100 }, (_, i) => currentYearBS - i);
    const monthsBS = [
        { value: '1', label: 'Baishakh' }, { value: '2', label: 'Jestha' }, { value: '3', label: 'Ashadh' },
        { value: '4', label: 'Shrawan' }, { value: '5', label: 'Bhadra' }, { value: '6', label: 'Ashwin' },
        { value: '7', label: 'Kartik' }, { value: '8', label: 'Mangsir' }, { value: '9', label: 'Poush' },
        { value: '10', label: 'Magh' }, { value: '11', label: 'Falgun' }, { value: '12', label: 'Chaitra' }
    ];

    const [dayAD, setDayAD] = useState('1');
    const [monthAD, setMonthAD] = useState('1');
    const [yearAD, setYearAD] = useState(String(currentYearAD));

    const [dayBS, setDayBS] = useState('1');
    const [monthBS, setMonthBS] = useState('1');
    const [yearBS, setYearBS] = useState(String(currentYearBS));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="text-center space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold dark:text-white">Convert to English (AD)</h2>
                <DateSelect day={dayBS} setDay={setDayBS} month={monthBS} setMonth={setMonthBS} year={yearBS} setYear={setYearBS} months={monthsBS} years={yearsBS} />
                <button className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors">Convert to AD</button>
            </div>
            <div className="text-center space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h2 className="text-xl font-semibold dark:text-white">Convert to Nepali (BS)</h2>
                <DateSelect day={dayAD} setDay={setDayAD} month={monthAD} setMonth={setMonthAD} year={yearAD} setYear={setYearAD} months={monthsAD} years={yearsAD} />
                <button className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors">Convert to BS</button>
            </div>
        </div>
    );
};
