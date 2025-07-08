# backend/app/api/endpoints/health.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def health_check():
    """
    Simple health check endpoint to confirm the API is running.
    """
    return {"status": "ok", "message": "API is healthy"}