"use client";

import React, { useState, useMemo } from 'react';
import { TrashIcon } from '../../Icons';

interface Item {
  description: string;
  quantity: number;
  rate: number;
}

const today = new Date().toISOString().split('T')[0];

const PrintStyles = () => (
    // FIX: Replaced non-standard `style jsx global` with standard `<style>` tag to fix TypeScript error.
    <style>{`
      @media print {
        body * {
          visibility: hidden;
        }
        #invoice-preview, #invoice-preview * {
          visibility: visible;
        }
        #invoice-preview {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          margin: 0;
          padding: 0;
          border: none;
          box-shadow: none;
        }
        .no-print {
          display: none !important;
        }
      }
    `}</style>
  );

export const InvoiceGenerator: React.FC = () => {
    const [fromName, setFromName] = useState('Your Company');
    const [fromAddress, setFromAddress] = useState('123 Street, City, Country');
    const [toName, setToName] = useState('Client Company');
    const [toAddress, setToAddress] = useState('456 Avenue, City, Country');
    const [invoiceNumber, setInvoiceNumber] = useState('1');
    const [date, setDate] = useState(today);
    const [dueDate, setDueDate] = useState(today);
    const [items, setItems] = useState<Item[]>([{ description: 'Item Description', quantity: 1, rate: 100 }]);
    const [notes, setNotes] = useState('Thank you for your business.');
    const [taxRate, setTaxRate] = useState(13);
    const [logo, setLogo] = useState<string | null>(null);

    const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.quantity * item.rate, 0), [items]);
    const taxAmount = useMemo(() => subtotal * (taxRate / 100), [subtotal, taxRate]);
    const total = useMemo(() => subtotal + taxAmount, [subtotal, taxAmount]);

    const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
        const newItems = [...items];
        const val = typeof newItems[index][field] === 'number' ? parseFloat(value as string) || 0 : value;
        (newItems[index] as any)[field] = val;
        setItems(newItems);
    };

    const addItem = () => setItems([...items, { description: '', quantity: 1, rate: 0 }]);
    const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setLogo(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };
    
    const handlePrint = () => window.print();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PrintStyles />
            {/* Form Section */}
            <div className="space-y-6 no-print">
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg dark:border-gray-700">
                    <div>
                        <h3 className="font-bold mb-2">From</h3>
                        <input value={fromName} onChange={e => setFromName(e.target.value)} placeholder="Your Name/Company" className="w-full p-1 mb-1 bg-transparent border-b dark:border-gray-600" />
                        <textarea value={fromAddress} onChange={e => setFromAddress(e.target.value)} placeholder="Your Address" rows={2} className="w-full p-1 bg-transparent border-b dark:border-gray-600 text-sm" />
                    </div>
                     <div>
                        <h3 className="font-bold mb-2">To</h3>
                        <input value={toName} onChange={e => setToName(e.target.value)} placeholder="Client Name/Company" className="w-full p-1 mb-1 bg-transparent border-b dark:border-gray-600" />
                        <textarea value={toAddress} onChange={e => setToAddress(e.target.value)} placeholder="Client Address" rows={2} className="w-full p-1 bg-transparent border-b dark:border-gray-600 text-sm" />
                    </div>
                </div>
                 <div className="p-4 border rounded-lg dark:border-gray-700 space-y-3">
                     <div className="flex items-center gap-4">
                        <label className="w-28">Invoice #</label>
                        <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="flex-1 p-1 bg-transparent border-b dark:border-gray-600" />
                     </div>
                     <div className="flex items-center gap-4">
                        <label className="w-28">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="flex-1 p-1 bg-transparent border-b dark:border-gray-600" />
                     </div>
                      <div className="flex items-center gap-4">
                        <label className="w-28">Due Date</label>
                        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="flex-1 p-1 bg-transparent border-b dark:border-gray-600" />
                     </div>
                 </div>
                 <div className="p-4 border rounded-lg dark:border-gray-700">
                    <h3 className="font-bold mb-2">Items</h3>
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} placeholder="Description" className="w-1/2 p-1 bg-transparent border-b dark:border-gray-600"/>
                            <input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} placeholder="Qty" className="w-1/6 p-1 bg-transparent border-b dark:border-gray-600"/>
                            <input type="number" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} placeholder="Rate" className="w-1/6 p-1 bg-transparent border-b dark:border-gray-600"/>
                            <p className="w-1/6 text-right">{(item.quantity * item.rate).toFixed(2)}</p>
                            <button onClick={() => removeItem(index)}><TrashIcon className="w-5 h-5 text-red-500"/></button>
                        </div>
                    ))}
                    <button onClick={addItem} className="mt-2 text-primary">+ Add Item</button>
                 </div>
                 <div className="p-4 border rounded-lg dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <label className="w-28">Tax Rate (%)</label>
                        <input type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value) || 0)} className="flex-1 p-1 bg-transparent border-b dark:border-gray-600" />
                    </div>
                 </div>
                 <div className="p-4 border rounded-lg dark:border-gray-700">
                     <label className="font-bold">Notes</label>
                     <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full mt-1 p-1 bg-transparent border-b dark:border-gray-600"/>
                 </div>
                 <div className="p-4 border rounded-lg dark:border-gray-700">
                    <label className="font-bold">Logo</label>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full mt-1 text-sm"/>
                 </div>
                 <button onClick={handlePrint} className="w-full py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition">
                    Print / Download PDF
                </button>
            </div>

            {/* Preview Section */}
            <div id="invoice-preview-container" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-lg rounded-lg">
                <div id="invoice-preview" className="p-10">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            {logo && <img src={logo} alt="logo" className="w-32 mb-4"/>}
                            <h1 className="text-3xl font-bold">{fromName}</h1>
                            <p className="text-sm whitespace-pre-line">{fromAddress}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-4xl font-light uppercase text-gray-500 dark:text-gray-400">Invoice</h2>
                            <p># {invoiceNumber}</p>
                        </div>
                    </div>
                    <div className="flex justify-between mb-10">
                        <div>
                            <h3 className="font-bold text-gray-500 dark:text-gray-400">Bill To</h3>
                            <p className="font-bold">{toName}</p>
                            <p className="text-sm whitespace-pre-line">{toAddress}</p>
                        </div>
                        <div className="text-right">
                           <p><span className="font-bold">Date:</span> {date}</p>
                           <p><span className="font-bold">Due Date:</span> {dueDate}</p>
                        </div>
                    </div>
                    <table className="w-full text-left mb-10">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="p-2">Description</th>
                                <th className="p-2 text-right">Qty</th>
                                <th className="p-2 text-right">Rate</th>
                                <th className="p-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i} className="border-b dark:border-gray-700">
                                    <td className="p-2">{item.description}</td>
                                    <td className="p-2 text-right">{item.quantity}</td>
                                    <td className="p-2 text-right">{item.rate.toFixed(2)}</td>
                                    <td className="p-2 text-right">{(item.quantity * item.rate).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <div className="w-1/2 space-y-2">
                            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Subtotal:</span> <span>{subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Tax ({taxRate}%):</span> <span>{taxAmount.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold text-xl border-t dark:border-gray-600 pt-2"><span >Total:</span> <span>{total.toFixed(2)}</span></div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h3 className="font-bold">Notes</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{notes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};