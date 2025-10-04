import React, { useState, useMemo, useEffect } from 'react';

export const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('180');
  const [weight, setWeight] = useState<string>('75');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [errors, setErrors] = useState({ height: '', weight: '' });

  const { bmi, category } = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0 || errors.height || errors.weight) {
      return { bmi: null, category: 'N/A' };
    }

    let bmiValue: number;
    if (unitSystem === 'metric') {
      bmiValue = w / Math.pow(h / 100, 2);
    } else {
      bmiValue = 703 * (w / Math.pow(h, 2));
    }
    
    let bmiCategory: string;
    if (bmiValue < 18.5) bmiCategory = 'Underweight';
    else if (bmiValue < 25) bmiCategory = 'Normal weight';
    else if (bmiValue < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    return { bmi: bmiValue.toFixed(1), category: bmiCategory };
  }, [height, weight, unitSystem, errors]);

  useEffect(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const newErrors = { height: '', weight: '' };
    
    if (!isNaN(h)) {
        if (unitSystem === 'metric') {
            if (h < 50 || h > 250) newErrors.height = 'Range: 50-250 cm.';
        } else {
            if (h < 20 || h > 100) newErrors.height = 'Range: 20-100 in.';
        }
    }
    if (!isNaN(w)) {
        if (unitSystem === 'metric') {
            if (w < 10 || w > 500) newErrors.weight = 'Range: 10-500 kg.';
        } else {
            if (w < 20 || w > 1100) newErrors.weight = 'Range: 20-1100 lbs.';
        }
    }
    setErrors(newErrors);
  }, [height, weight, unitSystem]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <div className="flex justify-center mb-4 rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
          <button onClick={() => setUnitSystem('metric')} className={`w-full py-2 rounded-md transition ${unitSystem === 'metric' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>Metric</button>
          <button onClick={() => setUnitSystem('imperial')} className={`w-full py-2 rounded-md transition ${unitSystem === 'imperial' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>Imperial</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Height ({unitSystem === 'metric' ? 'cm' : 'in'})
            </label>
            <input 
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={`w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 ${errors.height ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'}`}
            />
            {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input 
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={`w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 ${errors.weight ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'}`}
            />
            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
          </div>
        </div>
      </div>
      <div className="text-center p-8 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your BMI is</h3>
        <p className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          {bmi || '--'}
        </p>
        <p className="text-xl font-medium text-gray-800 dark:text-white">
          {category}
        </p>
      </div>
    </div>
  );
};