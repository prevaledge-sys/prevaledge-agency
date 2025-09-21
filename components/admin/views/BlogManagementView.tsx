import React, { useContext } from 'react';
import { SiteDataContext } from '../../../data/siteDataContext';
import type { BlogPost, NewBlogPost } from '../../../types';
import Button from '../../ui/Button';
import BlogForm from '../BlogForm';
import EditIcon from '../../icons/EditIcon';
import TrashIcon from '../../icons/TrashIcon';
import PlusIcon from '../../icons/PlusIcon';
import Toast from '../../ui/Toast';
import LoadingSpinner from '../../ui/LoadingSpinner';
import { useCrudManager } from '../../../hooks/useCrudManager';

const BlogManagementView: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useContext(SiteDataContext);
  
  const {
    isFormVisible,
    editingItem,
    isLoading,
    feedback,
    handleCreateNew,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
  } = useCrudManager<BlogPost, NewBlogPost>(addBlogPost, updateBlogPost, deleteBlogPost);

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
       {feedback && (
        <Toast
          message={feedback.message}
          type={feedback.type}
          onClose={() => {}}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Blog Posts</h1>
        {!isFormVisible && (
            <Button onClick={handleCreateNew}>
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Post
            </Button>
        )}
      </div>
      
      <div className="relative">
        {isLoading && <LoadingSpinner size="md" className="z-20" />}
        {isFormVisible ? (
            <BlogForm 
              post={editingItem} 
              onSave={(data, item) => handleSave(data, item, 'post')} 
              onCancel={handleCancel} 
            />
        ) : (
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                    <tr>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Author</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogPosts.map((post) => (
                    <tr key={post.slug} className="border-b border-slate-800 hover:bg-slate-800/30">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {post.title}
                        </th>
                        <td className="px-6 py-4">{post.author}</td>
                        <td className="px-6 py-4">{post.date}</td>
                        <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-4">
                            <button onClick={() => handleEdit(post)} className="font-medium text-blue-400 hover:text-blue-300" aria-label={`Edit ${post.title}`}>
                            <EditIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleDelete(post, 'post')} className="font-medium text-red-500 hover:text-red-400" aria-label={`Delete ${post.title}`}>
                            <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagementView;