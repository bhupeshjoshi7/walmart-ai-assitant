# backend/app/services/grok_service.py
import httpx
import json
import logging
from typing import Dict, Any, Optional
from app.utils.config import get_settings
from app.utils.exceptions import GrokAPIError

logger = logging.getLogger(__name__)

class GrokService:
    def __init__(self):
        self.settings = get_settings()
        self.api_key = self.settings.GROK_API_KEY
        self.base_url = "https://api.x.ai/v1"
        # --- CHANGE 1: Use the model name from your working curl command ---
        self.model = "grok-3-latest"
        
    async def generate_response(
        self, 
        prompt: str, 
        context: str, 
        system_prompt: Optional[str] = None
    ) -> str:
        """Generate response using Grok API"""
        try:
            messages = []
            
            # Add system prompt if provided
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            
            # --- CHANGE 2: Combine context and prompt into a single user message ---
            # This is the correct way to provide context to the model.
            full_user_prompt = prompt
            if context:
                full_user_prompt = f"Based on the following context, please answer the question.\n\nContext:\n---\n{context}\n---\n\nQuestion: {prompt}"
            
            messages.append({"role": "user", "content": full_user_prompt})
            # --- END OF CHANGE 2 ---

            logger.info(f"Sending request to Grok with payload: {json.dumps({'model': self.model, 'messages': messages}, indent=2)}")

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model,
                        "messages": messages,
                        "max_tokens": 1000,
                        "temperature": 0.7  # You can adjust this as needed
                    },
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    # Added detailed logging for errors
                    logger.error(f"Grok API returned non-200 status: {response.status_code}. Response: {response.text}")
                    raise GrokAPIError(f"Grok API error: {response.status_code}")
                
                result = response.json()
                return result["choices"][0]["message"]["content"]
                
        except httpx.TimeoutException:
            logger.error("Grok API timeout")
            raise GrokAPIError("Request timeout")
        except Exception as e:
            # Added detailed logging for other exceptions
            logger.error(f"An unexpected error occurred in GrokService: {e}")
            raise GrokAPIError(f"API call failed: {str(e)}")