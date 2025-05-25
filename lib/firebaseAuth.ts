import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2SyW8F0RSYud2XSwwB0HIYR_PtBgSV_s",
  authDomain: "cogniaintellilearn-ebdb3.firebaseapp.com",
  projectId: "cogniaintellilearn-ebdb3",
  storageBucket: "cogniaintellilearn-ebdb3.appspot.com",
  messagingSenderId: "194652864291",
  appId: "1:194652864291:web:08de5c271604bc3e741696",
  measurementId: "G-HJWX4FBK40"
};

// Inicializar Firebase solo una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Exportar instancia de autenticación
export const auth = getAuth(app);

// Proveedor de Google
export const googleProvider = new GoogleAuthProvider();
// Agregar scopes adicionales para más permisos
googleProvider.addScope('profile');
googleProvider.addScope('email');
// Configurar el modo de selección de cuenta para forzar la selección
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    console.log("Iniciando proceso de autenticación con Firebase");
    console.log("Configuración:", {
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId
    });
    
    // Forzar el modo de selección de cuenta
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Autenticación exitosa", result.user.uid);
    
    // Siempre redirigir al dashboard después de iniciar sesión exitosamente
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }
    
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error detallado al iniciar sesión con Google:', error);
    
    // Intentar proporcionar un mensaje de error más descriptivo
    let errorMessage = "Error desconocido de autenticación";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Verificar si es un error de Firebase Auth
      if ((error as AuthError).code) {
        const authError = error as AuthError;
        switch(authError.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = "El popup de autenticación fue cerrado antes de completar el proceso";
            break;
          case 'auth/popup-blocked':
            errorMessage = "El popup de autenticación fue bloqueado por el navegador";
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = "La solicitud de popup fue cancelada";
            break;
          case 'auth/unauthorized-domain':
            errorMessage = "El dominio no está autorizado para operaciones de OAuth";
            break;
          default:
            errorMessage = `Error de Firebase: ${authError.code} - ${authError.message}`;
        }
      }
    }
    
    return { success: false, error, errorMessage };
  }
};

// Función para cerrar sesión
export const signOut = async (redirectUrl?: string) => {
  try {
    await firebaseSignOut(auth);
    
    // Redireccionar si se proporciona una URL
    if (redirectUrl && typeof window !== 'undefined') {
      window.location.href = redirectUrl;
    }
    
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