from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
import json
import ast
from typing import List, Dict, Any
from app.services.gemini_service import GeminiService
from app.services.product_service import ProductService
from langchain.chat_models import init_chat_model  # Verify this import path
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
# Initialize services
langchainLLM = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0,
)
chkpoint = MemorySaver()
memory = MemorySaver()
# geminiLLM = GeminiService()

# Load products with error handling
try:
    with open("products_new.json", "r") as file:
        products = json.load(file)
except FileNotFoundError:
    print("Error: products_new.json not found")
    products = []
except json.JSONDecodeError:
    print("Error: Invalid JSON in products_new.json")
    products = []

agent_system_prompt = """You are a powerful agent capable of helping users with product-related queries.

When a user asks about specific products by name:
1. First call get_productId to extract the product IDs
2. Then call get_product_context to get detailed information about those products
3. Use the context to provide a comprehensive answer

when the queries don't mention specific names and the query if still related to products:
then get the product context of the product you feel important to answer the query.
if the query does not include product name then try to find appropriate prouct category and then ids within that category

For general queries not mentioning specific products, provide a helpful general response."""

@tool
def get_productId(query: str) -> str:
    """
    Extracts product IDs from the query based on product names mentioned.
    Returns a comma-separated string of product IDs.
    """
    system_prompt = """Extract the product IDs of the product names mentioned by the user using the list below.
    If no exact matches are found, provide the closest matching product IDs.

    Respond with ONLY a comma-separated list of IDs (e.g., "id1,id2,id3") without any other content, formatting, or explanations.

    Product List:"""
    for product in products:
        system_prompt += f"\nname: {product['title']} -category: {product['category']} - id: {product['id']} \n"

    try:
        response = langchainLLM.invoke(
            input=[
                ("system", system_prompt),
                ("human",  query)
            ]
        )
        print("Raw response from get_productId:", response.content)
        cleaned_response = response.content.strip("```").strip("python").strip("`").strip(" ").strip("\n")
        return cleaned_response
    except Exception as e:
        print(f"Error in get_productId: {e}")
        return ""

@tool
def get_product_context(product_ids: str) -> str:
    """
    Fetches product context based on comma-separated product IDs.
    """
    if not product_ids:
        return "No product IDs provided."
    
    try:
        # Split the comma-separated IDs
        id_list = [pid.strip() for pid in product_ids.split(",") if pid.strip()]
        
        if not id_list:
            return "No valid product IDs found."
        
        context = ""
        product_service = ProductService()
        
        for product_id in id_list:
            try:
                pid_context = product_service.get_product_context_synced(product_id)
                if pid_context:
                    context += f"\n--- Product ID: {product_id} ---\n{pid_context}\n"
            except Exception as e:
                context += f"\n--- Product ID: {product_id} ---\nError fetching context: {e}\n"
        
        return context if context else "No product context found for the provided IDs."
    
    except Exception as e:
        return f"Error processing product IDs: {e}"

# Create agent with both tools
agent = create_react_agent(
    prompt=agent_system_prompt,
    model=langchainLLM,
    checkpointer=chkpoint,
    store=memory,
    tools=[get_productId, get_product_context],  # Both tools included
    debug=True,
)

messages=[]

def invoke_agent(query: str) -> Dict[str, Any]:
    """
    Invokes the agent with the given query and returns the response.
    """
    try:
        messages.append(("user",query))
        input_message = {"messages": messages}
        response = agent.invoke(input=input_message, config={"configurable":{"thread_id": "default", "session_id": "default" , "checkpoint_id": "default"}})
        print("-----------------------------")
        print(response["messages"][-1].content)
        messages.append(("assistant", response["messages"][-1].content))
        return response["messages"][-1].content
    except Exception as e:
        return {"error": f"Agent invocation failed: {e}"}

# Example usage
if __name__ == "__main__":
    # Test the agent
    test_query = "compare 'Chatelet Air Hardside Luggage, Spinner Wheels, Chocolate Brown, Checked-Medium 24 Inch' and 'Luggage Covers For Suitcase Tsa Approved Luggage Cover PVC Clear Suitcase Covers for Luggage Waterproof Suitcase Cover Fits 28inch Travel Case' product"
    result = invoke_agent(test_query)
    print(result)
