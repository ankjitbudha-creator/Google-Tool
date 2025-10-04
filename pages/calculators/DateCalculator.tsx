import React, { useState, useMemo } from 'react';

export const DateCalculator: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [operation, setOperation] = useState<'add' | 'subtract'>('add');
    const [years, setYears] = useState('');
    const [months, setMonths] = useState('');
    const [weeks, setWeeks] = useState('');
    const [days, setDays] = useState('1');

    const resultDate = useMemo(() => {
        if (!startDate) return 'Select a start date';

        try {
            const date = new Date(`${startDate}T00:00:00`);
            const y = parseInt(years, 10) || 0;
            const m = parseInt(months, 10) || 0;
            const w = parseInt(weeks, 10) || 0;
            const d = parseInt(days, 10) || 0;

            if (operation === 'add') {
                date.setFullYear(date.getFullYear() + y);
                date.setMonth(date.getMonth() + m);
                date.setDate(date.getDate() + (w * 7) + d);
            } else {
                date.setFullYear(date.getFullYear() - y);
                date.setMonth(date.getMonth() - m);
                date.setDate(date.getDate() - (w * 7) - d);
            }
            return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return 'Invalid Date';
        }
    }, [startDate, operation, years, months, weeks, days]);

    const handleReset = () => {
        setStartDate(today);
        setOperation('add');
        setYears('');
        setMonths('');
        setWeeks('');
        setDays('1');
    };

    const NumberInput: React.FC<{label: string, value: string, setValue: (v: string) => void}> = ({label, value, setValue}) => (
         <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
            <input type="number" min="0" value={value} onChange={e => setValue(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" />
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" />
                </div>

                <div className="flex bg-gray-200 dark:bg-slate-700 rounded-lg p-1">
                    <button onClick={() => setOperation('add')} className={`w-full py-2 rounded-md transition ${operation === 'add' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>Add</button>
                    <button onClick={() => setOperation('subtract')} className={`w-full py-2 rounded-md transition ${operation === 'subtract' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>Subtract</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <NumberInput label="Years" value={years} setValue={setYears} />
                    <NumberInput label="Months" value={months} setValue={setMonths} />
                    <NumberInput label="Weeks" value={weeks} setValue={setWeeks} />
                    <NumberInput label="Days" value={days} setValue={setDays} />
                </div>
                <button onClick={handleReset} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">Reset</button>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Resulting Date</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center">{resultDate}</p>
            </div>
        </div>
    );
};
