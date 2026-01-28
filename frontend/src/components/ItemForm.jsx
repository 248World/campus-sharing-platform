import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createItem } from '../services/api';

const ItemForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);

  const categories = [
    'Textbooks',
    'Electronics',
    'Furniture',
    'Kitchen Items',
    'Sports Equipment',
    'Clothing',
    'Transportation',
    'Other'
  ];

  const conditions = [
    'New',
    'Like New',
    'Good',
    'Fair',
    'Poor'
  ];

  const onSubmit = async (data) => {
    if (!token) {
      alert('Please login to post items');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const itemData = {
        title: data.title,
        description: data.description,
        category: data.category,
        condition: data.condition
      };

      const response = await createItem(itemData, token);
      
      setSuccess(true);
      reset();
      setImages([]);
      
      setTimeout(() => {
        navigate('/items');
      }, 2000);
      
    } catch (error) {
      console.error('Error posting item:', error);
      alert(error.response?.data?.error || 'Failed to post item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files.map(f => f.name)].slice(0, 5));
  };

  // Icons as SVG components
  const UploadIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      padding: '0 20px'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '24px'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#333',
          marginBottom: '24px'
        }}>
          Share an Item
        </h2>
        
        {success && (
          <div style={{ 
            marginBottom: '16px', 
            padding: '16px', 
            backgroundColor: '#d1fae5',
            color: '#065f46',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #a7f3d0'
          }}>
            <CheckCircleIcon />
            <span style={{ marginLeft: '8px' }}>
              Item posted successfully! Redirecting...
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '6px'
            }}>
              Item Title *
            </label>
            <input
              {...register('title', { 
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                fontFamily: 'inherit'
              }}
              placeholder="e.g., Calculus Textbook, Coffee Maker, Bicycle"
            />
            {errors.title && (
              <p style={{ 
                color: '#dc2626', 
                fontSize: '14px', 
                marginTop: '4px'
              }}>
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '6px'
            }}>
              Category *
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                fontFamily: 'inherit',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p style={{ 
                color: '#dc2626', 
                fontSize: '14px', 
                marginTop: '4px'
              }}>
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Condition */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '6px'
            }}>
              Condition
            </label>
            <select
              {...register('condition')}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                fontFamily: 'inherit',
                backgroundColor: 'white'
              }}
            >
              {conditions.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '6px'
            }}>
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              placeholder="Describe your item in detail..."
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '6px'
            }}>
              Images (Optional)
            </label>
            <div style={{
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ marginBottom: '8px' }}>
                <UploadIcon />
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label 
                htmlFor="image-upload" 
                style={{
                  color: '#3b82f6',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Click to upload images
              </label>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280', 
                marginTop: '4px'
              }}>
                PNG, JPG, GIF up to 5MB each
              </p>
              
              {images.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#4b5563', 
                    marginBottom: '8px'
                  }}>
                    Selected images ({images.length}/5):
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px',
                    justifyContent: 'center'
                  }}>
                    {images.map((image, index) => (
                      <div key={index} style={{
                        backgroundColor: '#f3f4f6',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#374151'
                      }}>
                        {image}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = '#3b82f6';
            }}
          >
            {isSubmitting ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}></div>
                Posting...
              </div>
            ) : 'Post Item for Sharing'}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ItemForm;