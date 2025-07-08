@echo off
REM This script creates the directory and file structure for the Walmart Chatbot project.

echo Creating root project directory: walmart-chatbot...
mkdir walmart-chatbot
cd walmart-chatbot

echo.
echo [1/6] Creating Backend Structure...
mkdir backend\app\api\endpoints
mkdir backend\app\models
mkdir backend\app\services
mkdir backend\app\utils
mkdir backend\app\database
mkdir backend\tests
mkdir backend\data

type nul > backend\app\__init__.py
type nul > backend\app\main.py
type nul > backend\app\api\__init__.py
type nul > backend\app\api\dependencies.py
type nul > backend\app\api\endpoints\__init__.py
type nul > backend\app\api\endpoints\products.py
type nul > backend\app\api\endpoints\chat.py
type nul > backend\app\api\endpoints\health.py
type nul > backend\app\models\__init__.py
type nul > backend\app\models\product.py
type nul > backend\app\models\chat.py
type nul > backend\app\models\response.py
type nul > backend\app\services\__init__.py
type nul > backend\app\services\grok_service.py
type nul > backend\app\services\product_service.py
type nul > backend\app\services\rag_service.py
type nul > backend\app\utils\__init__.py
type nul > backend\app\utils\logger.py
type nul > backend\app\utils\config.py
type nul > backend\app\utils\exceptions.py
type nul > backend\app\database\__init__.py
type nul > backend\app\database\models.py
type nul > backend\app\database\database.py
type nul > backend\tests\__init__.py
type nul > backend\tests\test_products.py
type nul > backend\tests\test_chat.py
type nul > backend\data\products.json
type nul > backend\data\sample_walmart_data.json
type nul > backend\requirements.txt
type nul > backend\Dockerfile

echo.
echo [2/6] Creating ML-Pipeline Structure...
mkdir ml-pipeline\src\embedding
mkdir ml-pipeline\src\retrieval
mkdir ml-pipeline\src\intent
mkdir ml-pipeline\config
mkdir ml-pipeline\data\processed
mkdir ml-pipeline\data\raw

type nul > ml-pipeline\src\__init__.py
type nul > ml-pipeline\src\embedding\__init__.py
type nul > ml-pipeline\src\embedding\chunking.py
type nul > ml-pipeline\src\embedding\embedding_generator.py
type nul > ml-pipeline\src\embedding\vector_store.py
type nul > ml-pipeline\src\retrieval\__init__.py
type nul > ml-pipeline\src\retrieval\retriever.py
type nul > ml-pipeline\src\retrieval\ranking.py
type nul > ml-pipeline\src\intent\__init__.py
type nul > ml-pipeline\src\intent\filter.py
type nul > ml-pipeline\config\config.yaml
type nul > ml-pipeline\config\prompts.yaml
type nul > ml-pipeline\requirements.txt

echo.
echo [3/6] Creating Frontend Structure...
mkdir frontend\public
mkdir frontend\src\components\ProductPage
mkdir frontend\src\components\ChatWidget
mkdir frontend\src\components\Common
mkdir frontend\src\services
mkdir frontend\src\utils

type nul > frontend\src\App.js
type nul > frontend\package.json
type nul > frontend\Dockerfile

echo.
echo [4/6] Creating Docs Structure...
mkdir docs\api
mkdir docs\setup

type nul > docs\architecture.md

echo.
echo [5/6] Creating Scripts...
mkdir scripts

type nul > scripts\setup.sh
type nul > scripts\deploy.sh

echo.
echo [6/6] Creating Root Files...
type nul > docker-compose.yml
type nul > README.md
type nul > .env.example

echo.
echo Project structure for 'walmart-chatbot' created successfully!
cd ..