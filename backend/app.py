from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from datetime import timedelta, datetime
import os
from database import db
from models.user import User
from models.item import Item

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///campus_sharing.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # CORS Configuration - UPDATED
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"],
            "expose_headers": ["Authorization"],
            "supports_credentials": False,
            "max_age": 600
        }
    })
    
    # Add CORS headers manually (backup)
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Expose-Headers', 'Authorization')
        return response
    
    jwt = JWTManager(app)
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
    try:
        from routes.auth import auth_bp
        from routes.items import items_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        app.register_blueprint(items_bp, url_prefix='/api/items')
    except ImportError:
        print("Routes not found - make sure routes/ directory exists")
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'service': 'Campus Sharing API',
            'version': '1.0.0',
            'database': 'connected',
            'items_count': Item.query.count() if hasattr(Item, 'query') else 0
        })
    
    # Test endpoint to verify authentication
    @app.route('/api/test/auth')
    @jwt_required(optional=True)  # Works with or without token
    def test_auth():
        current_user = get_jwt_identity()
        return jsonify({
            'message': 'Authentication test',
            'authenticated': current_user is not None,
            'user_id': current_user,
            'timestamp': datetime.utcnow().isoformat()
        })
    
    # Initialize database and add sample data
    with app.app_context():
        # Create tables
        db.create_all()
        print("✅ Database tables created")
        
        # Check if we have users
        if User.query.count() == 0:
            print("📝 Creating sample user...")
            # Create a test user
            test_user = User(
                email='student@university.edu',
                first_name='John',
                last_name='Doe',
                university='University of Technology'
            )
            test_user.set_password('password123')
            db.session.add(test_user)
            db.session.commit()
            print(f"✅ Created user: {test_user.email}")
        
        # Check if we have items
        if Item.query.count() == 0:
            print("📦 Adding sample items to database...")
            
            # Get or create user
            user = User.query.first()
            if not user:
                user = User(
                    email='test@university.edu',
                    first_name='Test',
                    last_name='User'
                )
                user.set_password('password123')
                db.session.add(user)
                db.session.commit()
            
            # Sample items data - FIXED SYNTAX
            sample_items = [
                {
                    'title': 'Calculus Textbook',
                    'description': 'Calculus 3rd Edition, excellent condition with minimal highlighting',
                    'category': 'Textbooks',
                    'condition': 'Like New',
                    'status': 'available',
                    'user_id': user.id
                },
                {
                    'title': 'Coffee Maker',
                    'description': 'Basic 4-cup coffee maker, perfect for dorm rooms',
                    'category': 'Kitchen Items',
                    'condition': 'Good',
                    'status': 'available',
                    'user_id': user.id
                },
                {
                    'title': 'Mountain Bike',
                    'description': 'Used mountain bike, recently tuned up, includes lock',
                    'category': 'Transportation',
                    'condition': 'Fair',
                    'status': 'borrowed',
                    'user_id': user.id
                },
                {
                    'title': 'Chemistry Lab Kit',
                    'description': 'Complete lab kit for Chemistry 101, includes safety goggles',
                    'category': 'Electronics',
                    'condition': 'Good',
                    'status': 'available',
                    'user_id': user.id
                },
                {
                    'title': 'Dining Table',
                    'description': 'Small wooden table, seats 4 people, easy to assemble',
                    'category': 'Furniture',
                    'condition': 'Good',  # FIXED: Added missing quote
                    'status': 'available',
                    'user_id': user.id
                },
                {
                    'title': 'Basketball',
                    'description': 'Official size basketball, good condition',
                    'category': 'Sports Equipment',
                    'condition': 'Good',
                    'status': 'available',
                    'user_id': user.id
                },
                {
                    'title': 'Winter Jacket',
                    'description': 'Waterproof winter jacket, size medium, like new',
                    'category': 'Clothing',
                    'condition': 'Like New',
                    'status': 'available',
                    'user_id': user.id
                },
                {
                    'title': 'Graphing Calculator',
                    'description': 'TI-84 Plus calculator with case, works perfectly',
                    'category': 'Electronics',
                    'condition': 'Good',
                    'status': 'available',
                    'user_id': user.id
                }
            ]
            
            # Add items to database
            for item_data in sample_items:
                item = Item(
                    title=item_data['title'],
                    description=item_data['description'],
                    category=item_data['category'],
                    condition=item_data['condition'],
                    status=item_data['status'],
                    user_id=item_data['user_id'],
                    created_at=datetime.utcnow()
                )
                db.session.add(item)
            
            db.session.commit()
            print(f"✅ Added {len(sample_items)} sample items to database")
        else:
            print(f"📊 Database already has {Item.query.count()} items")
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    # JWT error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'error': 'Token has expired',
            'message': 'Please log in again'
        }), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({
            'error': 'Invalid token',
            'message': 'Please log in again'
        }), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            'error': 'Authorization required',
            'message': 'Please log in to access this resource'
        }), 401
    
    return app

if __name__ == '__main__':
    app = create_app()
    print("\n" + "="*50)
    print("🚀 Campus Sharing API")
    print("="*50)
    print("📡 Running on: http://localhost:5000")
    print("📚 API Docs:    http://localhost:5000/api/health")
    print("🛢️  Database:    campus_sharing.db")
    print("👤 Sample User: student@university.edu / password123")
    print("🔑 Test Auth:   http://localhost:5000/api/test/auth")
    print("="*50 + "\n")
    app.run(debug=True, port=5000)