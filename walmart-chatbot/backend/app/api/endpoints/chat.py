# backend/app/api/endpoints/chat.py
from fastapi import APIRouter, HTTPException, Depends
from app.models.chat import ChatRequest, ChatResponse, ChatFeedback
from app.services.grok_service import GrokService
from app.services.product_service import ProductService
from app.utils.exceptions import GrokAPIError
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

def get_grok_service() -> GrokService:
    return GrokService()

def get_product_service() -> ProductService:
    return ProductService()

@router.post("/ask", response_model=ChatResponse)
async def ask_question(
    request: ChatRequest,
    grok_service: GrokService = Depends(get_grok_service),
    product_service: ProductService = Depends(get_product_service)
):
    """Main chat endpoint"""
    try:
        # Get product context if product_id is provided
        context = ""
        if request.product_id:
            context = await product_service.get_product_context(request.product_id)
        
        # Define system prompt
        system_prompt = """You are a helpful Walmart customer service assistant. 
        You should only answer questions about the provided product information.
        If asked about unrelated topics, politely redirect the conversation back to the product.
        Be concise, helpful, and friendly."""
        
        # Generate response using Grok
        response = await grok_service.generate_response(
            prompt=request.message,
            context=context,
            system_prompt=system_prompt
        )
        
        return ChatResponse(
            response=response,
            sources=["product_data"] if request.product_id else [],
            confidence=0.85,
            is_fallback=False,
            suggestions=["Tell me more about features", "What's the price?", "Is it in stock?"],
            product_references=[request.product_id] if request.product_id else []
        )
        
    except GrokAPIError as e:
        logger.error(f"Grok API error: {e}")
        # Fallback response
        return ChatResponse(
            response="I'm having trouble processing your request right now. Please try again later.",
            confidence=0.0,
            is_fallback=True,
            suggestions=["Try asking again", "Contact customer service"]
        )
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/feedback")
async def submit_feedback(feedback: ChatFeedback):
    """Submit chat feedback"""
    # Store feedback in database
    logger.info(f"Received feedback: {feedback.dict()}")
    return {"message": "Feedback received successfully"}
