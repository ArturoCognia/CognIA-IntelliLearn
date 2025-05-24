'use client'
import { ReactNode } from 'react'
import { Sidebar } from '@/components/common/Sidebar'
import { FiBell, FiSearch } from 'react-icons/fi'

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cursos, tareas..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3C31A3] focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiBell className="text-gray-600 text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Usuario Demo</span>
                <div className="w-10 h-10 rounded-full bg-[#E9E6FF] flex items-center justify-center text-[#3C31A3] font-semibold">
                  UD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
} 