import React, { useState, useMemo } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface DayEntry {
    enabled: boolean;
    start: string;
    end: string;
    breakMinutes: string;
}

const defaultDay: DayEntry = { enabled: true, start: '09:00', end: '17:00', breakMinutes: '30' };

export const TimeCardCalculator: React.FC = () => {
    const [hourlyRate, setHourlyRate] = useState('20');
    const [timeEntries, setTimeEntries] = useState<DayEntry[]>(() => 
        daysOfWeek.map((_, i) => i < 5 ? defaultDay : { ...defaultDay, enabled: false })
    );

    const handleEntryChange = (index: number, field: keyof DayEntry, value: string | boolean) => {
        const newEntries = [...timeEntries];
        (newEntries[index] as any)[field] = value;
        setTimeEntries(newEntries);
    };

    const totals = useMemo(() => {
        let totalMinutes = 0;
        timeEntries.forEach(entry => {
            if (!entry.enabled || !entry.start || !entry.end) return;
            const [startH, startM] = entry.start.split(':').map(Number);
            const [endH, endM] = entry.end.split(':').map(Number);
            const breakM = parseInt(entry.breakMinutes) || 0;

            const start = new Date(0, 0, 0, startH, startM);
            const end = new Date(0, 0, 0, endH, endM);
            let diff = end.getTime() - start.getTime();
            if (diff < 0) diff += 24 * 60 * 60 * 1000;
            
            totalMinutes += (diff / (1000 * 60)) - breakM;
        });

        totalMinutes = Math.max(0, totalMinutes);
        const totalHours = totalMinutes / 60;
        const rate = parseFloat(hourlyRate) || 0;
        const totalPay = totalHours * rate;
        
        return {
            hours: Math.floor(totalHours),
            minutes: Math.round(totalMinutes % 60),
            pay: totalPay
        };
    }, [timeEntries, hourlyRate]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                     <label htmlFor="hourly-rate" className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
                     <input id="hourly-rate" type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600" />
                 </div>
                 <div className="p-4 bg-indigo-600 text-white rounded-lg shadow-sm flex items-center justify-around text-center">
                     <div>
                        <p className="text-sm text-indigo-200">Total Hours</p>
                        <p className="text-2xl font-bold">{totals.hours}h {totals.minutes}m</p>
                     </div>
                      <div>
                        <p className="text-sm text-indigo-200">Total Pay</p>
                        <p className="text-2xl font-bold">${totals.pay.toFixed(2)}</p>
                     </div>
                 </div>
            </div>
            
            <div className="space-y-2">
                <div className="hidden md:grid grid-cols-12 gap-2 text-sm font-semibold text-center px-2">
                    <div className="col-span-2">Day</div>
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Start Time</div>
                    <div className="col-span-3">End Time</div>
                    <div className="col-span-3">Break (mins)</div>
                </div>
                {timeEntries.map((entry, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="col-span-12 md:col-span-2 font-semibold">{daysOfWeek[index]}</div>
                        <div className="col-span-12 md:col-span-1 flex justify-center"><input type="checkbox" checked={entry.enabled} onChange={e => handleEntryChange(index, 'enabled', e.target.checked)} className="h-5 w-5 rounded text-primary focus:ring-primary"/></div>
                        <div className="col-span-6 md:col-span-3"><input type="time" value={entry.start} onChange={e => handleEntryChange(index, 'start', e.target.value)} disabled={!entry.enabled} className="w-full p-1 border rounded dark:bg-slate-700 dark:border-slate-600 disabled:opacity-50"/></div>
                        <div className="col-span-6 md:col-span-3"><input type="time" value={entry.end} onChange={e => handleEntryChange(index, 'end', e.target.value)} disabled={!entry.enabled} className="w-full p-1 border rounded dark:bg-slate-700 dark:border-slate-600 disabled:opacity-50"/></div>
                        <div className="col-span-12 md:col-span-3"><input type="number" min="0" value={entry.breakMinutes} onChange={e => handleEntryChange(index, 'breakMinutes', e.target.value)} disabled={!entry.enabled} className="w-full p-1 border rounded dark:bg-slate-700 dark:border-slate-600 disabled:opacity-50"/></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
