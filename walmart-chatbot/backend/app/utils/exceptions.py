
# backend/app/utils/exceptions.py
class ChatbotException(Exception):
    """Base exception for chatbot application"""
    pass

class ProductNotFoundError(ChatbotException):
    """Product not found exception"""
    pass

class GrokAPIError(ChatbotException):
    """Grok API related exception"""
    pass

class ValidationError(ChatbotException):
    """Validation error exception"""
    pass