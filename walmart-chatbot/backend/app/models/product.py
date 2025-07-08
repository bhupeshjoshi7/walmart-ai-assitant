# backend/app/models/product.py
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ProductImage(BaseModel):
    url: str
    alt_text: str
    is_primary: bool = False

class ProductReview(BaseModel):
    id: str
    user_name: str
    rating: float = Field(..., ge=1, le=5)
    title: str
    comment: str
    date: datetime
    verified_purchase: bool = False

class ShippingInfo(BaseModel):
    free_shipping: bool
    shipping_cost: float
    estimated_delivery: str
    same_day_delivery: bool = False
    pickup_available: bool = False

class Product(BaseModel):
    id: str
    title: str
    category: str
    sub_category: str
    brand: str
    price: float
    original_price: float
    discount_percentage: float
    availability: str  # "In Stock", "Out of Stock", "Limited"
    rating: float = Field(..., ge=0, le=5)
    review_count: int
    description: str
    specifications: Dict[str, Any]
    features: List[str]
    images: List[ProductImage]
    seller: str
    shipping_info: ShippingInfo
    return_policy: str
    warranty: str
    tags: List[str]
    is_bestseller: bool = False
    is_sponsored: bool = False

class ProductSearchQuery(BaseModel):
    query: str
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    rating_min: Optional[float] = None
    page: int = 1
    limit: int = 20