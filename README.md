# 🌟 **CodeNexus — AI-Powered Code Snippet Manager**

A beautifully designed **Next.js 15 + React 19 + Tailwind CSS v4** application for storing, organizing, and analyzing code snippets.
Features include search, tagging, filtering, editing, AI-assisted explanation/optimization, and a modern UI.

---

## 🚀 **Tech Stack**

| Technology                  | Purpose                       |
| --------------------------- | ----------------------------- |
| **Next.js 15 (App Router)** | Framework & routing           |
| **React 19**                | UI engine with React Compiler |
| **Tailwind CSS v4**         | Styling                       |
| **Lucide Icons**            | Icon system                   |
| **LocalStorage**            | Persistent snippet storage    |
| **Anthropic Claude API**    | AI explanation & optimization |

---

## ✨ **Features**

### 🧠 AI-Powered Enhancements

* Explain code
* Optimize code
* Identify potential improvements
* Claude Sonnet model integration

### 💾 Snippet Management

* Add/edit/delete code snippets
* Auto-save with LocalStorage
* Syntax-friendly preview blocks

### 🔍 Search & Filtering

* Search by title, description, or tags
* Filter by programming language

### 🏷️ Tag System

* Press Enter to add tags
* Remove tags dynamically

### 💎 UI & UX

* Beautiful glassmorphism layout
* Responsive design
* Smooth modals & transitions
* Fully compatible with React Compiler + Next.js client components

---

## 📁 **Project Structure**

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   └── CodeNexus/
│       ├── CodeNexus.jsx
│       ├── AddSnippetModal.jsx
│       ├── AiModal.jsx
│       └── CodeCard.jsx
│
├── styles/
│   └── globals.css  (optional alternative location)
│
├── public/
│   └── favicon.ico
│
next.config.ts
postcss.config.js
tailwind.config.ts
package.json
README.md
```

---

## 🛠️ **Installation**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/code-nexus-next.git
cd code-nexus-next
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Run the development server

```bash
npm run dev
```

App will be available at:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧪 **Build for Production**

```bash
npm run build
npm start
```

---

## 🔐 **Environment Variables (AI Integration)**

If you integrate the Claude API officially, create:

```
.env.local
```

With:

```
ANTHROPIC_API_KEY=your_key_here
```

Update the API route or fetch headers accordingly.

(Current implementation uses a placeholder fetch URL.)

---

## 🖼️ **Screenshots**

Add your own screenshots here. Example:

```
![Dashboard](./screenshots/dashboard.png)
![Modal](./screenshots/modal.png)
```

---

## 📦 Deployment

### ⚡ Deployed to Vercel 

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📝 License

MIT License.
Free to modify, distribute, and use commercially.

---

## ⭐ Support the Project

If you like CodeNexus, give it a 🌟 on GitHub!

---

