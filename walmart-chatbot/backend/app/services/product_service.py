# backend/app/services/product_service.py
import json
import logging
from typing import List, Optional, Dict, Any
from app.models.product import Product, ProductSearchQuery
from app.utils.exceptions import ProductNotFoundError

logger = logging.getLogger(__name__)

class ProductService:
    def __init__(self):
        # This line stays the same
        self.products = self._load_mock_data()
    
    def _load_mock_data(self) -> List[Product]:
        """Load mock product data from the products.json file."""
        try:
            # The data directory is relative to the backend root
            with open("data/products.json", 'r') as f:
                products_data = json.load(f)
            
            # Use Pydantic to validate and parse the data into Product models
            return [Product(**product) for product in products_data]
        
        except FileNotFoundError:
            logger.error("data/products.json not found. Please run generate_mock_data.py first.")
            return []
        except Exception as e:
            logger.error(f"Error loading or parsing products.json: {e}")
            return []
    
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