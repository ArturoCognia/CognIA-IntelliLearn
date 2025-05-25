import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Si no está cargando y no hay usuario, redirigir a la página de inicio
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  // Mostrar spinner mientras verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // Si no hay usuario y no está cargando, no mostrar nada mientras redirige
  if (!user && !loading) {
    return null;
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>
}

export default ProtectedRoute 