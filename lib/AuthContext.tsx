import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { subscribeToAuthChanges } from './firebaseAuth';

// Tipo para el contexto de autenticación
type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null;
};

// Crear el contexto
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null
});

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Función para suscribirse a los cambios de autenticación
    const setupAuthListener = () => {
      try {
        setLoading(true);
        setError(null);
        
        // Suscribirse a los cambios de autenticación
        const unsubscribe = subscribeToAuthChanges((user) => {
          setUser(user);
          setLoading(false);
        });

        // Limpiar la suscripción al desmontar
        return unsubscribe;
      } catch (err) {
        console.error("Error al configurar la autenticación:", err);
        setError(err instanceof Error ? err : new Error('Error desconocido en autenticación'));
        setLoading(false);
        
        // Intentar reconectar después de un tiempo si hay un error
        if (retryCount < 3) {
          const timeout = setTimeout(() => {
            setRetryCount(prev => prev + 1);
            setupAuthListener();
          }, 3000); // Reintento después de 3 segundos
          
          return () => clearTimeout(timeout);
        }
        
        return () => {}; // No hay nada que limpiar si falla
      }
    };

    const unsubscribe = setupAuthListener();
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [retryCount]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext); 