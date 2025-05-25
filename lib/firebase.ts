// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2SyW8F0RSYud2XSwwB0HIYR_PtBgSV_s",
  authDomain: "cogniaintellilearn-ebdb3.firebaseapp.com",
  projectId: "cogniaintellilearn-ebdb3",
  storageBucket: "cogniaintellilearn-ebdb3.appspot.com",
  messagingSenderId: "194652864291",
  appId: "1:194652864291:web:08de5c271604bc3e741696",
  measurementId: "G-HJWX4FBK40"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// IMPORTANTE: NO debes poner directamente tu API key en el código.
// Firebase AI Logic gestionará la autenticación de forma segura a través del backend.
// Inicializar el servicio de backend de Google AI para Gemini
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Crear una instancia de GenerativeModel con un modelo que sea adecuado para nuestro caso de uso
// gemini-1.5-pro-latest para calidad superior, gemini-1.5-flash para respuestas más rápidas
export const geminiModel = getGenerativeModel(ai, { model: "gemini-1.5-flash" });

// Función para generar contenido utilizando Gemini
export async function generateAIResponse(prompt: string) {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error al generar contenido con Gemini:", error);
    return "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.";
  }
}

// Función para mantener una conversación
export async function chatWithAI(messages: Array<{role: string, content: string}>) {
  try {
    // Crear un nuevo chat
    const chat = geminiModel.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });
    
    // Enviar cada mensaje anterior para establecer contexto
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      if (msg.role === 'user') {
        await chat.sendMessage(msg.content);
      }
    }
    
    // Enviar el último mensaje y obtener respuesta
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    return result.response.text();
  } catch (error) {
    console.error("Error en la conversación con Gemini:", error);
    return "Lo siento, ha ocurrido un error en nuestra conversación. Por favor, intenta de nuevo.";
  }
}

// Proveedor de Google
export const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    return { success: false, error };
  }
};

// Función para cerrar sesión
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return { success: false, error };
  }
};

// Hook personalizado para obtener el estado de autenticación
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { app, auth, db, storage, analytics }; 