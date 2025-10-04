import React, { useState, useEffect, useCallback } from 'react';
import { ArrowsRightLeftIcon } from '../../components/Icons';

interface Unit {
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

interface ConversionCategory {
  name: string;
  units: Record<string, Unit>;
  baseUnit: string;
}

const CONVERSIONS: Record<string, ConversionCategory> = {
  length: {
    name: 'Length',
    baseUnit: 'm',
    units: {
      m: { name: 'Meter', symbol: 'm', toBase: val => val, fromBase: val => val },
      km: { name: 'Kilometer', symbol: 'km', toBase: val => val * 1000, fromBase: val => val / 1000 },
      cm: { name: 'Centimeter', symbol: 'cm', toBase: val => val / 100, fromBase: val => val * 100 },
      mm: { name: 'Millimeter', symbol: 'mm', toBase: val => val / 1000, fromBase: val => val * 1000 },
      mi: { name: 'Mile', symbol: 'mi', toBase: val => val * 1609.34, fromBase: val => val / 1609.34 },
      yd: { name: 'Yard', symbol: 'yd', toBase: val => val * 0.9144, fromBase: val => val / 0.9144 },
      ft: { name: 'Foot', symbol: 'ft', toBase: val => val * 0.3048, fromBase: val => val / 0.3048 },
      in: { name: 'Inch', symbol: 'in', toBase: val => val * 0.0254, fromBase: val => val / 0.0254 },
    },
  },
  weight: {
    name: 'Weight',
    baseUnit: 'kg',
    units: {
      kg: { name: 'Kilogram', symbol: 'kg', toBase: val => val, fromBase: val => val },
      g: { name: 'Gram', symbol: 'g', toBase: val => val / 1000, fromBase: val => val * 1000 },
      mg: { name: 'Milligram', symbol: 'mg', toBase: val => val / 1e6, fromBase: val => val * 1e6 },
      lb: { name: 'Pound', symbol: 'lb', toBase: val => val * 0.453592, fromBase: val => val / 0.453592 },
      oz: { name: 'Ounce', symbol: 'oz', toBase: val => val * 0.0283495, fromBase: val => val / 0.0283495 },
      t: { name: 'Tonne', symbol: 't', toBase: val => val * 1000, fromBase: val => val / 1000 },
    },
  },
  volume: {
    name: 'Volume',
    baseUnit: 'l',
    units: {
      l: { name: 'Liter', symbol: 'l', toBase: val => val, fromBase: val => val },
      ml: { name: 'Milliliter', symbol: 'ml', toBase: val => val / 1000, fromBase: val => val * 1000 },
      gal: { name: 'Gallon (US)', symbol: 'gal', toBase: val => val * 3.78541, fromBase: val => val / 3.78541 },
      qt: { name: 'Quart (US)', symbol: 'qt', toBase: val => val * 0.946353, fromBase: val => val / 0.946353 },
      pt: { name: 'Pint (US)', symbol: 'pt', toBase: val => val * 0.473176, fromBase: val => val / 0.473176 },
      cup: { name: 'Cup (US)', symbol: 'cup', toBase: val => val * 0.24, fromBase: val => val / 0.24 },
    },
  },
  area: {
    name: 'Area',
    baseUnit: 'm2',
    units: {
      m2: { name: 'Square Meter', symbol: 'm²', toBase: val => val, fromBase: val => val },
      km2: { name: 'Square Kilometer', symbol: 'km²', toBase: val => val * 1e6, fromBase: val => val / 1e6 },
      ha: { name: 'Hectare', symbol: 'ha', toBase: val => val * 10000, fromBase: val => val * 0.0001 },
      ft2: { name: 'Square Foot', symbol: 'ft²', toBase: val => val * 0.092903, fromBase: val => val / 0.092903 },
      ac: { name: 'Acre', symbol: 'ac', toBase: val => val * 4046.86, fromBase: val => val / 4046.86 },
    }
  },
};

const convert = (value: number, fromUnit: string, toUnit: string, category: ConversionCategory): number => {
    if (fromUnit === toUnit) return value;
    const from = category.units[fromUnit];
    const to = category.units[toUnit];
    const baseValue = from.toBase(value);
    return to.fromBase(baseValue);
};

const formatResult = (value: number): string => {
    if (Math.abs(value) < 1e-6 && value !== 0) {
        return value.toExponential(4);
    }
    const fixed = value.toFixed(6);
    return Number(fixed).toString();
};

export const UnitConverter: React.FC = () => {
    const [categoryKey, setCategoryKey] = useState(Object.keys(CONVERSIONS)[0]);
    
    const currentCategory = CONVERSIONS[categoryKey];
    const unitOptions = Object.values(currentCategory.units);
    const unitKeys = Object.keys(currentCategory.units);

    const [fromValue, setFromValue] = useState('1');
    const [toValue, setToValue] = useState('');
    const [fromUnit, setFromUnit] = useState(unitKeys[0]);
    const [toUnit, setToUnit] = useState(unitKeys[1] || unitKeys[0]);

    const runConversion = useCallback((valStr: string, fromU: string, toU: string) => {
        const value = parseFloat(valStr);
        if (!isNaN(value) && fromU && toU) {
            const result = convert(value, fromU, toU, currentCategory);
            return formatResult(result);
        }
        return '';
    }, [currentCategory]);
    
    useEffect(() => {
        const newUnitKeys = Object.keys(currentCategory.units);
        const newFromUnit = newUnitKeys[0];
        const newToUnit = newUnitKeys[1] || newUnitKeys[0];
        setFromUnit(newFromUnit);
        setToUnit(newToUnit);
        
        const initialValue = '1';
        setFromValue(initialValue);
        setToValue(runConversion(initialValue, newFromUnit, newToUnit));
    }, [categoryKey, currentCategory.units, runConversion]);

    const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFromValue(val);
        setToValue(runConversion(val, fromUnit, toUnit));
    };

    const handleToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setToValue(val);
        setFromValue(runConversion(val, toUnit, fromUnit));
    };
    
    const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value;
        setFromUnit(newUnit);
        setToValue(runConversion(fromValue, newUnit, toUnit));
    };

    const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value;
        setToUnit(newUnit);
        setToValue(runConversion(fromValue, fromUnit, newUnit));
    };
    
    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setFromValue(toValue);
        setToValue(fromValue);
    };

    const selectClass = "w-full p-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none";
    const inputClass = "w-full p-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-t-2 border-b-2 border-l-2 border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Measurement Type
                </label>
                <select
                    value={categoryKey}
                    onChange={(e) => setCategoryKey(e.target.value)}
                    className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {Object.entries(CONVERSIONS).map(([key, cat]) => (
                        <option key={key} value={key}>{cat.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-full">
                    <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                    <div className="flex">
                        <input type="number" value={fromValue} onChange={handleFromValueChange} className={inputClass} />
                        <select value={fromUnit} onChange={handleFromUnitChange} className={selectClass}>
                            {unitOptions.map(u => <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>)}
                        </select>
                    </div>
                </div>

                <div className="pt-6">
                    <button onClick={swapUnits} className="p-3 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-indigo-500 hover:text-white transition duration-200" aria-label="Swap units">
                       <ArrowsRightLeftIcon className="w-6 h-6"/>
                    </button>
                </div>

                <div className="w-full">
                    <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                    <div className="flex">
                        <input type="number" value={toValue} onChange={handleToValueChange} className={inputClass} />
                        <select value={toUnit} onChange={handleToUnitChange} className={selectClass}>
                             {unitOptions.map(u => <option key={u.symbol} value={u.symbol}>{u.name} ({u.symbol})</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};