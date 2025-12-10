# Patient Document Portal — Frontend only 
# For Backend check - https://github.com/vijaygowtham13/INI8_Server.git

### 🔗 Live Demo
https://ini8-client.netlify.app/ 
(API hosted on Railway, stays online)



## 📌 What this is
A small web app to **upload, view, download, and delete** patient PDF documents.  
Built as part of the **INI8 Labs Full Stack Developer Assessment**.

**Tech Used**
- React (Vite)
- Tailwind CSS (new no-config)
- Fetch API

The UI talks to an Express backend that stores PDF metadata in PostgreSQL (Supabase).



### ⚙️ Run Locally

1) Install
npm install
2) Environment variable
Create .env:
VITE_API_URL=http://localhost:4000
3) Start
npm run dev
Open → http://localhost:5173

Please make sure the backend is running.

 
## Expected Backend API

| Method | Endpoint             | Action      |
|--------|-----------------------|-------------|
| POST   | /documents/upload     | Upload PDF  |
| GET    | /documents            | List PDFs   |
| GET    | /documents/:id        | Download    |
| DELETE | /documents/:id        | Delete      |


Backend repo → https://github.com/vijaygowtham13/INI8_Server.git

# Author
Vijaygowtham
INI8 Labs — Full Stack Assignment

