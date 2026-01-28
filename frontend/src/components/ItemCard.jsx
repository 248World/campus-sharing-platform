import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Textbooks': { bg: '#dbeafe', text: '#1e40af' },
      'Electronics': { bg: '#ede9fe', text: '#5b21b6' },
      'Furniture': { bg: '#d1fae5', text: '#065f46' },
      'Kitchen Items': { bg: '#fef3c7', text: '#92400e' },
      'Sports Equipment': { bg: '#fee2e2', text: '#991b1b' },
      'Clothing': { bg: '#fce7f3', text: '#9d174d' },
      'Transportation': { bg: '#e0e7ff', text: '#3730a3' },
      'Other': { bg: '#f3f4f6', text: '#374151' }
    };
    return colors[category] || colors['Other'];
  };

  const color = getCategoryColor(item.category);

  return (
    <div className="card" style={{ transition: 'box-shadow 0.2s' }}>
      {/* Category Badge */}
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: '500',
        backgroundColor: color.bg,
        color: color.text,
        marginBottom: '1rem'
      }}>
        {item.category}
      </span>
      
      {/* Title */}
      <h3 style={{ 
        fontSize: '1.125rem', 
        fontWeight: '600', 
        marginBottom: '0.5rem',
        color: '#111827'
      }}>
        {item.title}
      </h3>
      
      {/* Description */}
      {item.description && (
        <p style={{ 
          color: '#6b7280', 
          fontSize: '14px',
          marginBottom: '1rem',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {item.description}
        </p>
      )}
      
      {/* Condition & Status */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        fontSize: '14px'
      }}>
        <span style={{ color: '#6b7280' }}>
          Condition: <span style={{ fontWeight: '500' }}>{item.condition || 'Good'}</span>
        </span>
        <span style={{ 
          fontWeight: '500',
          color: item.status === 'available' ? '#059669' : '#d97706'
        }}>
          {item.status || 'available'}
        </span>
      </div>
      
      {/* View Button */}
      <Link 
        to={`/items/${item.id}`}
        className="btn btn-primary"
        style={{ display: 'block', textAlign: 'center' }}
      >
        View Details
      </Link>
    </div>
  );
};

export default ItemCard;