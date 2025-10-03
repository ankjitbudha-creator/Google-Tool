"use client";

import React, { useState, useCallback } from 'react';

export const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<string>('0');
  const [fahrenheit, setFahrenheit] = useState<string>('32');
  const [kelvin, setKelvin] = useState<string>('273.15');

  const handleCelsiusChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCelsius(value);
    if (value === '' || isNaN(parseFloat(value))) {
      setFahrenheit('');
      setKelvin('');
    } else {
      const c = parseFloat(value);
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  }, []);
  
  const handleFahrenheitChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFahrenheit(value);
    if (value === '' || isNaN(parseFloat(value))) {
      setCelsius('');
      setKelvin('');
    } else {
      const f = parseFloat(value);
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  }, []);

  const handleKelvinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKelvin(value);
    if (value === '' || isNaN(parseFloat(value))) {
        setCelsius('');
        setFahrenheit('');
    } else {
        const k = parseFloat(value);
        const c = k - 273.15;
        setCelsius(c.toFixed(2));
        setFahrenheit(((c * 9/5) + 32).toFixed(2));
    }
  }, []);

  const inputClass = "w-full p-4 text-2xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="celsius" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Celsius (°C)
        </label>
        <input
          id="celsius"
          type="number"
          value={celsius}
          onChange={handleCelsiusChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="fahrenheit" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Fahrenheit (°F)
        </label>
        <input
          id="fahrenheit"
          type="number"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="kelvin" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Kelvin (K)
        </label>
        <input
          id="kelvin"
          type="number"
          value={kelvin}
          onChange={handleKelvinChange}
          className={inputClass}
        />
      </div>
    </div>
  );
};
