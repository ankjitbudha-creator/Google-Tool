import React, { useState, useMemo } from 'react';

interface AgeCalculationResult {
    errors: {
        day?: string;
        month?: string;
        year?: string;
    };
    age: {
        years: number;
        months: number;
        days: number;
        totalDays: number;
        totalWeeks: number;
        totalMonths: number;
    } | null;
}

export const AgeCalculator: React.FC = () => {
    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');

    const calculationResult: AgeCalculationResult = useMemo(() => {
        if (!day && !month && !year) {
            return { errors: {}, age: null };
        }

        const d = parseInt(day, 10);
        const m = parseInt(month, 10);
        const y = parseInt(year, 10);
        const errors: { day?: string; month?: string; year?: string } = {};

        const today = new Date();
        const currentYear = today.getFullYear();

        if (!day) errors.day = 'Day is required.';
        else if (d < 1 || d > 31) errors.day = 'Must be a valid day.';

        if (!month) errors.month = 'Month is required.';
        else if (m < 1 || m > 12) errors.month = 'Must be a valid month.';

        if (!year) errors.year = 'Year is required.';
        else if (y > currentYear) errors.year = 'Cannot be in the future.';
        else if (y < 1900) errors.year = 'Please enter a valid year.';
        
        if (Object.keys(errors).length === 0) {
            const birthDate = new Date(y, m - 1, d);
            if (birthDate.getFullYear() !== y || birthDate.getMonth() !== m - 1 || birthDate.getDate() !== d) {
                errors.day = 'Must be a valid date.';
            } else if (birthDate > today) {
                errors.year = 'Date cannot be in the future.';
            }
        }

        if (Object.keys(errors).length > 0) {
            return { errors, age: null };
        }
        
        const birthDate = new Date(y, m - 1, d);
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            ageMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }

        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        const diffTime = Math.abs(today.getTime() - birthDate.getTime());
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = ageYears * 12 + ageMonths;

        return {
            errors: {},
            age: {
                years: ageYears,
                months: ageMonths,
                days: ageDays,
                totalDays,
                totalWeeks,
                totalMonths,
            }
        };
    }, [day, month, year]);

    const getInputClass = (hasError: boolean) => 
        `w-full px-4 py-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 rounded-lg focus:outline-none text-center ${
            hasError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500'
        }`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Enter Your Date of Birth</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
                        <input type="number" value={day} onChange={e => setDay(e.target.value)} placeholder="DD" className={getInputClass(!!calculationResult.errors.day)} max="31" min="1" />
                        {calculationResult.errors.day && <p className="text-red-500 text-xs mt-1">{calculationResult.errors.day}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
                        <input type="number" value={month} onChange={e => setMonth(e.target.value)} placeholder="MM" className={getInputClass(!!calculationResult.errors.month)} max="12" min="1" />
                         {calculationResult.errors.month && <p className="text-red-500 text-xs mt-1">{calculationResult.errors.month}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="YYYY" className={getInputClass(!!calculationResult.errors.year)} />
                        {calculationResult.errors.year && <p className="text-red-500 text-xs mt-1">{calculationResult.errors.year}</p>}
                    </div>
                </div>
            </div>

            <div className="p-8 bg-indigo-600 text-white rounded-lg">
                {!calculationResult.age ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-indigo-200">Your calculated age will appear here.</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold text-indigo-200 mb-4">Your Age Is</h3>
                        <div className="flex items-baseline space-x-2 sm:space-x-4 mb-6">
                            <p><span className="text-5xl sm:text-6xl font-extrabold">{calculationResult.age.years}</span><span className="text-xl sm:text-2xl ml-2">Years</span></p>
                            <p><span className="text-3xl sm:text-4xl font-bold">{calculationResult.age.months}</span><span className="text-lg sm:text-xl ml-2">Months</span></p>
                            <p><span className="text-3xl sm:text-4xl font-bold">{calculationResult.age.days}</span><span className="text-lg sm:text-xl ml-2">Days</span></p>
                        </div>
                        <div className="pt-6 border-t border-indigo-400 space-y-3">
                            <h4 className="text-lg font-semibold text-indigo-200">Total Lived</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-lg">
                                <p><span className="font-bold">{calculationResult.age.totalMonths.toLocaleString()}</span> Months</p>
                                <p><span className="font-bold">{calculationResult.age.totalWeeks.toLocaleString()}</span> Weeks</p>
                                <p><span className="font-bold">{calculationResult.age.totalDays.toLocaleString()}</span> Days</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};