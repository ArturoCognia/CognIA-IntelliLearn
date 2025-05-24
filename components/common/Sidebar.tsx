'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaHome, FaBook, FaTasks, FaUserAlt, FaSignOutAlt, FaRobot, FaChartLine, FaGraduationCap, FaTrophy, FaFileAlt, FaCog } from 'react-icons/fa'

type MenuItem = {
  name: string
  icon: React.ReactNode
  href: string
}

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <FaHome className="text-xl" />, href: '/dashboard' },
    { name: 'Mis Cursos', icon: <FaBook className="text-xl" />, href: '/dashboard/courses' },
    { name: 'Contenido', icon: <FaFileAlt className="text-xl" />, href: '/dashboard/content' },
    { name: 'Asistente IA', icon: <FaRobot className="text-xl" />, href: '/dashboard/assistant' },
    { name: 'Analytics', icon: <FaChartLine className="text-xl" />, href: '/dashboard/analytics' },
    { name: 'Gamificación', icon: <FaTrophy className="text-xl" />, href: '/dashboard/gamification' },
    { name: 'Tareas', icon: <FaTasks className="text-xl" />, href: '/dashboard/assignments' },
    { name: 'Certificados', icon: <FaGraduationCap className="text-xl" />, href: '/dashboard/certificates' },
    { name: 'Perfil', icon: <FaUserAlt className="text-xl" />, href: '/dashboard/profile' },
    { name: 'Configuración', icon: <FaCog className="text-xl" />, href: '/dashboard/settings' },
  ]

  return (
    <div
      className={`bg-gradient-to-b from-[#132944] to-[#3C31A3] text-white h-screen transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } flex flex-col`}
    >
      {/* Logo and toggle */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo-white.svg"
              alt="CognIA Logo"
              width={120}
              height={32}
              priority
            />
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-full">
            <Image
              src="/assets/images/IA.svg"
              alt="IA Logo"
              width={32}
              height={32}
              priority
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-white/20"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 my-2" />

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center text-white hover:bg-white/10 rounded-lg p-3 transition-all ${
              collapsed ? 'justify-center' : 'px-4'
            }`}
          >
            <span className="text-white/80">{item.icon}</span>
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button className={`w-full flex items-center text-white hover:bg-white/10 rounded-lg p-3 ${
          collapsed ? 'justify-center' : 'px-4'
        }`}>
          <FaSignOutAlt className="text-white/80 text-xl" />
          {!collapsed && <span className="ml-3">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  )
} 