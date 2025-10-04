import React, { useState, useMemo, useEffect } from 'react';
import { TrashIcon } from '../../components/Icons';

// Some popular timezones for easier access
const popularTimeZones = [
    'UTC', 'GMT',
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin',
    'Asia/Tokyo', 'Asia/Dubai', 'Asia/Kolkata', 'Australia/Sydney'
];

// FIX: Check if Intl.supportedValuesOf is a function before calling it.
// Get all supported timezones, with popular ones first
const allSupportedTimeZones =
    typeof (Intl as any).supportedValuesOf === 'function' ? (Intl as any).supportedValuesOf('timeZone') : [];

const allTimeZones = [...new Set([...popularTimeZones, ...allSupportedTimeZones])];


export const TimeZoneConverter: React.FC = () => {
    const [baseTime, setBaseTime] = useState(() => new Date());
    const [targetTimeZones, setTargetTimeZones] = useState<string[]>(['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney']);
    const [newTargetZone, setNewTargetZone] = useState('UTC');

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setBaseTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const convertedTimes = useMemo(() => {
        return targetTimeZones.map(tz => {
            try {
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: tz,
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                });
                return {
                    zone: tz,
                    time: formatter.format(baseTime)
                };
            } catch {
                return { zone: tz, time: 'Invalid Timezone' };
            }
        });
    }, [baseTime, targetTimeZones]);

    const addTargetZone = () => {
        if (newTargetZone && !targetTimeZones.includes(newTargetZone)) {
            setTargetTimeZones([...targetTimeZones, newTargetZone].sort());
        }
    };

    const removeTargetZone = (zone: string) => {
        setTargetTimeZones(targetTimeZones.filter(tz => tz !== zone));
    };

    const localTimeFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZoneName: 'short'
    });

    return (
        <div className="space-y-6">
            <div className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-slate-800 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Local Time</p>
                <p className="text-2xl font-semibold text-primary">{localTimeFormatter.format(baseTime)}</p>
            </div>
            
            <div className="space-y-3">
                {convertedTimes.map(({zone, time}) => (
                    <div key={zone} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                        <div>
                            <p className="font-semibold text-lg">{zone.replace(/_/g, ' ')}</p>
                            <p className="text-xl font-mono">{time}</p>
                        </div>
                        <button onClick={() => removeTargetZone(zone)} title="Remove timezone" className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                            <TrashIcon className="w-5 h-5 text-red-500"/>
                        </button>
                    </div>
                ))}
            </div>

             <div className="flex gap-2 p-4 border-t dark:border-gray-700">
                <select value={newTargetZone} onChange={e => setNewTargetZone(e.target.value)} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600">
                    {allTimeZones.map(tz => <option key={tz as string} value={tz as string}>{ (tz as string).replace(/_/g, ' ')}</option>)}
                </select>
                <button onClick={addTargetZone} className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover">+ Add</button>
            </div>
        </div>
    );
};