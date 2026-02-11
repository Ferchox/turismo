import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, User, Search, Compass } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Explorar', path: '/explore' },
        { name: 'Destinos', path: '/explore?cat=destinos' },
        { name: 'Alojamiento', path: '/explore?cat=alojamiento' },
    ]

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg h-16' : 'bg-transparent h-20'
            }`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                            <span className="material-icons text-white">terrain</span>
                        </div>
                        <span className={`text-xl font-bold tracking-tight uppercase ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'
                            }`}>
                            Aventura <span className="text-primary">Bolivia</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-semibold hover:text-primary transition-colors ${isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white/90'
                                    } ${location.pathname === link.path ? 'text-primary' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className={`p-2 rounded-full hover:bg-primary/10 transition-colors hidden sm:block ${isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white'
                        }`}>
                        <ShoppingCart size={20} />
                    </button>
                    <button className={`p-2 rounded-full hover:bg-primary/10 transition-colors hidden sm:block ${isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white'
                        }`}>
                        <User size={20} />
                    </button>
                    <button className="bg-primary hover:bg-primary-dark text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 hidden md:block">
                        Planear Viaje
                    </button>
                    <button
                        className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-2xl p-6 flex flex-col gap-4 animate-fade-in">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="btn-primary w-full mt-4">
                        Planear Viaje
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
