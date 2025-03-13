# My Journey: A Travel Log Application

A full-stack web application that allows users to document their travels by creating log entries with location information, descriptions, and photos. Users can view their travel history on an interactive map and browse through their collection of travel memories.

## Features

- **Create Travel Logs**: Add new travel memories with place names, descriptions, and photos
- **Interactive Map**: View all your travel locations on a map powered by Leaflet
- **Automatic Geocoding**: Convert place names to latitude/longitude coordinates
- **Photo Storage**: Upload and store travel photos in AWS S3
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices

## Tech Stack

### Frontend
- **React**: UI component library
- **Leaflet**: Interactive maps
- **TailwindCSS**: Styling and responsive design

### Backend
- **Flask**: Python web framework for API endpoints
- **PostgreSQL**: Database for storing travel logs
- **GeoPy**: Geocoding library to convert place names to coordinates
- **AWS S3**: Cloud storage for uploaded images
- **Python-dotenv**: Environment variable management

## Project Structure

```
travel-log/
├── frontend/                # React frontend application
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── AddLogs.js   # Form for creating new log entries
│       │   ├── MapOfLogs.js # Interactive map component
│       │   └── FitBounds.js # Helper component for map
│       ├── App.js
│       └── index.js
│
├── backend/                  # Flask backend application
│   ├── app.py               # Main Flask application with routes and S3 integration
│   ├── .env                 # Environment variables (not tracked in git)
│   └── requirements.txt     # Python dependencies
│
└── README.md                # Project documentation
```

## Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.7+
- pip
- PostgreSQL database
- AWS S3 bucket and credentials

### Database Setup
1. Create a PostgreSQL database named `my_journey`
2. Set up the logs table:
   ```sql
   CREATE TABLE logs (
       id SERIAL PRIMARY KEY,
       place_name VARCHAR(255) NOT NULL,
       description TEXT,
       latitude DECIMAL(10, 8),
       longitude DECIMAL(11, 8),
       timestamp DATE,
       image_url TEXT
   );
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install flask flask-cors psycopg2-binary python-dotenv geopy boto3
   ```

4. Create a `.env` file with the following variables:
   ```
   DB_HOST=localhost
   DB_NAME=my_journey
   DB_USER=postgres
   DB_PASSWORD=places
   
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_BUCKET_NAME=your_bucket_name
   AWS_REGION=your_aws_region
   ```

5. Start the Flask server:
   ```
   python app.py
   ```
   The backend will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install react-leaflet leaflet axios
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /logs    | Retrieve all travel logs |
| POST   | /logs    | Create a new travel log with place name, description, and optional image |

## Environment Variables

The application uses the following environment variables:

### Backend
- `DB_HOST`: PostgreSQL database host
- `DB_NAME`: PostgreSQL database name
- `DB_USER`: PostgreSQL database user
- `DB_PASSWORD`: PostgreSQL database password
- `AWS_ACCESS_KEY_ID`: AWS access key for S3 integration
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key
- `AWS_BUCKET_NAME`: S3 bucket name for storing images
- `AWS_REGION`: AWS region for the S3 bucket

## How It Works

1. **Creating a Travel Log**:
   - User enters a place name and description
   - Optionally uploads an image
   - The backend converts the place name to coordinates using GeoPy
   - The image is uploaded to AWS S3 if provided
   - A new entry is created in the database

2. **Viewing Travel Logs**:
   - The frontend fetches all logs from the backend
   - Logs are displayed on an interactive map using Leaflet
   - Each location is marked with a pin that shows details and images when clicked

## Future Improvements

- User authentication
- Ability to edit and delete travel logs
- Filter logs by date or location
- Offline mode for creating logs without internet connection
- Social sharing capabilities