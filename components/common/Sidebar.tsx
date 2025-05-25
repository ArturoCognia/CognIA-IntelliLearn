'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut } from '@/lib/firebaseAuth'
import { useAuth } from '@/lib/AuthContext'
import { FaHome, FaBook, FaClipboardList, FaChartLine, FaCertificate, FaTrophy, FaCog, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import { IoMdChatbubbles } from 'react-icons/io'

export const Sidebar = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut(window.location.origin)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Determinar si un enlace está activo
  const isActive = (path: string) => {
    if (path === '/dashboard' && router.pathname === '/dashboard') {
      return true
    }
    if (path !== '/dashboard' && router.pathname.startsWith(path)) {
      return true
    }
    return false
  }

  // Iconos de navegación principal
  const mainNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/dashboard/courses', label: 'Mis Cursos', icon: <FaBook /> },
    { path: '/dashboard/content', label: 'Contenido', icon: <FaClipboardList /> },
    { path: '/dashboard/assistant', label: 'Asistente IA', icon: <IoMdChatbubbles /> },
    { path: '/dashboard/analytics', label: 'Analytics', icon: <FaChartLine /> },
    { path: '/dashboard/gamification', label: 'Gamificación', icon: <FaTrophy /> },
  ]

  // Iconos de navegación secundaria
  const secondaryNavItems = [
    { path: '/dashboard/assignments', label: 'Tareas', icon: <FaClipboardList /> },
    { path: '/dashboard/certificates', label: 'Certificados', icon: <FaCertificate /> },
    { path: '/dashboard/profile', label: 'Perfil', icon: <FaUserCircle /> },
    { path: '/dashboard/settings', label: 'Configuración', icon: <FaCog /> },
  ]

  return (
    <>
      {/* Botón móvil para abrir sidebar */}
      <button
        className="fixed top-4 left-4 bg-[#132944] text-white p-2 rounded-md shadow-md md:hidden z-30"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-[280px] h-screen bg-[#13294e] text-white z-20 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 flex flex-col`}
      >
        {/* Logo */}
        <div className="py-6 px-4 flex justify-center">
          <Link href="/dashboard" className="block">
            <Image
              src="/assets/images/logo-white.svg"
              alt="CognIA Logo"
              width={120}
              height={35}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Perfil del usuario */}
        <div className="px-5 py-4 mb-4 flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center uppercase font-bold text-[#13294e]">
            {user?.displayName ? user.displayName.charAt(0) : 'U'}
          </div>
          <div className="ml-3">
            <p className="text-white text-sm font-medium">
              {user?.displayName || 'Usuario Demo'}
            </p>
            <p className="text-xs text-white/60">
              {user?.email || 'usuario@ejemplo.com'}
            </p>
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="space-y-1.5">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm ${
                    isActive(item.path)
                      ? 'bg-white/10 font-medium text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 mb-2">
            <p className="px-4 text-xs font-medium text-white/50 uppercase">
              Herramientas
            </p>
          </div>

          <ul className="space-y-1.5">
            {secondaryNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm ${
                    isActive(item.path)
                      ? 'bg-white/10 font-medium text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón de cierre de sesión */}
        <div className="p-4 mt-auto">
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white/10 text-white text-sm rounded-lg hover:bg-white/15 transition-colors"
          >
            <FaSignOutAlt className="text-lg" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
} 