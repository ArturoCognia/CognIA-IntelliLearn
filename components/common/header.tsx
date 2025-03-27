import { FiUser } from 'react-icons/fi';
import Image from 'next/image';

export const HeaderComponent = () => {
    return(
        <div>
<header className="w-full bg-white p-4 flex items-center justify-between flex-wrap gap-4 px-10">
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
        </div>
        
    )
}