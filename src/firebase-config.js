import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_YOUR_API_KEY,
  authDomain: import.meta.env.VITE_YOUR_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_YOUR_PROJECT_ID,
  storageBucket: import.meta.env.VITE_YOUR_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_YOUR_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_YOUR_APP_ID,
  measurementId: import.meta.env.VITE_YOUR_MEASUREMENT_ID,
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy thể hiện Firebase Storage
const storage = getStorage(app);

export { storage };
