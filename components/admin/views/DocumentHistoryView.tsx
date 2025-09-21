import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import TrashIcon from '../../icons/TrashIcon';
import PrinterIcon from '../../icons/PrinterIcon';

interface DocumentHistoryItem {
  id: number;
  documentType: 'Invoice' | 'Quotation';
  documentNumber: string;
  clientName: string;
  total: number;
  currency: string;
  issueDate: string;
  createdAt: string; // Added by the backend
}

const DocumentHistoryView: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'All' | 'Invoice' | 'Quotation'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams();
      if (filterType !== 'All') {
        queryParams.append('documentType', filterType);
      }
      if (searchTerm) {
        queryParams.append('searchTerm', searchTerm);
      }
      const url = `/.netlify/functions/documents?${queryParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: DocumentHistoryItem[] = await response.json();
      // Ensure dates are Date objects for consistent display
      const formattedData = data.map(doc => ({
        ...doc,
        createdAt: new Date(doc.createdAt).toLocaleDateString(),
        issueDate: new Date(doc.issueDate).toLocaleDateString(),
      }));
      setDocuments(formattedData);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setError('Failed to load document history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [filterType, searchTerm]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        const response = await fetch(`/.netlify/functions/documents/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
      } catch (err) {
        console.error("Failed to delete document:", err);
        setError('Failed to delete document.');
      }
    }
  };

  const handlePrintDocument = (doc: DocumentHistoryItem) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
            <title>${doc.documentType} ${doc.documentNumber}</title>
            <style>
                body { font-family: sans-serif; margin: 20px; color: #333; }
                h1 { color: #0056b3; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .header, .footer { margin-bottom: 20px; }
                .total { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${doc.documentType}</h1>
                <p><strong>Number:</strong> ${doc.documentNumber}</p>
                <p><strong>Client:</strong> ${doc.clientName}</p>
                <p><strong>Issue Date:</strong> ${doc.issueDate}</p>
                <p><strong>Generated At:</strong> ${doc.createdAt}</p>
            </div>
            
            <h2>Summary</h2>
            <table>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <td>Total Amount</td>
                    <td class="total">${doc.currency} ${doc.total.toFixed(2)}</td>
                </tr>
            </table>
            
            <p style="margin-top: 30px;">This is a summary of your ${doc.documentType.toLowerCase()}.</p>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading document history...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-6">Document History</h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'All' | 'Invoice' | 'Quotation')}
          className="form-select bg-slate-800/50 border border-slate-700 rounded-md px-4 py-2 text-white"
        >
          <option value="All">All Document Types</option>
          <option value="Invoice">Invoices</option>
          <option value="Quotation">Quotations</option>
        </select>
        <input
          type="text"
          placeholder="Search by client or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input bg-slate-800/50 border border-slate-700 rounded-md px-4 py-2 text-white flex-grow"
        />
        <Button onClick={fetchDocuments}>Apply Filters</Button>
      </div>
      {documents.length === 0 ? (
        <p className="text-slate-400">No documents generated yet. Generate an Invoice or Quotation to see its history here.</p>
      ) : (
        <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Number</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Issue Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Generated At</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{doc.documentType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.documentNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.currency} {doc.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.issueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{doc.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="secondary" onClick={() => handlePrintDocument(doc)} className="p-2"><PrinterIcon className="w-5 h-5" /></Button>
                      <Button variant="danger" onClick={() => handleDelete(doc.id)} className="p-2"><TrashIcon className="w-5 h-5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentHistoryView;
