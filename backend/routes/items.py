from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.item import Item
from models.user import User
from database import db

items_bp = Blueprint('items', __name__)

@items_bp.route('/', methods=['GET'])
def get_items():  # NO @jwt_required decorator here!
    """Get all items with optional filtering - PUBLIC ACCESS"""
    try:
        # Get query parameters
        category = request.args.get('category')
        search = request.args.get('search')
        limit = request.args.get('limit', default=20, type=int)
        
        # Start query
        query = Item.query
        
        # Apply filters
        if category and category != 'all':
            query = query.filter_by(category=category)
        
        if search:
            query = query.filter(
                (Item.title.ilike(f'%{search}%')) | 
                (Item.description.ilike(f'%{search}%'))
            )
        
        # Only show available items
        query = query.filter_by(status='available')
        
        # Order by latest
        query = query.order_by(Item.created_at.desc())
        
        # Apply limit
        items = query.limit(limit).all()
        
        return jsonify({
            'items': [item.to_dict() for item in items],
            'count': len(items),
            'total': query.count()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Only POST, PUT, DELETE need authentication
@items_bp.route('/', methods=['POST'])
@jwt_required()  # KEEP this for POST
def create_item():
    """Create a new item for sharing - REQUIRES AUTH"""
    try:
        data = request.get_json()
        user_id = int(get_jwt_identity())
        
        # Validation
        if not data or not data.get('title'):
            return jsonify({'error': 'Title is required'}), 400
        
        if len(data['title']) < 3:
            return jsonify({'error': 'Title must be at least 3 characters'}), 400
        
        # Create item
        item = Item(
            title=data['title'],
            description=data.get('description', ''),
            category=data.get('category', 'Other'),
            condition=data.get('condition', 'good'),
            user_id=user_id,
            status='available'
        )
        
        db.session.add(item)
        db.session.commit()
        
        return jsonify({
            'message': 'Item created successfully',
            'item': item.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500