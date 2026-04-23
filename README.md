# 🗳️ Voting / Poll App

A simple and interactive web application that allows users to create polls, vote on options, and view real-time results with percentage-based visualizations.

---

## 🚀 Features

* ✅ Create polls with **2 to 4 options**
* 🗳️ Vote on polls (one vote per user)
* 📊 Real-time results with **percentage bars**
* 📈 Visual progress bars for vote distribution
* 📋 View all active polls
* ❌ Delete polls
* 🚫 Prevent duplicate voting using **localStorage**
* 🔢 Display total vote count per poll
* 🎨 Clean and modern UI with animations

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **Database:** In-memory (JavaScript object)

---

## 📁 Project Structure

```
/project
  /frontend
    index.html
    style.css
    app.js
  /backend
    server.js
```

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/LOKESH280502/voting-app
cd voting-app
```

---

### 2️⃣ Start Backend

```bash
cd backend
npm install
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

### 3️⃣ Run Frontend

Open:

```
frontend/index.html
```

Or use Live Server in VS Code.

---

 

## 📊 How It Works

1. User creates a poll with a question and options
2. Poll is stored in backend (in-memory)
3. Users vote on an option
4. Results update instantly with percentages
5. Duplicate voting is prevented using browser storage

---



## 🌐 Using Deployed Version

If you want to use the deployed backend instead of running locally, update the API URL in `frontend/app.js`:

```js
const API = "https://your-backend-url.onrender.com";

## 👨‍💻 Author

* LOKESHWAR GASIKANTI

---

 

 
