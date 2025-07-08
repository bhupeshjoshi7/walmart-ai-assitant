# backend/app/models/chat.py
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ChatRequest(BaseModel):
    message: str
    product_id: Optional[str] = None
    session_id: Optional[str] = None
    user_context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    sources: List[str] = []
    confidence: float
    is_fallback: bool = False
    suggestions: List[str] = []
    product_references: List[str] = []
    timestamp: datetime = datetime.now()

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