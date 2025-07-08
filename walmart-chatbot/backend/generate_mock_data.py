# backend/generate_mock_data.py

import json
import random
from faker import Faker
from datetime import datetime

# Initialize Faker to generate fake data
fake = Faker()

# Define some realistic categories and brands
CATEGORIES = {
    "Electronics": {
        "sub_categories": ["Smartphones", "Laptops", "Headphones", "Cameras"],
        "brands": ["Apple", "Samsung", "Sony", "Dell", "Bose"]
    },
    "Home & Kitchen": {
        "sub_categories": ["Cookware", "Appliances", "Furniture", "Bedding"],
        "brands": ["KitchenAid", "Cuisinart", "Dyson", "IKEA"]
    },
    "Groceries": {
        "sub_categories": ["Pantry Staples", "Snacks", "Beverages", "Dairy & Eggs"],
        "brands": ["Great Value", "Nabisco", "Coca-Cola", "Organic Valley"]
    },
    "Clothing": {
        "sub_categories": ["Men's T-Shirts", "Women's Jeans", "Kid's Shoes"],
        "brands": ["Nike", "Levi's", "Hanes", "Adidas"]
    }
}

AVAILABILITY_STATUS = ["In Stock", "Out of Stock", "Limited Stock"]

def generate_product(product_id: int) -> dict:
    """Generates a single fake product dictionary."""
    
    category_name = random.choice(list(CATEGORIES.keys()))
    category_info = CATEGORIES[category_name]
    sub_category = random.choice(category_info["sub_categories"])
    brand = random.choice(category_info["brands"])
    
    original_price = round(random.uniform(10.0, 1500.0), 2)
    discount_percentage = round(random.uniform(5.0, 40.0), 2)
    price = round(original_price * (1 - discount_percentage / 100), 2)

    product_name = f"{brand} {fake.word().capitalize()} {sub_category.rstrip('s')} - {fake.color_name().capitalize()}"
    
    return {
        "id": f"walmart_{product_id:003d}",
        "title": product_name,
        "category": category_name,
        "sub_category": sub_category,
        "brand": brand,
        "price": price,
        "original_price": original_price,
        "discount_percentage": discount_percentage,
        "availability": random.choice(AVAILABILITY_STATUS),
        "rating": round(random.uniform(2.5, 5.0), 1),
        "review_count": random.randint(5, 5000),
        "description": fake.paragraph(nb_sentences=5),
        "specifications": {
            "weight": f"{round(random.uniform(0.1, 15.0), 1)} lbs",
            "dimensions": f"{random.randint(1,20)} x {random.randint(1,20)} x {random.randint(1,20)} inches",
            "color": fake.color_name().capitalize()
        },
        "features": [fake.sentence(nb_words=6) for _ in range(random.randint(3, 6))],
        "images": [
            {"url": f"/images/product_{product_id}_1.jpg", "alt_text": f"{product_name} front view", "is_primary": True},
            {"url": f"/images/product_{product_id}_2.jpg", "alt_text": f"{product_name} side view", "is_primary": False}
        ],
        "seller": random.choice(["Walmart", "BestPrice Electronics", "Home Goods Inc."]),
        "shipping_info": {
            "free_shipping": random.choice([True, False]),
            "shipping_cost": 0.0 if random.choice([True, False]) else round(random.uniform(4.99, 19.99), 2),
            "estimated_delivery": f"{random.randint(2, 7)} business days",
            "same_day_delivery": random.choice([True, False]),
            "pickup_available": random.choice([True, False])
        },
        "return_policy": "30-day return policy",
        "warranty": f"{random.randint(1, 3)} year limited warranty",
        "tags": [category_name.lower(), sub_category.lower(), brand.lower(), fake.word()],
        "is_bestseller": random.choice([True, False]),
        "is_sponsored": random.choice([True, False]),
    }

def main():
    """Main function to generate products and save to JSON."""
    num_products = 100  # <--- SET HOW MANY PRODUCTS YOU WANT HERE
    products = [generate_product(i + 1) for i in range(num_products)]
    
    # Save to the file that the app will read
    output_file = "data/products.json"
    
    with open(output_file, 'w') as f:
        json.dump(products, f, indent=4)
        
    print(f"Successfully generated {num_products} products and saved to {output_file}")

if __name__ == "__main__":
    main()