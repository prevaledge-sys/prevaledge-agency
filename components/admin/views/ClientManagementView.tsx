import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import TrashIcon from '../../../components/icons/TrashIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import EditIcon from '../../../components/icons/EditIcon';
import { inputClass, labelClass } from '../ui/formStyles';

interface Client {
  id: number;
  name: string;
  email: string;
  address: string;
  contactNumber?: string;
  createdAt: string;
}

const ClientManagementView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contactNumber: '',
  });

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Client[] = await response.json();
      setClients(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingClient ? 'PUT' : 'POST';
      const url = editingClient ? `/api/clients/${editingClient.id}` : '/api/clients';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingClient ? 'update' : 'add'} client! status: ${response.status}`);
      }
      await fetchClients(); // Refresh the list
      setIsModalOpen(false);
      setEditingClient(null);
      setFormData({ name: '', email: '', address: '', contactNumber: '', });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this client?')) {
      return;
    }
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete client! status: ${response.status}`);
      }
      await fetchClients(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
    }
  };

  const openAddModal = () => {
    setEditingClient(null);
    setFormData({ name: '', email: '', address: '', contactNumber: '', });
    setIsModalOpen(true);
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    setFormData({ 
      name: client.name,
      email: client.email,
      address: client.address,
      contactNumber: client.contactNumber || '',
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading clients...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-6">Client Management</h1>
      
      <div className="flex justify-end mb-4">
        <Button onClick={openAddModal}><PlusIcon className="w-5 h-5 mr-2" />Add New Client</Button>
      </div>

      {clients.length === 0 ? (
        <div className="text-slate-400 text-center py-8">No clients added yet.</div>
      ) : (
        <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Contact Number</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{client.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300" onClick={() => openEditModal(client)}><EditIcon className="w-5 h-5" /></Button>
                    <Button variant="ghost" className="text-red-500 hover:text-red-400 ml-2" onClick={() => handleDeleteClient(client.id)}><TrashIcon className="w-5 h-5" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] min-h-screen">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
            <form onSubmit={handleAddEditClient} className="space-y-4">
              <div>
                <label htmlFor="name" className={labelClass}>Client Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="address" className={labelClass}>Address</label>
                <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} className={inputClass} rows={3} required />
              </div>
              <div>
                <label htmlFor="contactNumber" className={labelClass}>Contact Number</label>
                <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className={inputClass} />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">{editingClient ? 'Update Client' : 'Add Client'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagementView;
