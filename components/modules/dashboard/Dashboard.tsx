'use client'
import { FaBook, FaClipboardList, FaChartLine } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

export const Dashboard = () => {
  // Datos de ejemplo
  const courses = [
    {
      id: 1,
      title: 'Introducción al Machine Learning',
      instructor: 'Dra. Ana Martínez',
      progress: 75,
      image: '/assets/images/Image.svg',
      nextLesson: 'Redes Neuronales Avanzadas',
    },
    {
      id: 2,
      title: 'Desarrollo Web Full Stack',
      instructor: 'Ing. Carlos López',
      progress: 45,
      image: '/assets/images/Image.svg',
      nextLesson: 'APIs RESTful',
    },
    {
      id: 3,
      title: 'Diseño UX/UI Profesional',
      instructor: 'Lic. María González',
      progress: 30,
      image: '/assets/images/Image.svg',
      nextLesson: 'Pruebas de Usabilidad',
    },
  ]

  const upcomingAssignments = [
    {
      id: 1,
      title: 'Proyecto Final - Machine Learning',
      dueDate: '2025-06-15',
      course: 'Introducción al Machine Learning',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Entrega de API RESTful',
      dueDate: '2025-06-10',
      course: 'Desarrollo Web Full Stack',
      status: 'pending',
    },
  ]

  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#132944] to-[#3C31A3] rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">¡Bienvenido de nuevo, Usuario!</h1>
            <p className="opacity-90">Continúa con tu aprendizaje donde lo dejaste</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/dashboard/courses"
              className="bg-white text-[#3C31A3] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Ver todos mis cursos
            </Link>
          </div>
        </div>
      </div>

      {/* Course Progress Section */}
      <div>
        <h2 className="text-xl font-bold text-[#132944] mb-4">Mis cursos en progreso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#132944] text-lg">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progreso</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#132944] to-[#3C31A3] h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link href={`/dashboard/courses/${course.id}`} className="text-[#3C31A3] font-medium text-sm hover:underline">
                    Continuar con: {course.nextLesson}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Assignments Section */}
      <div>
        <h2 className="text-xl font-bold text-[#132944] mb-4">Próximas entregas</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {upcomingAssignments.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-[#132944]">{assignment.title}</h3>
                    <p className="text-gray-600 text-sm">{assignment.course}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                      Fecha límite: {formatDate(assignment.dueDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">¡No tienes entregas pendientes!</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link href="/dashboard/assignments" className="text-[#3C31A3] font-medium hover:underline">
            Ver todas las tareas
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaBook className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Cursos Activos</p>
              <p className="text-xl font-bold text-[#132944]">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <FaClipboardList className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Tareas Completadas</p>
              <p className="text-xl font-bold text-[#132944]">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaChartLine className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Promedio</p>
              <p className="text-xl font-bold text-[#132944]">92%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 