# backend/app/services/product_service.py
import json
import logging
from typing import List, Optional, Dict, Any
from app.models.product import Product, ProductSearchQuery
from app.utils.exceptions import ProductNotFoundError

logger = logging.getLogger(__name__)

class ProductService:
    def __init__(self):
        # Load mock data - replace with actual database in production
        self.products = self._load_mock_data()
    
    def _load_mock_data(self) -> List[Product]:
        """Load mock Walmart-like product data"""
        # This would be replaced with actual database queries
        mock_products = [
            {
                "id": "walmart_001",
                "title": "iPhone 15 Pro 128GB Natural Titanium",
                "category": "Electronics",
                "sub_category": "Smartphones",
                "brand": "Apple",
                "price": 999.00,
                "original_price": 1099.00,
                "discount_percentage": 9.1,
                "availability": "In Stock",
                "rating": 4.5,
                "review_count": 1250,
                "description": "The iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system.",
                "specifications": {
                    "storage": "128GB",
                    "color": "Natural Titanium",
                    "display": "6.1-inch Super Retina XDR",
                    "camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
                    "battery": "Up to 23 hours video playback"
                },
                "features": [
                    "A17 Pro chip",
                    "Titanium design",
                    "48MP camera system",
                    "USB-C connector"
                ],
                "images": [
                    {"url": "/images/iphone15pro_1.jpg", "alt_text": "iPhone 15 Pro front", "is_primary": True},
                    {"url": "/images/iphone15pro_2.jpg", "alt_text": "iPhone 15 Pro back", "is_primary": False}
                ],
                "seller": "Walmart",
                "shipping_info": {
                    "free_shipping": True,
                    "shipping_cost": 0.0,
                    "estimated_delivery": "2-3 business days",
                    "same_day_delivery": True,
                    "pickup_available": True
                },
                "return_policy": "30-day return policy",
                "warranty": "1 year limited warranty",
                "tags": ["apple", "iphone", "smartphone", "electronics"],
                "is_bestseller": True,
                "is_sponsored": False
            }
        ]
        return [Product(**product) for product in mock_products]
    
    async def get_product_by_id(self, product_id: str) -> Product:
        """Get product by ID"""
        for product in self.products:
            if product.id == product_id:
                return product
        raise ProductNotFoundError(f"Product with ID {product_id} not found")
    
    async def search_products(self, query: ProductSearchQuery) -> List[Product]:
        """Search products based on query"""
        # Simple search implementation - replace with proper search engine
        results = []
        for product in self.products:
            if query.query.lower() in product.title.lower():
                if query.category and product.category != query.category:
                    continue
                if query.min_price and product.price < query.min_price:
                    continue
                if query.max_price and product.price > query.max_price:
                    continue
                if query.rating_min and product.rating < query.rating_min:
                    continue
                results.append(product)
        
        # Pagination
        start_idx = (query.page - 1) * query.limit
        end_idx = start_idx + query.limit
        return results[start_idx:end_idx]
    
    async def get_product_context(self, product_id: str) -> str:
        """Get product context for RAG"""
        product = await self.get_product_by_id(product_id)
        
        context = f"""
        Product: {product.title}
        Brand: {product.brand}
        Price: ${product.price} (Original: ${product.original_price})
        Discount: {product.discount_percentage}%
        Rating: {product.rating}/5 ({product.review_count} reviews)
        Availability: {product.availability}
        
        Description: {product.description}
        
        Features: {', '.join(product.features)}
        
        Specifications: {json.dumps(product.specifications, indent=2)}
        
        Shipping: Free shipping: {product.shipping_info.free_shipping}, 
        Estimated delivery: {product.shipping_info.estimated_delivery}
        
        Return Policy: {product.return_policy}
        Warranty: {product.warranty}
        """
        
        return context