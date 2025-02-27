import os
import psycopg2
from flask import Flask, request, jsonify
from datetime import datetime
import requests
from geopy.geocoders import Nominatim
import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
from flask_cors import CORS
import uuid

load_dotenv()  # Load environment variables from .env file
os.environ['FLASK_ENV'] = 'development'  # Manually set the environment
app = Flask(__name__)
CORS(app)  # Allow all origins

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'my_journey'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'places')
    )

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_BUCKET_NAME = os.getenv('AWS_BUCKET_NAME')
AWS_REGION = os.getenv('AWS_REGION')

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

def upload_file_to_s3(file, bucket_name):
    try:
        file_name = str(uuid.uuid4()) + "_" + file.filename
        s3_client.upload_fileobj(
            file,
            bucket_name,
            file_name,
            ExtraArgs={"ContentType": file.content_type}
        )
        file_url = f"https://{bucket_name}.s3.{AWS_REGION}.amazonaws.com/{file_name}"
        return file_url
    except Exception as e:
        print("Error uploading to S3:", str(e))
        return None

@app.route('/logs', methods=['POST'])
def create_log():
    place_name = request.form.get('place_name')
    description = request.form.get('description')
    image = request.files.get('image')

    latitude, longitude = get_lat_lon(place_name)
    if latitude is None or longitude is None:
        return jsonify({"error": "Could not determine location"}), 400
    
    timestamp = datetime.now().strftime('%Y-%m-%d')

    image_url = None
    if image:
        image_url = upload_file_to_s3(image, AWS_BUCKET_NAME)
        if not image_url:
            return jsonify({"error": "Failed to upload to s3"}), 500

    conn = get_db_connection()
    crsr = conn.cursor()
    crsr.execute('''INSERT INTO logs (place_name, description, latitude, longitude, timestamp, image_url) 
                 VALUES (%s, %s, %s, %s, %s, %s) 
                 RETURNING ID;''',
                 (place_name, description, latitude, longitude, timestamp, image_url))
    new_log_id = crsr.fetchone()[0]
    conn.commit()
    crsr.close()
    conn.close()

    return jsonify({
        'id': new_log_id,
        'place_name': place_name,
        'description': description,
        'image_url': image_url
    }), 201

@app.route('/logs', methods = ['GET'])
def get_logs():
    conn = get_db_connection()
    crsr = conn.cursor()

    crsr.execute('SELECT * From logs;')
    logs = crsr.fetchall()
    crsr.close()
    conn.close()

    travel_logs = []
    for log in logs:
        travel_logs.append({
            'id': log[0],
            'place_name': log[1],
            'description': log[2],
            'latitude': log[3],
            'longitude': log[4],
            'timestamp': log[5],
            'image_url': log[6]
        })
    return jsonify(travel_logs)

def get_lat_lon(place_name):
    geolocator = Nominatim(user_agent="my_journey_app")
    location = geolocator.geocode(place_name)
    if location:
        return location.latitude, location.longitude
    return None, None
    

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)