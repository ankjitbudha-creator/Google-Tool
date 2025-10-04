import React, { useState, useCallback } from 'react';

export const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<string>('0');
  const [fahrenheit, setFahrenheit] = useState<string>('32');
  const [kelvin, setKelvin] = useState<string>('273.15');
  const [error, setError] = useState('');

  const handleCelsiusChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCelsius(value);
    if (value === '' || value === '-') {
      setFahrenheit(''); setKelvin(''); setError(''); return;
    }
    const c = parseFloat(value);
    if (isNaN(c)) {
      setError('Please enter a valid number.');
    } else {
      setError('');
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  }, []);
  
  const handleFahrenheitChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFahrenheit(value);
    if (value === '' || value === '-') {
      setCelsius(''); setKelvin(''); setError(''); return;
    }
    const f = parseFloat(value);
    if (isNaN(f)) {
        setError('Please enter a valid number.');
    } else {
      setError('');
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  }, []);

  const handleKelvinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKelvin(value);
    if (value === '' || value === '-') {
        setCelsius(''); setFahrenheit(''); setError(''); return;
    }
    const k = parseFloat(value);
    if (isNaN(k)) {
        setError('Please enter a valid number.');
    } else {
        setError('');
        const c = k - 273.15;
        setCelsius(c.toFixed(2));
        setFahrenheit(((c * 9/5) + 32).toFixed(2));
    }
  }, []);

  const inputClass = "w-full p-4 text-2xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      <div>
        <label htmlFor="celsius" className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          Celsius (°C)
        </label>
        <input
          id="celsius"
          type="text"
          value={celsius}
          onChange={handleCelsiusChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="fahrenheit" className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          Fahrenheit (°F)
        </label>
        <input
          id="fahrenheit"
          type="text"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="kelvin" className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          Kelvin (K)
        </label>
        <input
          id="kelvin"
          type="text"
          value={kelvin}
          onChange={handleKelvinChange}
          className={inputClass}
        />
      </div>
    </div>
  );
};