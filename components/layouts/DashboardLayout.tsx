'use client'
import React, { ReactNode, useState } from 'react'
import Head from 'next/head'
import { Sidebar } from '@/components/common/Sidebar'
import { FloatingAssistant } from '@/components/common/FloatingAssistant'
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '@/lib/AuthContext'

export type DashboardLayoutProps = {
  children: ReactNode
  title?: string
  description?: string
}

export const DashboardLayout = ({ 
  children, 
  title = 'Dashboard', 
  description = 'CognIA IntelliLearn Platform' 
}: DashboardLayoutProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar búsqueda
    console.log('Buscar:', searchQuery);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col bg-gray-50">
        <Head>
          <title>{title} | CognIA IntelliLearn</title>
          <meta name="description" content={description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        {/* Header con barra de búsqueda */}
        <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
          <div className="w-full max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar cursos, tareas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#13294e] focus:border-[#13294e] text-sm"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full relative"
              >
                <FaBell />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium">Notificaciones</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium">Nuevo curso disponible</p>
                      <p className="text-xs text-gray-500">Se ha añadido un nuevo curso a tu catálogo</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm font-medium">Tarea próxima a vencer</p>
                      <p className="text-xs text-gray-500">La tarea "Análisis de datos" vence mañana</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#13294e] rounded-full flex items-center justify-center text-white uppercase font-medium text-sm">
                {user?.displayName ? user.displayName.charAt(0) : 'U'}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.displayName || 'Usuario Demo'}
              </span>
              <FaChevronDown className="text-gray-400 text-xs" />
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
      </div>
      
      <FloatingAssistant />
    </div>
  )
} 