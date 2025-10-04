import React, { useState, useMemo, useEffect } from 'react';

export const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState<string>('50');
  const [tipPercent, setTipPercent] = useState<string>('15');
  const [people, setPeople] = useState<string>('1');
  const [errors, setErrors] = useState({ bill: '', tip: '', people: '' });

  const { tipAmount, total, perPerson } = useMemo(() => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people, 10);

    if (isNaN(billAmount) || isNaN(tip) || isNaN(numPeople) || numPeople < 1 || billAmount < 0 || tip < 0) {
      return { tipAmount: 0, total: 0, perPerson: 0 };
    }

    const tipValue = billAmount * (tip / 100);
    const totalValue = billAmount + tipValue;
    const perPersonValue = totalValue / numPeople;

    return {
      tipAmount: tipValue,
      total: totalValue,
      perPerson: perPersonValue,
    };
  }, [bill, tipPercent, people]);

  useEffect(() => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people, 10);
    const newErrors = { bill: '', tip: '', people: '' };
    
    if (bill !== '' && billAmount < 0) newErrors.bill = 'Bill cannot be negative.';
    if (tipPercent !== '' && tip < 0) newErrors.tip = 'Tip cannot be negative.';
    if (people !== '' && numPeople < 1) newErrors.people = 'Must be at least 1 person.';

    setErrors(newErrors);
  }, [bill, tipPercent, people]);
  
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Bill Amount ($)</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className={`w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 ${errors.bill ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'}`}
            placeholder="e.g., 50.00"
          />
          {errors.bill && <p className="text-red-500 text-xs mt-1">{errors.bill}</p>}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Tip Percentage (%)</label>
          <input
            type="number"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className={`w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 ${errors.tip ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'}`}
            placeholder="e.g., 15"
          />
           {errors.tip && <p className="text-red-500 text-xs mt-1">{errors.tip}</p>}
           <div className="flex space-x-2 mt-2">
              {[10, 15, 20, 25].map(p => (
                  <button key={p} onClick={() => setTipPercent(p.toString())} className={`flex-1 py-2 text-sm rounded-md transition ${tipPercent === p.toString() ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}>{p}%</button>
              ))}
           </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Number of People</label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            min="1"
            step="1"
            className={`w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 ${errors.people ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'}`}
          />
          {errors.people && <p className="text-red-500 text-xs mt-1">{errors.people}</p>}
        </div>
      </div>
      <div className="p-8 bg-indigo-600 text-white rounded-lg flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between items-baseline">
              <span className="text-indigo-200">Tip Amount</span>
              <span className="text-3xl font-bold">{currencyFormatter.format(tipAmount)}</span>
          </div>
          <div className="flex justify-between items-baseline">
              <span className="text-indigo-200">Total Bill</span>
              <span className="text-3xl font-bold">{currencyFormatter.format(total)}</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-indigo-400">
           <div className="flex justify-between items-baseline">
              <span className="text-indigo-200">Total Per Person</span>
              <span className="text-4xl font-extrabold">{currencyFormatter.format(perPerson)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};