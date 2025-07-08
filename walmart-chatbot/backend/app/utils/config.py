# backend/app/utils/config.py
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Walmart Chatbot API"
    
    # Grok API Configuration
    GROK_API_KEY: str
    
    # Database Configuration
    DATABASE_URL: Optional[str] = "sqlite:///./walmart_chatbot.db"
    
    # Redis Configuration (for caching)
    REDIS_URL: Optional[str] = "redis://localhost:6379"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

def get_settings() -> Settings:
    return Settings()