import React from 'react';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';
import { FaUniversity, FaGraduationCap, FaStar } from 'react-icons/fa';
import { TbUserShare } from 'react-icons/tb';
import './landingPage.css'

export default function LandingPage() {
    return (
        <div className="bg-white text-gray-800">
            {/* Header */}
            <header className="w-full bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="text-2xl font-bold tracking-wide">
                    <Image
                        className=''
                        src={'/assets/images/Logo.svg'}
                        alt="Logo"
                        width={287}
                        height={77}
                        quality={100}
                    />
                </div>
                <nav className="flex flex-wrap gap-4 text-sm items-center">
                    <a href="#" className="btn-header">¿Cómo Funciona?</a>
                    <a href="#" className="btn-header">Beneficios</a>
                    <a href="#" className="btn-header">Testimonios</a>
                    <button className="btn-header-gradient">Solicitar Demo</button>
                </nav>
                <button className="btn-login"><FiUser className='text-[22px] mr-3' /> Log In</button>

            </header>

            {/* Hero Section */}
            <section className="bg-gradient-banner py-16 px-6 text-center md:text-left md:flex md:items-center md:justify-between gap-8">
                <div className="max-w-xl mx-auto md:mx-0">
                    <h1 className="text-[65px] font-bold mb-4 leading-tight text-gray-900">
                        Tu Campus Virtual con <span className="textCognIa z-10 relative">CognIA
                            <Image
                                className='absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[511px] text-[20px]'
                                src={'/assets/images/Subrayado.svg'}
                                alt="subrayado"
                                width={310}
                                height={73}
                                quality={100}
                            />
                        </span>
                    </h1>
                    <p className="mb-6 text-base">Transforma tu institución con nuestra plataforma para ofrecer carreras en línea de alta calidad, impulsadas por inteligencia artificial.</p>
                    <button className="btn-proof flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        Prueba nuestro asistente
                    </button>
                </div>
                <div className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center">
                    <Image
                        className='w-full max-w-md'
                        src={'/assets/images/OBJECTS.svg'}
                        alt="Descriptive text for accessibility"
                        width={800}
                        height={600}
                        priority
                    />
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-10 bg-white text-center">
                <div className="bg-item">
                    <p className="text-start text-[40px] font-bold">500+</p>
                    <p className="w-[207px] text-[16px] text-start mt-2">Instituciones transformando la educación en línea.</p>
                    <div className='flex justify-end'>
                        <p className='icon-item'>
                            <FaUniversity />
                        </p>
                    </div>
                </div>
                <div className="bg-item">
                    <p className="text-start text-[40px] font-bold">50.000+</p>
                    <p className="w-[207px] text-[16px] text-start mt-2">Estudiantes aprendiendo con inteligencia artificial.</p>
                    <div className='flex justify-end'>
                        <p className='icon-item'>
                            <FaGraduationCap />
                        </p>
                    </div>
                </div>
                <div className="bg-item">
                    <p className="text-start text-[40px] font-bold">5.000+</p>
                    <p className="w-[207px] text-[16px] text-start mt-2">Docentes optimizando su enseñanza.</p>
                    <div className='flex justify-end'>
                        <p className='icon-item'>
                            <TbUserShare />
                        </p>
                    </div>
                </div>
                <div className="bg-item">
                    <p className="text-start text-[40px] font-bold">98%</p>
                    <p className="w-[207px] text-[16px] text-start mt-2">Satisfacción con la experiencia de aprendizaje.</p>
                    <div className='flex justify-end'>
                        <p className='icon-item'>
                            <FaStar />
                        </p>
                    </div>
                </div>
            </section>

            {/* Campus Virtual Integral */}
            <section className="py-4 px-6 bg-white">
                <div className="text-center mb-10">
                    <h2 className="textCognIA">Descubre cómo ofrecer carreras en línea con CognIA</h2>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="bg-gradient-to-r from-[#132944] to-[#3C31A3] text-white text-center p-10 rounded-2xl shadow-lg">
                        <h2 className="text-[40px] font-bold mb-4">Campus virtual integral</h2>
                        <p className="text-[16px] mx-auto font-light">
                            Todo lo que necesitas para ofrecer
                        </p>
                        <p className="text-[16px] font-light">
                            servicios educativos completos en línea.
                        </p>
                        <Image
                            className="mx-auto w-full max-w-4xl"
                            src={'/assets/images/Image.svg'}
                            alt="subrayado"
                            width={541}
                            height={281}
                            quality={100}
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 mt-8 md:mt-0">
                        <div className="wrappItem">
                            <h3 className="text-[20px] font-bold mb-1">Gestión académica completa.</h3>
                            <p className="text-[16px]">Administra planes de estudio, materias, evaluaciones y titulación en un solo lugar. Compatible con normas educativas internacionales.</p>
                        </div>
                        <div className="wrappItem">
                            <h3 className="text-[20px] font-bold mb-1">Comunidad de aprendizaje.</h3>
                            <p className="text-[16px]">Foros, trabajo colaborativo, sesiones en vivo y networking profesional integrado en la plataforma para una experiencia universitaria completa.</p>
                        </div>
                        <div className="wrappItem">
                            <h3 className="text-[20px] font-bold mb-1">Analítica educativa avanzada.</h3>
                            <p className="text-[16px]">Métricas de progresión académica, detección temprana de deserción y análisis de efectividad de programas para optimizar tu oferta educativa.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beneficios (Placeholder) */}
            <section className="text-center py-10">
                <h2 className="text-[59px] font-bold text-[#1f1e6d]">Beneficios de nuestra plataforma</h2>
            </section>
        </div>
    );
}
