import React from 'react';
import ItemForm from '../components/ItemForm';

const PostItem = () => {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* Simple Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px' 
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#333',
          margin: '0 0 10px 0'
        }}>
          Share an Item
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '16px',
          margin: 0
        }}>
          Post items you want to share with fellow students
        </p>
      </div>
      
      {/* Just the Form */}
      <ItemForm />
    </div>
  );
};

export default PostItem;