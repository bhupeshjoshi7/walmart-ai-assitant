# backend/app/utils/logger.py
import logging
import sys
from app.utils.config import get_settings

def setup_logger(name: str) -> logging.Logger:
    """
    Configures and returns a logger.
    """
    settings = get_settings()
    
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)
    
    logger = logging.getLogger(name)
    logger.setLevel(settings.LOG_LEVEL.upper())
    
    if not logger.handlers:
        logger.addHandler(handler)
        
    return logger