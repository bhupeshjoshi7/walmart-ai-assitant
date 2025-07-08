# backend/app/services/gemini_service.py

import google.generativeai as genai
import logging
from typing import Optional
from app.utils.config import get_settings
from app.utils.exceptions import ChatbotException

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        self.settings = get_settings()
        if not self.settings.GOOGLE_API_KEY:
            raise ValueError("GOOGLE_API_KEY not found in settings.")
        
        try:
            genai.configure(api_key=self.settings.GOOGLE_API_KEY)
            # Use the latest flash model - it's fast, capable, and has a great free tier
            self.model = genai.GenerativeModel('gemini-1.5-flash-latest')
        except Exception as e:
            logger.error(f"Failed to configure Gemini: {e}")
            raise ChatbotException("Gemini API configuration failed.")

    async def generate_response(
        self, 
        prompt: str, 
        context: str, 
        system_prompt: Optional[str] = None
    ) -> str:
        """Generate response using the Gemini API"""
        
        # Combine all parts into a single, structured prompt for Gemini
        full_prompt = []
        if system_prompt:
            full_prompt.append(system_prompt)
        
        if context:
            full_prompt.append("\n--- CONTEXT ---\n")
            full_prompt.append(context)
            full_prompt.append("\n--- END CONTEXT ---\n")

        full_prompt.append(f"\nQuestion: {prompt}")

        final_prompt_str = "".join(full_prompt)
        
        logger.info(f"Sending request to Gemini with prompt: {final_prompt_str}")

        try:
            # Note: The google-generativeai library's core methods are not async,
            # so we run it synchronously here. FastAPI will handle the thread.
            response = self.model.generate_content(final_prompt_str)
            return response.text
        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            raise ChatbotException(f"Failed to get response from Gemini API: {e}")