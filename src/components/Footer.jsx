import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
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
                        <h4 className="font-bold text-lg mb-8">Destinos Populares</h4>
                        <ul className="space-y-4 text-slate-400">
                            {['Salar de Uyuni', 'Lago Titicaca', 'P.N. Toro Toro', 'Tiwanaku', 'Sucre'].map(item => (
                                <li key={item}>
                                    <Link to="/explore" className="hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-8">Boletín Informativo</h4>
                        <p className="text-slate-400 mb-6">Recibe ofertas exclusivas y consejos de viaje en tu correo.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                            />
                            <button className="btn-primary w-full">
                                Suscribirse
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                    <p>© 2024 Aventura Bolivia. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
