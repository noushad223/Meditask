## Setup Instructions

### Prerequisites
- Python **3.10+**
- Node.js & npm (for frontend)

---

### 1. Clone the Repository

```bash
git clone https://github.com/noushad223/Meditask
cd meditask
```

---

### 2. Set Up Virtual Environment

```bash
python -m venv venv
```

**Activate the virtual environment:**

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **Linux/macOS:**
  ```bash
  source venv/bin/activate
  ```

---

### 3. Install Dependencies & Run Migrations

```bash
pip install -r requirements.txt
python manage.py migrate
```

---

### 4. Run the Backend Server

```bash
python manage.py runserver
```

---

### 5. Run the Frontend

```bash
cd frontend
npm install
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

---
