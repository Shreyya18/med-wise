"""
MedScanner Flask API Backend
Deploy this to connect your trained .h5 model with the React app
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
import io
import base64
import os
import sqlite3
import bcrypt

from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)

app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False
)

app.config["JWT_SECRET_KEY"] = "b4a59ace66d310f0fb5b96d536db657a4f3aec8132e047c55c7834e57e4e3653"
jwt = JWTManager(app)

def init_db():
    conn = sqlite3.connect("medwise.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reminders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            medicine_name TEXT NOT NULL,
            dosage_time TEXT NOT NULL,
            frequency TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)

    conn.commit()
    conn.close()


init_db()

# Load your trained model
MODEL_PATH = 'medwise_trained_model.h5'  # Update with your model path
# MODEL_PATH = 'medwise_trained.tflite'  # Update with your model path

# Try to load model, but allow app to run without it for testing
try:
    if os.path.exists(MODEL_PATH):
        model = keras.models.load_model(MODEL_PATH)
        print(f"✓ Model loaded successfully from {MODEL_PATH}")
    else:
        model = None
        print(f"⚠ Warning: Model file '{MODEL_PATH}' not found!")
        print(f"   Current directory: {os.getcwd()}")
        print(f"   Please place your .h5 model file in this directory")
        print(f"   The API will run in DEMO mode (random predictions)")
except Exception as e:
    model = None
    print(f"⚠ Error loading model: {e}")
    print(f"   The API will run in DEMO mode")

# Medicine class names - UPDATED TO MATCH YOUR TRAINED MODEL
CLASS_NAMES = [
    'cetrizine',
    'emeset-4',
    'ibugesic-plus',
    'paracetamol',
    'zerodol'
]

# # Medicine information database
# MEDICINE_INFO = {
#     'cetrizine': {
#         'name': 'Cetrizine (Cetirizine)',
#         'generic_name': 'Cetirizine Hydrochloride',
#         'uses': 'Antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching',
#         'dosage': 'Adults and children 6 years and older: 5-10mg once daily',
#         'side_effects': 'Drowsiness, fatigue, dry mouth, nausea, headache',
#         'warnings': 'May cause drowsiness. Avoid alcohol. Consult doctor if pregnant or breastfeeding.',
#         'manufacturer': 'Various'
#     },
#     'emeset-4': {
#         'name': 'Emeset-4 (Ondansetron)',
#         'generic_name': 'Ondansetron 4mg',
#         'uses': 'Prevents nausea and vomiting caused by chemotherapy, radiation therapy, or surgery',
#         'dosage': 'Adults: 4-8mg before treatment, then every 8 hours as needed',
#         'side_effects': 'Headache, constipation, dizziness, drowsiness',
#         'warnings': 'Take as directed by doctor. Do not exceed recommended dose.',
#         'manufacturer': 'Alkem Laboratories'
#     },
#     'paracetamol': {
#         'name': 'Paracetamol (Acetaminophen)',
#         'generic_name': 'Paracetamol',
#         'uses': 'Pain relief and fever reduction. Used for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers',
#         'dosage': 'Adults: 500-1000mg every 4-6 hours as needed. Maximum 4000mg per day',
#         'side_effects': 'Rare at normal doses. May include nausea, stomach pain, loss of appetite, rash',
#         'warnings': 'DO NOT EXCEED MAXIMUM DOSE. Overdose can cause severe liver damage. Avoid alcohol while taking this medication.',
#         'manufacturer': 'Various'
#     }
# }

@app.route('/', methods=['GET'])
def home():
    """Welcome page with API documentation"""
    return jsonify({
        'message': '🏥 MedScanner API',
        'version': '1.0',
        'status': 'running',
        'model_loaded': model is not None,
        'demo_mode': model is None,
        'endpoints': {
            'GET /': 'This page - API information',
            'GET /health': 'Health check',
            'POST /predict': 'Predict medicine from image (multipart/form-data with "image" field)',
            # 'POST /search': 'Search medicine by name (JSON with "name" field)',
            # 'GET /medicines': 'List all available medicines'
        },
        'usage_examples': {
            'predict': 'curl -X POST -F "image=@medicine.jpg" http://localhost:5000/predict',
            'search': 'curl -X POST -H "Content-Type: application/json" -d \'{"name":"paracetamol"}\' http://localhost:5000/search',
            'health': 'curl http://localhost:5000/health'
        },
        'supported_medicines': CLASS_NAMES
    })

def preprocess_image(image):
    """Preprocess image for model prediction"""
    # Resize to model input size (224x224 based on your Colab notebook)
    img = image.resize((224, 224))
    
    # Convert to array
    img_array = np.array(img)
    
    # Normalize pixel values
    img_array = img_array.astype('float32') / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'model_loaded': model is not None,
        'demo_mode': model is None,
        'model_path': MODEL_PATH
    })

@app.before_request
def handle_options():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response


@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    """Predict medicine from uploaded image"""
    try:
        # Check if image is in request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        # Read and preprocess image
        image = Image.open(io.BytesIO(file.read())).convert('RGB')
        processed_image = preprocess_image(image)
        
        # Make prediction
        if model is not None:
            # Use actual model
            predictions = model.predict(processed_image)
            predicted_class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_idx])
        else:
            # Demo mode - random prediction
            predicted_class_idx = np.random.randint(0, len(CLASS_NAMES))
            confidence = np.random.uniform(0.7, 0.95)
            predictions = [[0.0] * len(CLASS_NAMES)]
            predictions[0][predicted_class_idx] = confidence
        
        # Get predicted class name
        predicted_medicine = CLASS_NAMES[predicted_class_idx]
        
        # # Get medicine information
        # medicine_info = MEDICINE_INFO.get(predicted_medicine, {
        #     'name': predicted_medicine.capitalize(),
        #     'uses': 'Information not available',
        #     'dosage': 'Consult healthcare provider',
        #     'warnings': 'Consult healthcare provider'
        # })
        
        # Return result
        # return jsonify({
        #     'success': True,
        #     'predicted_class': predicted_medicine,
        #     'confidence': confidence,
        #     'medicine_info': medicine_info,
        #     'demo_mode': model is None,
        #     'all_predictions': {
        #         CLASS_NAMES[i]: float(predictions[0][i]) 
        #         for i in range(len(CLASS_NAMES))
        #     }
        # })

        return jsonify({
            "success": True,
            "predicted_class": predicted_medicine,
            "confidence": confidence
        })

    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = sqlite3.connect("medwise.db")
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, hashed_pw)
        )
        conn.commit()
    except:
        return jsonify({"error": "Username already exists"}), 400
    finally:
        conn.close()

    return jsonify({"success": True})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = sqlite3.connect("medwise.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, password FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    user_id, hashed_pw = user

    if not bcrypt.checkpw(password.encode('utf-8'), hashed_pw):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user_id)
    return jsonify({"token": access_token})

@app.route('/reminders', methods=['POST'])
@jwt_required()
def add_reminder():
    user_id = get_jwt_identity()
    data = request.get_json()

    conn = sqlite3.connect("medwise.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reminders (user_id, medicine_name, dosage_time, frequency)
        VALUES (?, ?, ?, ?)
    """, (user_id, data["medicineName"], data["dosageTime"], data["frequency"]))
    conn.commit()
    conn.close()

    return jsonify({"success": True})

@app.route('/reminders', methods=['GET'])
@jwt_required()
def get_reminders():
    user_id = get_jwt_identity()

    conn = sqlite3.connect("medwise.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, medicine_name, dosage_time, frequency FROM reminders WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()
    conn.close()

    reminders = [
        {
            "id": row[0],
            "medicineName": row[1],
            "dosageTime": row[2],
            "frequency": row[3]
        }
        for row in rows
    ]

    return jsonify(reminders)

@app.route('/reminders/<int:reminder_id>', methods=['DELETE'])
@jwt_required()
def delete_reminder(reminder_id):
    user_id = get_jwt_identity()

    conn = sqlite3.connect("medwise.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM reminders WHERE id = ? AND user_id = ?", (reminder_id, user_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True})

# @app.route('/search', methods=['POST'])
# def search_medicine():
#     """Search medicine by name"""
#     try:
#         data = request.get_json()
#         medicine_name = data.get('name', '').lower().strip()
        
#         if not medicine_name:
#             return jsonify({'error': 'No medicine name provided'}), 400
        
#         # Search in medicine database
#         medicine_info = MEDICINE_INFO.get(medicine_name)
        
#         if medicine_info:
#             return jsonify({
#                 'success': True,
#                 'medicine_info': medicine_info
#             })
#         else:
#             return jsonify({
#                 'success': False,
#                 'message': 'Medicine not found in database'
#             }), 404
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/medicines', methods=['GET'])
# def list_medicines():
#     """List all available medicines"""
#     return jsonify({
#         'success': True,
#         'medicines': list(MEDICINE_INFO.keys()),
#         'count': len(MEDICINE_INFO)
#     })

if __name__ == '__main__':
    print("=" * 60)
    print("MedScanner API Server")
    print("=" * 60)
    print(f"Current directory: {os.getcwd()}")
    print(f"Model path: {MODEL_PATH}")
    print(f"Model loaded: {model is not None}")
    if model is None:
        print("⚠ RUNNING IN DEMO MODE - Random predictions will be generated")
        print("  To use your trained model:")
        print(f"  1. Place your .h5 file in: {os.getcwd()}")
        print(f"  2. Rename it to: medicine_model.h5")
        print(f"  3. Restart the server")
    print(f"\nNumber of classes: {len(CLASS_NAMES)}")
    print(f"Classes: {', '.join(CLASS_NAMES)}")
    print("\nEndpoints:")
    print("  GET  /health - Health check")
    print("  POST /predict - Predict medicine from image")
    print("  POST /search - Search medicine by name")
    print("  GET  /medicines - List all medicines")
    print("=" * 60)
    
    # Run Flask app
    app.run(host='0.0.0.0', port=5000)



