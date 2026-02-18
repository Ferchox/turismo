import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start">
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <span className="material-icons text-white">terrain</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight uppercase">
                                Aventura <span className="text-primary">Bolivia</span>
                            </span>
                        </Link>

                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-8">Navegación</h4>
                        <ul className="space-y-4 text-slate-400">
                            {[
                                { name: 'Inicio', path: '/' },
                                { name: 'Explorar', path: '/explore' },
                                { name: 'Destinos', path: '/explore?cat=destinos' },
                                { name: 'Alojamiento', path: '/explore?cat=alojamiento' },
                            ].map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="hover:text-primary transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-8">Horarios de atención</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li><strong className="text-white">Horario:</strong> Lun – Vie: 09:00 – 18:30</li>
                            <li><strong className="text-white">Dirección:</strong> Av. Rafael Pabón, Zona Irpavi, La Paz</li>
                            <li><strong className="text-white">Soporte:</strong> 24/7 por chat y correo</li>
                            <li><strong className="text-white">Tel:</strong> <a href="tel:+59170534180" className="hover:text-primary transition-colors">+591 70534180</a></li>
                            <li><strong className="text-white">Email:</strong> <a href="mailto:aventura.bolivia@gmail.com" className="hover:text-primary transition-colors">aventura.bolivia@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 text-center">
                    <p className="text-sm text-slate-500">© 2024 Aventura Bolivia. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
