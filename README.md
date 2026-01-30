# 🛡️ AI Guardian - Smart Deepfake & Cyber Fraud Detection System

> **Advanced AI-powered protection against deepfakes, voice clones, and AI-generated fraud.**

## 📖 Project Overview
**AI Guardian** is a cutting-edge full-stack application designed to detect synthetic media and combat cyber fraud. By leveraging state-of-the-art Machine Learning models (CNNs, Spectral Analysis, NLP), it provides real-time analysis of videos, audio, and text to identify AI-generated content.

The system features a **FastAPI** backend for high-performance inference, a **MySQL/SQLite** database for secure record-keeping, and a **React + Tailwind** frontend with a modern "Cyberpunk" aesthetic.

## 🚀 Key Features
- **🎥 Deepfake Video Detection**: Frame-by-frame analysis using CNNs to detect facial manipulation.
- **🎙️ Voice Clone Detection**: Spectral feature analysis (MFCCs) to identify synthetic audio signatures.
- **📝 AI Text Detection**: NLP pipelines to flag machine-generated phishing or fraud text.
- **⚠️ Risk Scoring Engine**: Aggregates multi-modal confidence scores to calculate a unified Risk Level (Low/Medium/High).
- **📊 User Dashboard**: JWT-protected interface for viewing personal detection history and reports.
- **📈 Feedback Loop**: Integrated system for user feedback to improve model accuracy over time.

## 🛠️ Tech Stack
| Component | Technologies |
|-----------|--------------|
| **Backend** | Python 3.9+, FastAPI, SQLAlchemy, Pydantic, Uvicorn |
| **Frontend** | React (Vite), Tailwind CSS, Axios, Lucide React |
| **Database** | MongoDB|
| **ML & AI** | TensorFlow/Keras, OpenCV, Librosa, Scikit-learn |
| **Auth** | JWT (JSON Web Tokens), BCrypt Hashing |

## 📂 Project Structure
```bash
AI GUARDIAN/
├── backend/
│   ├── database/       # DB connection (db_config.py) & ORM models (models.py)
│   ├── models/         # Pre-trained ML models (.pkl, .h5)
│   ├── routes/         # API Endpoints (auth, detection, dashboard)
│   ├── schemas/        # Pydantic data schemas
│   ├── training/       # Scripts to train ML models
│   ├── uploads/        # Temp storage for analyzed media
│   ├── utils/          # Core logic (preprocessing, JWT, hashing)
│   ├── main.py         # Application entry point
│   ├── requirements.txt # Python dependencies
│   └── test_*.py       # Pytest test suites
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI (Navbar, Footer, Loader)
│   │   ├── context/    # Global State (AuthContext)
│   │   ├── pages/      # Views (Dashboard, Video/Voice/Text Check)
│   │   ├── services/   # Centralized API client (api.js)
│   │   └── App.jsx     # Main Routing
│   ├── tailwind.config.js
│   └── vite.config.js
├── tables.sql          # SQL Schema for Database
└── README.md           # Documentation
```

## ⚙️ Setup & Installation

### 1️⃣ Backend Setup (The Brain)
1.  **Open Terminal and navigate to the backend folder:**
    ```bash
    cd backend
    ```
2.  **Create a Virtual Environment (Recommended):**
    This keeps your project dependencies isolated.
    ```bash
    # Windows
    python -m venv venv
    venv\Scripts\activate

    # Mac/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Database & Environment Setup:**
    - The system works out-of-the-box with **SQLite** (creates a local file).
    - If you want to use external APIs (for 100% accuracy), create a `.env` file inside `backend/`:
      ```env
      SECRET_KEY=your_super_secret_key_here
      # Optional: Add external API keys here (See API_KEYS_GUIDE.md)
      ```
5.  **Run the Backend Server:**
    ```bash
    uvicorn main:app --reload
    ```
    ✅ You should see: `Uvicorn running on http://127.0.0.1:8000`cd 

### 2️⃣ Frontend Setup (The Interface)
1.  **Open a NEW Terminal window (do not close the backend).**
2.  **Navigate to the frontend folder:**
    ```bash
    cd frontend 
    ```
3.  **Install Node Modules:**
    ```bash
    npm install
    ```
4.  **Start the React App:**
    ```bash
    npm run dev
    ```
    ✅ You should see: `Local: http://localhost:5173/`
5.  **Open Browser:** Go to [http://localhost:5173](http://localhost:5173) to use AI Guardian.

## 🧪 Running Tests
The project includes a suite of automated tests for Auth and Detection flows.
```bash
# Run from project root
pytest backend/test_auth_flow.py backend/test_detection_flow.py
```

## 📚 API Documentation
Once the backend is running, access the interactive API docs:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 💡 Usage Guide
1.  **Sign Up/Login**: Create an account to access the dashboard.
2.  **Dashboard**: View your recent activity and risk reports.
3.  **Detection Tools**:
    *   **Video**: Upload `.mp4` files to check for deepfakes.
    *   **Audio**: Upload `.mp3`/`.wav` to detect voice cloning.
    *   **Text**: Paste text to identify AI-generated content.
4.  **Feedback**: Submit feedback on results to help us improve.

## 👥 Meet the Team

| Role | Name | Contribution |
|------|------|--------------|
| **Model Training and Development** | **Priyanshu Shakya** | Training and development of models for deepfake detection and analysis. |
| **Backend** | **Gaurav** | Manage the page loading and data processing. |
| **Frontend** | **Rishika Pandey** | Creating the amazing user interface. |
| **Database** | **Soumya Yavav** | Creating the database and managing the dataflow. |

*Developed by Team AI Guardian.*
