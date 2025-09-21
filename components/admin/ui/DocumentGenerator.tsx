import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import Button from '../../ui/Button';
import { inputClass, labelClass } from './formStyles';
import TrashIcon from '../../icons/TrashIcon';
import PlusIcon from '../../icons/PlusIcon';
import BrainCircuitIcon from '../../icons/BrainCircuitIcon';
import SaveIcon from '../../icons/SaveIcon';

interface LineItem {
  id: number;
  description: string;
  quantity: string;
  price: string;
}

const currencies = [
  { code: 'USD', name: 'United States Dollar' }, { code: 'EUR', name: 'Euro' }, { code: 'JPY', name: 'Japanese Yen' }, { code: 'GBP', name: 'British Pound' }, { code: 'AUD', name: 'Australian Dollar' }, { code: 'CAD', name: 'Canadian Dollar' }, { code: 'CHF', name: 'Swiss Franc' }, { code: 'CNY', name: 'Chinese Yuan' }, { code: 'INR', name: 'Indian Rupee' }, { code: 'BRL', name: 'Brazilian Real' }, { code: 'RUB', name: 'Russian Ruble' }, { code: 'KRW', name: 'South Korean Won' }, { code: 'SGD', name: 'Singapore Dollar' }, { code: 'NOK', name: 'Norwegian Krone' }, { code: 'MXN', name: 'Mexican Peso' }, { code: 'HKD', name: 'Hong Kong Dollar' }, { code: 'NZD', name: 'New Zealand Dollar' }, { code: 'SEK', name: 'Swedish Krona' }, { code: 'ZAR', name: 'South African Rand' }, { code: 'TRY', name: 'Turkish Lira' }, { code: 'PLN', name: 'Polish Złoty' }, { code: 'THB', name: 'Thai Baht' }, { code: 'IDR', name: 'Indonesian Rupiah' }, { code: 'HUF', name: 'Hungarian Forint' }, { code: 'CZK', name: 'Czech Koruna' }, { code: 'ILS', name: 'Israeli New Shekel' }, { code: 'CLP', name: 'Chilean Peso' }, { code: 'PHP', name: 'Philippine Peso' }, { code: 'AED', name: 'UAE Dirham' }, { code: 'COP', name: 'Colombian Peso' }, { code: 'SAR', name: 'Saudi Riyal' }, { code: 'MYR', name: 'Malaysian Ringgit' },
];

interface DocumentGeneratorProps {
  documentType: 'Invoice' | 'Quotation';
  documentNumberPrefix: string;
  title: string;
  initialNotes: string;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ documentType, documentNumberPrefix, title, initialNotes }) => {
  const [isPreview, setIsPreview] = useState(false);
  
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  
  const [documentNumber, setDocumentNumber] = useState(`${documentNumberPrefix}-001`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [secondaryDate, setSecondaryDate] = useState('');
  const [currency, setCurrency] = useState('USD');
  
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, description: '', quantity: '1', price: '0.00' },
  ]);
  const [taxRate, setTaxRate] = useState('0');
  const [notes, setNotes] = useState(initialNotes);
  const [showBarcode, setShowBarcode] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = lineItems.reduce((acc, item) => (acc + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)), 0);
    const newTaxAmount = newSubtotal * (parseFloat(taxRate) / 100 || 0);
    const newTotal = newSubtotal + newTaxAmount;
    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
    setTotal(newTotal);
  }, [lineItems, taxRate]);

  const handleAddLineItem = () => setLineItems([...lineItems, { id: Date.now(), description: '', quantity: '1', price: '0.00' }]);
  const handleRemoveLineItem = (id: number) => setLineItems(lineItems.filter(item => item.id !== id));
  const handleLineItemChange = (id: number, field: keyof Omit<LineItem, 'id'>, value: string) => setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));

  const saveDocument = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/.netlify/functions/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType,
          documentNumber,
          clientName,
          clientEmail,
          clientAddress,
          contactNumber,
          total,
          currency,
          issueDate,
        }),
      });
      if (!response.ok) {
        console.error('Failed to save document history');
      }
    } catch (error) {
      console.error('Error saving document history:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGeneratePreview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreview(true);
  };

  const handleSave = async () => {
    await saveDocument();
    alert('Document saved!');
  };
  
  const handlePrint = async () => {
    await saveDocument();
    window.print();
  };
  
  const formatCurrency = (amount: number, currencyCode: string) => {
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
    } catch (e) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
  };

  const isInvoice = documentType === 'Invoice';
  const previewId = isInvoice ? "invoice-preview" : "quotation-preview";
  const secondaryDateLabel = isInvoice ? "Due Date" : "Valid Until";
  const clientInfoLabel = isInvoice ? "Bill To:" : "Prepared For:";

  if (isPreview) {
    return (
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
             <div className="flex justify-between items-center mb-6 no-print">
                <h1 className="text-3xl font-bold text-white">{documentType} Preview</h1>
                <div className="flex gap-4">
                    <Button variant="secondary" onClick={() => setIsPreview(false)}>Back to Edit</Button>
                    <Button onClick={handlePrint}>Print {documentType}</Button>
                    <Button onClick={handleSave} disabled={isSaving}><SaveIcon className="w-5 h-5 mr-2" />{isSaving ? 'Saving...' : 'Save'}</Button>
                </div>
            </div>
            <div id={previewId} className="bg-white text-slate-800 rounded-lg shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
                <header className="flex justify-between items-start mb-10">
                    <div>
                        <BrainCircuitIcon className="w-16 h-16 text-blue-600" />
                        <h1 className="text-3xl font-bold text-slate-900 mt-2">Prevaledge</h1>
                        <p>C 1 To 26 Vardhman Grandeur, Andheri West</p>
                        <p>Mumbai, India 400058</p>
                        <p>info@prevaledge.com</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-bold uppercase text-slate-500">{documentType}</h2>
                        <p className="mt-2"><strong>{documentType} #:</strong> {documentNumber}</p>
                        <p><strong>Date:</strong> {new Date(issueDate).toLocaleDateString()}</p>
                        {secondaryDate && <p><strong>{secondaryDateLabel}:</strong> {new Date(secondaryDate).toLocaleDateString()}</p>}
                    </div>
                </header>
                <section className="mb-10">
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">{clientInfoLabel}</h3>
                    <p className="font-bold text-lg">{clientName}</p>
                    <p>{clientEmail}</p>
                    <p>{clientAddress.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </section>
                <section>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="p-3 font-bold uppercase text-slate-600">Description</th>
                                <th className="p-3 font-bold uppercase text-slate-600 text-right">Quantity</th>
                                <th className="p-3 font-bold uppercase text-slate-600 text-right">Unit Price</th>
                                <th className="p-3 font-bold uppercase text-slate-600 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map(item => (
                                <tr key={item.id} className="border-b border-slate-200">
                                    <td className="p-3">{item.description}</td>
                                    <td className="p-3 text-right">{item.quantity}</td>
                                    <td className="p-3 text-right">{formatCurrency(parseFloat(item.price) || 0, currency)}</td>
                                    <td className="p-3 text-right">{formatCurrency((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0), currency)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="flex justify-end mt-6">
                    <div className="w-full max-w-xs">
                        <div className="flex justify-between py-2"><span>Subtotal</span><span>{formatCurrency(subtotal, currency)}</span></div>
                        <div className="flex justify-between py-2"><span>Tax ({taxRate}%)</span><span>{formatCurrency(taxAmount, currency)}</span></div>
                        <div className="flex justify-between py-3 bg-slate-100 px-3 mt-2 font-bold text-lg"><span>Total</span><span>{formatCurrency(total, currency)}</span></div>
                    </div>
                </section>
                {notes && <section className="mt-10"><h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Notes:</h3><p className="text-slate-600">{notes}</p></section>}
                {showBarcode && isInvoice && (
                  <section className="mt-10 text-center">
                    <Barcode value={documentNumber} />
                  </section>
                )}
            </div>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
      <form onSubmit={handleGeneratePreview} className="bg-slate-900/70 border border-slate-800 rounded-lg p-6 space-y-8">
        <fieldset>
          <legend className="text-xl font-semibold text-white mb-4">Client Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label htmlFor="clientName" className={labelClass}>Client Name</label><input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} className={inputClass} required /></div>
            <div><label htmlFor="clientEmail" className={labelClass}>Client Email</label><input type="email" id="clientEmail" value={clientEmail} onChange={e => setClientEmail(e.target.value)} className={inputClass} required /></div>
            <div><label htmlFor="contactNumber" className={labelClass}>Contact Number</label><input type="tel" id="contactNumber" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className={inputClass} /></div>
            <div className="md:col-span-2"><label htmlFor="clientAddress" className={labelClass}>Client Address</label><textarea id="clientAddress" value={clientAddress} onChange={e => setClientAddress(e.target.value)} className={inputClass} rows={3} required /></div>
          </div>
        </fieldset>
        
        <fieldset>
          <legend className="text-xl font-semibold text-white mb-4">{documentType} Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><label htmlFor="documentNumber" className={labelClass}>{documentType} Number</label><input type="text" id="documentNumber" value={documentNumber} onChange={e => setDocumentNumber(e.target.value)} className={inputClass} required /></div>
            <div><label htmlFor="currency" className={labelClass}>Currency</label><select id="currency" name="currency" value={currency} onChange={e => setCurrency(e.target.value)} className={`${inputClass} h-[42px]`}>{currencies.map(c => (<option key={c.code} value={c.code}>{c.name} ({c.code})</option>))}</select></div>
            <div><label htmlFor="issueDate" className={labelClass}>{documentType} Date</label><input type="date" id="issueDate" value={issueDate} onChange={e => setIssueDate(e.target.value)} className={inputClass} required /></div>
            <div><label htmlFor="secondaryDate" className={labelClass}>{secondaryDateLabel} (Optional)</label><input type="date" id="secondaryDate" value={secondaryDate} onChange={e => setSecondaryDate(e.target.value)} className={inputClass} /></div>
          </div>
        </fieldset>

        <fieldset>
            <legend className="text-xl font-semibold text-white mb-4">Line Items</legend>
            <div className="space-y-4">
                {lineItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-12 md:col-span-6">{index === 0 && <label className={`${labelClass} hidden md:block`}>Description</label>}<input type="text" placeholder="Service or product description" value={item.description} onChange={e => handleLineItemChange(item.id, 'description', e.target.value)} className={inputClass} required /></div>
                        <div className="col-span-4 md:col-span-2">{index === 0 && <label className={`${labelClass} hidden md:block`}>Quantity</label>}<input type="text" inputMode="decimal" placeholder="1" value={item.quantity} onChange={e => handleLineItemChange(item.id, 'quantity', e.target.value)} className={inputClass} required /></div>
                        <div className="col-span-4 md:col-span-2">{index === 0 && <label className={`${labelClass} hidden md:block`}>Price</label>}<input type="text" inputMode="decimal" placeholder="0.00" value={item.price} onChange={e => handleLineItemChange(item.id, 'price', e.target.value)} className={inputClass} required /></div>
                        <div className="col-span-3 md:col-span-1 text-right self-end pb-2 text-slate-300">{formatCurrency((parseFloat(item.price) || 0) * (parseFloat(item.quantity) || 0), currency)}</div>
                        <div className="col-span-1 text-right self-end">{lineItems.length > 1 && (<button type="button" onClick={() => handleRemoveLineItem(item.id)} className="text-red-500 hover:text-red-400 p-2" aria-label="Remove item"><TrashIcon className="w-5 h-5" /></button>)}</div>
                    </div>
                ))}
            </div>
            <Button type="button" variant="secondary" onClick={handleAddLineItem} className="mt-4"><PlusIcon className="w-5 h-5 mr-2" />Add Item</Button>
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <label htmlFor="notes" className={labelClass}>Notes / Terms (Optional)</label>
              <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} className={inputClass} rows={4} placeholder="e.g., Payment terms, project scope" />
              <div className="mt-4">
                <label className="flex items-center">
                  <input type="checkbox" checked={showBarcode} onChange={e => setShowBarcode(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600 bg-slate-800 border-slate-700 rounded focus:ring-blue-500" />
                  <span className="ml-2 text-slate-300">Show Barcode on {documentType}</span>
                </label>
              </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between"><span className={labelClass}>Subtotal</span><span className="text-lg font-medium text-white">{formatCurrency(subtotal, currency)}</span></div>
                <div className="flex items-center justify-between"><label htmlFor="taxRate" className={labelClass}>Tax Rate (%)</label><input type="text" inputMode="decimal" id="taxRate" value={taxRate} onChange={e => setTaxRate(e.target.value)} className={`${inputClass} w-24 text-right`} /></div>
                <div className="flex items-center justify-between"><span className={labelClass}>Tax</span><span className="text-lg font-medium text-white">{formatCurrency(taxAmount, currency)}</span></div>
                <div className="flex items-center justify-between border-t border-slate-700 pt-4 mt-2"><span className="text-xl font-bold text-white">Total</span><span className="text-2xl font-bold text-blue-400">{formatCurrency(total, currency)}</span></div>
            </div>
        </div>
        <div className="flex justify-end pt-6 border-t border-slate-800"><Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Generate Preview'}</Button></div>
      </form>
    </div>
  );
};

export default DocumentGenerator;
