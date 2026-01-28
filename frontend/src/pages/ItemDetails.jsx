import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  // Mock data - in real app, fetch from API
  const mockItems = [
    {
      id: 1,
      title: 'Calculus Textbook',
      description: 'Calculus 3rd Edition, excellent condition with minimal highlighting. Perfect for Calculus I, II, and III courses. Includes practice problems and solutions.',
      category: 'Textbooks',
      condition: 'Like New',
      status: 'available',
      createdAt: '2024-01-15',
      owner: {
        name: 'John Doe',
        university: 'University of Technology',
        joined: '2023-09-01',
        rating: '4.8/5',
        itemsShared: 5
      },
      details: {
        brand: 'Pearson',
        edition: '3rd',
        isbn: '978-0134763644',
        pickupLocation: 'Main Campus Library',
        maxBorrowDays: 14
      }
    },
    {
      id: 2,
      title: 'Coffee Maker',
      description: 'Basic 4-cup coffee maker, perfect for dorm rooms. Includes reusable filter. Works perfectly, just cleaned.',
      category: 'Kitchen Items',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-10',
      owner: {
        name: 'Sarah Johnson',
        university: 'University of Technology',
        joined: '2023-08-15',
        rating: '4.9/5',
        itemsShared: 8
      },
      details: {
        brand: 'Hamilton Beach',
        model: '4-Cup Personal',
        includes: ['Coffee maker', 'Reusable filter'],
        pickupLocation: 'Student Dorms - Building B',
        maxBorrowDays: 7
      }
    },
    {
      id: 3,
      title: 'Mountain Bike',
      description: 'Used mountain bike, recently tuned up, includes lock. Great for campus transportation. 21-speed, medium frame.',
      category: 'Transportation',
      condition: 'Fair',
      status: 'borrowed',
      createdAt: '2024-01-05',
      owner: {
        name: 'Mike Chen',
        university: 'University of Technology',
        joined: '2024-01-01',
        rating: '4.5/5',
        itemsShared: 2
      },
      details: {
        brand: 'Schwinn',
        frameSize: 'Medium (17")',
        includes: ['Bike lock', 'Helmet', 'Repair kit'],
        pickupLocation: 'East Campus Parking',
        maxBorrowDays: 30
      }
    },
    {
      id: 4,
      title: 'Chemistry Lab Kit',
      description: 'Complete lab kit for Chemistry 101, includes safety goggles, test tubes, and basic chemicals.',
      category: 'Electronics',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-20',
      owner: {
        name: 'Dr. Wilson',
        university: 'University of Technology',
        joined: '2023-10-15',
        rating: '5.0/5',
        itemsShared: 12
      },
      details: {
        includes: ['Safety goggles', 'Test tubes', 'Beakers', 'Measuring equipment'],
        pickupLocation: 'Science Building',
        maxBorrowDays: 10
      }
    },
    {
      id: 5,
      title: 'Dining Table',
      description: 'Small wooden table, seats 4 people, easy to assemble. Perfect for small apartments.',
      category: 'Furniture',
      condition: 'Good',
      status: 'available',
      createdAt: '2024-01-18',
      owner: {
        name: 'Emily Rodriguez',
        university: 'University of Technology',
        joined: '2023-11-20',
        rating: '4.7/5',
        itemsShared: 3
      },
      details: {
        material: 'Wood',
        dimensions: '48" x 30" x 30"',
        weight: '25 lbs',
        pickupLocation: 'West Campus Apartments',
        maxBorrowDays: 21
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundItem = mockItems.find(item => item.id === parseInt(id));
      if (foundItem) {
        setItem(foundItem);
      }
      setLoading(false);
    }, 800);
  }, [id]);

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

  const handleRequestBorrow = () => {
    if (item.status === 'available') {
      alert(`Borrow request sent for: ${item.title}\nThe owner will contact you soon!`);
    } else {
      alert('This item is currently not available for borrowing.');
    }
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
            Loading item details...
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '100px 20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ 
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          ❌
        </div>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '15px'
        }}>
          Item Not Found
        </h2>
        <p style={{ 
          color: '#6b7280',
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          The item you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/items')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 30px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Browse All Items
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Breadcrumb */}
      <div style={{ 
        marginBottom: '30px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
        {' > '}
        <Link to="/items" style={{ color: '#3b82f6', textDecoration: 'none' }}>Browse Items</Link>
        {' > '}
        <span style={{ color: '#374151', fontWeight: '500' }}>{item.title}</span>
      </div>

      {/* Main Content */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '30px'
      }}>
        {/* Left Column - Item Details */}
        <div>
          {/* Item Header */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            marginBottom: '20px'
          }}>
            {/* Category Badge */}
            <div style={{
              display: 'inline-block',
              backgroundColor: getCategoryColor(item.category),
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              {item.category}
            </div>

            {/* Title */}
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '15px',
              lineHeight: '1.3'
            }}>
              {item.title}
            </h1>

            {/* Status & Condition */}
            <div style={{ 
              display: 'flex', 
              gap: '20px',
              marginBottom: '25px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#9ca3af',
                  marginBottom: '5px'
                }}>
                  Status
                </div>
                <div style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: item.status === 'available' ? '#d1fae5' : '#fef3c7',
                  color: item.status === 'available' ? '#065f46' : '#92400e',
                  display: 'inline-block'
                }}>
                  {item.status.toUpperCase()}
                </div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#9ca3af',
                  marginBottom: '5px'
                }}>
                  Condition
                </div>
                <div style={{ 
                  fontWeight: '600', 
                  color: '#374151',
                  fontSize: '16px'
                }}>
                  {item.condition}
                </div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#9ca3af',
                  marginBottom: '5px'
                }}>
                  Posted
                </div>
                <div style={{ 
                  color: '#374151',
                  fontSize: '16px'
                }}>
                  {item.createdAt}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '15px'
              }}>
                Description
              </h3>
              <p style={{ 
                color: '#4b5563',
                fontSize: '16px',
                lineHeight: '1.7'
              }}>
                {item.description}
              </p>
            </div>

            {/* Details Section */}
            {item.details && (
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  Item Details
                </h3>
                <div style={{ 
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  {Object.entries(item.details).map(([key, value]) => (
                    <div key={key} style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <span style={{ 
                        color: '#6b7280',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span style={{ 
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Safety Tips */}
          <div style={{ 
            backgroundColor: '#dbeafe',
            borderRadius: '12px',
            padding: '25px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '20px' }}>🔒</span> Safety Tips
            </h3>
            <ul style={{ 
              color: '#374151',
              paddingLeft: '20px',
              lineHeight: '1.6'
            }}>
              <li>Meet in public, well-lit areas on campus</li>
              <li>Inspect the item thoroughly before accepting</li>
              <li>Use the campus messaging system for communication</li>
              <li>Report any suspicious activity to campus security</li>
              <li>Agree on return terms before borrowing</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Action Panel */}
        <div>
          {/* Owner Info */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '25px',
            marginBottom: '20px'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              Owner Information
            </h3>
            
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                {item.owner.name.charAt(0)}
              </div>
              <div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {item.owner.name}
                </div>
                <div style={{ 
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  {item.owner.university}
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{ 
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '5px'
                }}>
                  Rating
                </div>
                <div style={{ 
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#f59e0b'
                }}>
                  {item.owner.rating}
                </div>
              </div>
              <div style={{ 
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '5px'
                }}>
                  Items Shared
                </div>
                <div style={{ 
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  {item.owner.itemsShared}
                </div>
              </div>
            </div>

            <button
              onClick={() => setContactVisible(!contactVisible)}
              style={{
                width: '100%',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: contactVisible ? '15px' : '0'
              }}
            >
              {contactVisible ? 'Hide Contact Info' : 'Show Contact Info'}
            </button>

            {contactVisible && (
              <div style={{ 
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ 
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '5px'
                  }}>
                    Preferred Contact
                  </div>
                  <div style={{ 
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Campus Messaging System
                  </div>
                </div>
                <div style={{ 
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.5'
                }}>
                  Contact through our secure campus messaging system for safety and privacy.
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '25px'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              Borrow This Item
            </h3>

            {item.status === 'available' ? (
              <>
                <button
                  onClick={handleRequestBorrow}
                  style={{
                    width: '100%',
                    backgroundColor: '#10b981',
                    color: 'white',
                    padding: '15px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                >
                  Request to Borrow
                </button>
                
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight: '1.5'
                }}>
                  You'll have {item.details?.maxBorrowDays || 7} days to borrow this item
                </p>
              </>
            ) : (
              <div style={{ 
                backgroundColor: '#fef3c7',
                color: '#92400e',
                padding: '15px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                ⏳ Currently unavailable for borrowing
              </div>
            )}

            <div style={{ 
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '15px'
              }}>
                Quick Actions
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => navigate('/items')}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Browse More Items
                </button>
                <button
                  onClick={() => window.print()}
                  style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Print Details
                </button>
              </div>
            </div>
          </div>

          {/* Report Section */}
          <div style={{ 
            marginTop: '20px',
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <p>
              See something wrong?{' '}
              <button
                onClick={() => alert('Report submitted. Campus security will review.')}
                style={{
                  color: '#ef4444',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Report this item
              </button>
            </p>
          </div>
        </div>
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

export default ItemDetails;