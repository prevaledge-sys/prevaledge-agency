import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import TrashIcon from '../../../components/icons/TrashIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import EditIcon from '../../../components/icons/EditIcon';
import { inputClass, labelClass } from '../ui/formStyles';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Storing as string to match input type
  category?: string;
  createdAt: string;
}

const ProductCatalogView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingProduct ? 'update' : 'add'} product! status: ${response.status}`);
      }
      await fetchProducts(); // Refresh the list
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', category: '', });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete product! status: ${response.status}`);
      }
      await fetchProducts(); // Refresh the list
    } catch (err: any) {
      setError(err.message);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', category: '', });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({ 
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category || '',
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-6">Product Catalog</h1>
      
      <div className="flex justify-end mb-4">
        <Button onClick={openAddModal}><PlusIcon className="w-5 h-5 mr-2" />Add New Product</Button>
      </div>

      {products.length === 0 ? (
        <div className="text-slate-400 text-center py-8">No products added yet.</div>
      ) : (
        <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Category</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{String(product.price || 'N/A')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{product.category || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300" onClick={() => openEditModal(product)}><EditIcon className="w-5 h-5" /></Button>
                    <Button variant="ghost" className="text-red-500 hover:text-red-400 ml-2" onClick={() => handleDeleteProduct(product.id)}><TrashIcon className="w-5 h-5" /></Button>
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
            <h2 className="text-2xl font-bold text-white mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleAddEditProduct} className="space-y-4">
              <div>
                <label htmlFor="name" className={labelClass}>Product Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={inputClass} rows={3} required />
              </div>
              <div>
                <label htmlFor="price" className={labelClass}>Price</label>
                <input type="text" id="price" name="price" value={formData.price} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="category" className={labelClass}>Category (Optional)</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} className={inputClass} />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalogView;
