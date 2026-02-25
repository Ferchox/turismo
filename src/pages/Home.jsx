import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, ArrowRight, PlayCircle, Phone, Mail } from 'lucide-react'
import { destinations } from '../data/destinations'

const Home = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/explore?query=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            navigate('/explore')
        }
    }

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section id="inicio" className="relative h-screen flex items-center justify-center pt-12 md:pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/illimani.jpg"
                        alt="La Paz Skyline"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="bg-primary/20 backdrop-blur-md text-primary font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6 inline-block">
                            La aventura te espera
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-tight px-4">
                            Descubre lo mejor <br />
                            de <span className="text-primary italic">Bolivia</span>
                        </h1>
                        <p className="text-base md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg px-4">
                            Desde el espejo infinito de Uyuni hasta la selvas del Amazonas. Explora el país más diverso del corazón de Sudamérica.
                        </p>

                        <form onSubmit={handleSearch} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 md:p-5 rounded-xl shadow-2xl flex flex-col gap-4 max-w-2xl mx-auto group">

                            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center w-full">
                                <div className="flex-1 w-full text-left px-2 md:px-3">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1">
                                        <MapPin size={12} className="text-primary" /> Destino o Experiencia
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                            }}
                                            placeholder="Ej: Un lugar salado..."
                                            className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-bold text-sm md:text-base placeholder:text-slate-300 outline-none"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full md:w-auto btn-primary py-2.5 md:py-3 px-6 md:px-8 text-sm md:text-base whitespace-nowrap">
                                    <Search size={18} className="md:w-[20px] md:h-[20px]" /> Buscar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>

                {/* <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/50 text-xs md:text-sm animate-bounce cursor-pointer">
                    <span className="hidden sm:inline">Explora las regiones</span>
                    <ArrowRight className="rotate-90" size={16} />
                </div> */}
            </section>

            {/* Categories Section */}
            {/* <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { icon: 'landscape', label: 'Altiplano', path: '/explore?cat=Altiplano', color: 'bg-slate-500' },
                        { icon: 'park', label: 'Amazonía', path: '/explore?cat=Amazonia', color: 'bg-emerald-500' },
                        { icon: 'water', label: 'Valles', path: '/explore?cat=Valles', color: 'bg-blue-500' },
                        { icon: 'temple_hindu', label: 'Ciudades', path: '/explore?cat=Ciudad', color: 'bg-purple-500' },
                    ].map((cat, i) => (
                        <Link key={i} to={cat.path}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl flex flex-col items-center group cursor-pointer border border-primary/5 hover:border-primary/40 transition-all h-full"
                            >
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110 shadow-lg ${cat.color}/20`}>
                                    <span className={`material-icons text-2xl md:text-3xl group-hover:animate-pulse`}>{cat.icon}</span>
                                </div>
                                <span className="font-bold text-sm md:text-lg text-slate-800 dark:text-white text-center">{cat.label}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section> */}

            {/* Featured Destinations */}
            <section id="destinos" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-28">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black">Destinos de Ensueño</h2>
                    </div>
                    <Link to="/explore" className="btn-primary bg-primary/10 hover:bg-primary text-primary hover:text-slate-900 shadow-none">
                        Ver Todos <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {destinations.slice(0, 3).map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card group"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm">
                                        {dest.department}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                    <Link to={`/destination/${dest.id}`} className="text-white font-bold flex items-center gap-2 text-sm">
                                        Explorar ahora <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-black group-hover:text-primary transition-colors line-clamp-1">{dest.name}</h3>
                                    <div className="flex items-center gap-1 text-primary">
                                        <span className="material-icons text-xs">star</span>
                                        <span className="font-bold text-sm">{dest.rating}</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed text-xs">
                                    {dest.shortDescription}
                                </p>
                                <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                        <MapPin size={12} className="text-primary" />
                                        {dest.location}
                                    </div>
                                    <span className="text-xl font-black text-slate-900 dark:text-white">
                                        ${dest.price} <span className="text-[10px] text-slate-400 font-normal">/persona</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Visit Section */}
            <section id="nosotros" className="relative max-w-7xl mx-auto px-6 py-8 scroll-mt-24">
                {/* Texturas de fondo */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02]">
                        <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="grid grid-cols-2 gap-3">
                            <img
                                src="/images/LaPazTeleferico.jpeg"
                                alt="Modernidad y Vistas"
                                className="rounded-2xl h-60 object-cover mt-8 animate-float"
                            />
                            <img
                                src="/images/LaPazFondo3NOche.jpeg"
                                alt="La Paz de Noche"
                                className="rounded-2xl h-60 object-cover shadow-xl"
                            />
                        </div>
                    </div>
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-3 block">Corazón de Sudamérica</span>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">¿Por qué viajar por <br /> <span className="text-primary">Toda Bolivia?</span></h2>

                        <div className="space-y-6">
                            {[
                                {
                                    title: 'Diversidad Geográfica',
                                    desc: 'Desde la cordillera de los Andes hasta las tierras bajas tropicales, Bolivia ofrece todos los climas del mundo en un solo país.',
                                    icon: 'landscape'
                                },
                                {
                                    title: 'Ancestralidad Viva',
                                    desc: 'Sé testigo de culturas milenarias que mantienen sus tradiciones, idiomas y costumbres intactas.',
                                    icon: 'auto_awesome'
                                },
                                {
                                    title: 'Aventura Real',
                                    desc: 'Destinos auténticos, fuera de las rutas comerciales tradicionales, para viajeros que buscan experiencias genuinas.',
                                    icon: 'bolt'
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110">
                                        <span className="material-icons text-primary group-hover:text-white text-2xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black mb-1">{item.title}</h4>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contacto" className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950/50 scroll-mt-24">
                <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-black mb-2 text-primary">Contáctanos</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
                        ¿Tienes alguna pregunta? Estamos listos para ayudarte a planificar tu próxima aventura en Bolivia
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    {/* Info Card with Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="card p-0 overflow-hidden h-full"
                    >
                        <div className="h-40 md:h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.3547894739866!2d-68.08820842395988!3d-16.51799984145947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21e8e0e8e0e5%3A0x1e8e8e8e8e8e8e8!2sIrpavi%2C%20La%20Paz%2C%20Bolivia!5e0!3m2!1sen!2sus!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-300"
                            ></iframe>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="text-lg font-black mb-3">Información de Contacto</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 group">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                                        <MapPin size={14} className="text-primary group-hover:text-slate-900 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Dirección</h4>
                                        <p className="font-bold text-slate-900 dark:text-white text-xs">Av. Rafael Pabón, Zona Irpavi<br />La Paz, Bolivia</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 group">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                                        <Phone size={14} className="text-primary group-hover:text-slate-900 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Teléfono</h4>
                                        <a href="tel:+59170534180" className="font-bold text-slate-900 dark:text-white hover:text-primary transition-colors text-xs">+591 70534180</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 group">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                                        <Mail size={14} className="text-primary group-hover:text-slate-900 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Correo Electrónico</h4>
                                        <a href="mailto:aventura.bolivia@gmail.com" className="font-bold text-slate-900 dark:text-white hover:text-primary transition-colors text-xs">aventura.bolivia@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="card p-4 h-full"
                    >
                        <h3 className="text-lg font-black mb-3">Envíanos tu Consulta</h3>
                        <form className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre completo"
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-xs"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-xs"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+591 00000000"
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-xs"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Consulta
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Cuéntanos cómo podemos ayudarte..."
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium resize-none text-xs"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary py-2 text-xs">
                                Enviar Consulta <ArrowRight size={16} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Home
