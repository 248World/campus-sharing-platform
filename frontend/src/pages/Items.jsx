import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Mock data that will always show
  const mockItems = [
    {
      id: 1,
      title: 'Calculus Textbook',
      description: 'Calculus 3rd Edition, excellent condition with minimal highlighting',
      category: 'Textbooks',
      condition: 'Like New',
      status: 'available',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Coffee Maker',
      description: 'Basic 4-cup coffee maker, perfect for dorm rooms',
      category: 'Kitchen Items',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: 'Mountain Bike',
      description: 'Used mountain bike, recently tuned up, includes lock',
      category: 'Transportation',
      condition: 'Fair',
      status: 'borrowed',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      title: 'Chemistry Lab Kit',
      description: 'Complete lab kit for Chemistry 101, includes safety goggles',
      category: 'Electronics',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-20'
    },
    {
      id: 5,
      title: 'Dining Table',
      description: 'Small wooden table, seats 4 people, easy to assemble',
      category: 'Furniture',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-18'
    },
    {
      id: 6,
      title: 'Basketball',
      description: 'Official size basketball, good condition',
      category: 'Sports Equipment',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-12'
    },
    {
      id: 7,
      title: 'Winter Jacket',
      description: 'Waterproof winter jacket, size medium, like new',
      category: 'Clothing',
      condition: 'Like New',
      status: 'available',
      createdAt: '2024-01-08'
    },
    {
      id: 8,
      title: 'Graphing Calculator',
      description: 'TI-84 Plus calculator with case, works perfectly',
      category: 'Electronics',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-25'
    }
  ];

  const categories = [
    'All Categories',
    'Textbooks',
    'Electronics',
    'Furniture',
    'Kitchen Items',
    'Sports Equipment',
    'Clothing',
    'Transportation',
    'Other'
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 800);
  }, []);

  // Filter items based on search and category
  const filteredItems = items.filter(item => {
    const matchesSearch = search === '' || 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === '' || 
      category === 'All Categories' || 
      item.category === category;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Textbooks': '#3b82f6',
      'Electronics': '#8b5cf6',
      'Furniture': '#10b981',
      'Kitchen Items': '#f59e0b',
      'Sports Equipment': '#ef4444',
      'Clothing': '#ec4899',
      'Transportation': '#6366f1',
      'Other': '#6b7280'
    };
    return colors[category] || colors['Other'];
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh' 
      }}>
        <div>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f4f6',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ 
            marginTop: '20px', 
            color: '#666', 
            fontSize: '18px',
            textAlign: 'center'
          }}>
            Loading items...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px' 
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '10px'
        }}>
          Browse Items
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#6b7280',
          marginBottom: '30px'
        }}>
          Find items shared by students on campus
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr auto',
          gap: '15px',
          alignItems: 'end'
        }}>
          {/* Search Input */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Search Items
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or description..."
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Filter by Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div>
            <div style={{ 
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              {filteredItems.length} Items
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ 
            fontSize: '60px',
            marginBottom: '20px'
          }}>
            📦
          </div>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '10px'
          }}>
            No items found
          </h3>
          <p style={{ 
            color: '#6b7280',
            marginBottom: '25px',
            fontSize: '16px'
          }}>
            Try different search terms or categories
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('');
            }}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '25px'
        }}>
          {filteredItems.map(item => (
            <div 
              key={item.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Category Badge */}
              <div style={{
                backgroundColor: getCategoryColor(item.category),
                color: 'white',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {item.category}
              </div>

              {/* Item Content */}
              <div style={{ padding: '25px' }}>
                {/* Title */}
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '10px',
                  lineHeight: '1.4'
                }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  minHeight: '60px'
                }}>
                  {item.description}
                </p>

                {/* Details Row */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#9ca3af',
                      marginBottom: '4px'
                    }}>
                      Condition
                    </div>
                    <div style={{ 
                      fontWeight: '600', 
                      color: '#374151'
                    }}>
                      {item.condition}
                    </div>
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#9ca3af',
                      marginBottom: '4px'
                    }}>
                      Status
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600',
                      backgroundColor: item.status === 'available' ? '#d1fae5' : '#fef3c7',
                      color: item.status === 'available' ? '#065f46' : '#92400e'
                    }}>
                      {item.status.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/items/${item.id}`}
                  style={{
                    width: '100%',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Note */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        padding: '20px',
        color: '#6b7280',
        fontSize: '14px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p>Showing {filteredItems.length} of {items.length} items</p>
        <p style={{ marginTop: '5px' }}>Want to share something?{' '}
          <Link 
            to="/post" 
            style={{ 
              color: '#3b82f6', 
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Post an item
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Items;