# backend/app/api/endpoints/products.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.product import Product, ProductSearchQuery
from app.services.product_service import ProductService
from app.utils.exceptions import ProductNotFoundError

router = APIRouter()

def get_product_service() -> ProductService:
    return ProductService()

@router.get("/{product_id}", response_model=Product)
async def get_product(
    product_id: str,
    service: ProductService = Depends(get_product_service)
):
    """Get product by ID"""
    try:
        return await service.get_product_by_id(product_id)
    except ProductNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/search", response_model=List[Product])
async def search_products(
    query: ProductSearchQuery,
    service: ProductService = Depends(get_product_service)
):
    """Search products"""
    return await service.search_products(query)

@router.get("/{product_id}/context")
async def get_product_context(
    product_id: str,
    service: ProductService = Depends(get_product_service)
):
    """Get product context for RAG"""
    try:
        context = await service.get_product_context(product_id)
        return {"context": context}
    except ProductNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))