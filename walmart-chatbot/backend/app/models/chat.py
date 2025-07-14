# backend/app/models/chat.py
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ChatRequest(BaseModel):
    message: str
    product_ids: Optional[List[str]] = None
    product_id: Optional[str] = None
    session_id: Optional[str] = None
    user_context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = []
    confidence: Optional[float]
    is_fallback: Optional[bool] = False
    suggestions: Optional[List[str]] = []
    product_references: Optional[List[str]] = []
    timestamp: Optional[datetime] = datetime.now()

class ChatHistory(BaseModel):
    session_id: str
    messages: List[Dict[str, Any]]
    created_at: datetime
    updated_at: datetime

class ChatFeedback(BaseModel):
    message_id: str
    rating: int = Field(..., ge=1, le=5)
    feedback: Optional[str] = None
    session_id: str