---

```
# 🛍️ E‑Commerce Web Application

A **E‑commerce web app** built with **React + Vite**, **TailwindCSS**, and **React Router**.  
Features include: product listing, category sidebar, best sellers, product ratings, cart with animation, checkout with address form & truck animation, and Firebase authentication (login/signup).  

---

## 🚀 Features
- 🔎 Search, Filter & Categories (animated dropdown in navbar, expandable sidebar with icons)  
- ❤️ Favorites (toggle heart, saved in local state)  
- ⭐ Ratings & Best Sellers Section  
- 🛒 Cart with counter (+/–) and animated items  
- 📦 Checkout page with address form and truck animation  
- 👕 Product Detail page with sizes for clothes, Add to Cart, Buy Now, and back navigation  
- 🔐 Firebase Authentication (Login/Signup)  
- 🌐 Deployed on Netlify  

---

## 🏗️ Tech Stack
- **Frontend**: React (Vite), TailwindCSS  
- **State Management**: React Context (Cart Context)  
- **Routing**: React Router  
- **Animations**: Framer Motion  
- **Backend/DB**: Firebase (for auth & deployment)  
- **Deployment**: Netlify  

---

## 📂 Folder Structure
```

src/
├── assets/              # Images, icons, etc.
├── components/          # Navbar, Sidebar, BestSellers, etc.
├── contexts/            # CartContext
├── pages/               # Home, ProductDetail, Cart, Checkout
├── services/            # API calls (getProducts, getProductById)
├── App.jsx
├── main.jsx

````

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ecommerce-clone.git
cd ecommerce-clone
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup TailwindCSS

(Tailwind already configured, but in case you need to re‑init)

```bash
npx tailwindcss init -p
```

Make sure your `tailwind.config.js` has:

```js
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
```

---

### 4. Setup Firebase (for Auth)

* Go to [Firebase Console](https://console.firebase.google.com/) → create a new project.
* Enable **Authentication → Email/Password**.
* Add your Firebase config in `src/firebase.js`:

```js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
```

---

### 5. Run the project locally

```bash
npm run dev
```

👉 Open browser at: `http://localhost:5173/`

---

### 6. Build for production

```bash
npm run build
```

The production build will be in the `/dist` folder.

---

### 7. Deploy to Netlify

Option 1 (Auto via GitHub): Push code → Netlify auto builds.
Option 2 (Manual):

```bash
npm run build
```

Upload `/dist` to Netlify dashboard or use CLI:

```bash
netlify deploy --prod
```

---

## 📖 Future Improvements

* 🧾 Order history page
* 💳 Payment gateway integration (Stripe/PayPal)
* 🌙 Dark mode support
* 📱 Better mobile UI

---

```