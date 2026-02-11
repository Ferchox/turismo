import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, ArrowRight, PlayCircle } from 'lucide-react'
import { destinations } from '../data/destinations'

const Home = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/fondoLaPaz.jpeg"
                        alt="La Paz Skyline"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background-light dark:to-background-dark"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="bg-primary/20 backdrop-blur-md text-primary font-bold px-4 py-2 rounded-full text-sm uppercase tracking-widest mb-6 inline-block">
                            La aventura te espera
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
                            Descubre lo mejor <br />
                            de <span className="text-primary italic">Bolivia</span>
                        </h1>
                        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
                            Desde el espejo infinito de Uyuni hasta la selvas del Amazonas. Explora el país más diverso del corazón de Sudamérica.
                        </p>

                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-6 items-center max-w-4xl mx-auto group">
                            <div className="flex-1 w-full text-left px-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                    <MapPin size={14} className="text-primary" /> Destino
                                </label>
                                <input
                                    type="text"
                                    placeholder="¿A qué departamento vas?"
                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-bold text-lg placeholder:text-slate-300"
                                />
                            </div>
                            <div className="h-12 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                            <div className="flex-1 w-full text-left px-4">
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                    <Calendar size={14} className="text-primary" /> Cuándo
                                </label>
                                <input
                                    type="text"
                                    placeholder="Temporada ideal"
                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-bold text-lg placeholder:text-slate-300"
                                />
                            </div>
                            <div className="h-12 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                            <button className="w-full md:w-auto btn-primary py-5 px-12 text-lg">
                                <Search size={22} /> Buscar
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/50 text-sm animate-bounce cursor-pointer">
                    <span>Explora las regiones</span>
                    <ArrowRight className="rotate-90" size={16} />
                </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-6 mt-12 md:-mt-20 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { icon: 'landscape', label: 'Altiplano', color: 'bg-slate-500' },
                        { icon: 'park', label: 'Amazonía', color: 'bg-emerald-500' },
                        { icon: 'water', label: 'Valles', color: 'bg-blue-500' },
                        { icon: 'temple_hindu', label: 'Ciudades', color: 'bg-purple-500' },
                    ].map((cat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-xl flex flex-col items-center group cursor-pointer border border-primary/5 hover:border-primary/40 transition-all"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 shadow-lg ${cat.color}/20`}>
                                <span className={`material-icons text-3xl group-hover:animate-pulse`}>{cat.icon}</span>
                            </div>
                            <span className="font-bold text-lg text-slate-800 dark:text-white">{cat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Imperdibles</span>
                        <h2 className="text-4xl md:text-5xl font-black">Destinos de Ensueño</h2>
                    </div>
                    <Link to="/explore" className="btn-primary bg-primary/10 hover:bg-primary text-primary hover:text-slate-900 shadow-none">
                        Ver Todos <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {destinations.slice(0, 3).map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card group"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase shadow-sm">
                                        {dest.department}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                    <Link to={`/destination/${dest.id}`} className="text-white font-bold flex items-center gap-2">
                                        Explorar ahora <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black group-hover:text-primary transition-colors line-clamp-1">{dest.name}</h3>
                                    <div className="flex items-center gap-1 text-primary">
                                        <span className="material-icons text-sm">star</span>
                                        <span className="font-bold">{dest.rating}</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-2 leading-relaxed">
                                    {dest.shortDescription}
                                </p>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <MapPin size={14} className="text-primary" />
                                        {dest.location}
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                                        ${dest.price} <span className="text-xs text-slate-400 font-normal">/persona</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Video Section */}
            <section className="relative h-[600px] flex items-center justify-center py-20">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1974&auto=format&fit=crop"
                        alt="Video Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                </div>
                <div className="relative z-10 text-center max-w-3xl px-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-8 mx-auto shadow-2xl shadow-primary/40 group overflow-hidden relative"
                    >
                        <PlayCircle size={48} className="text-slate-900 group-hover:scale-125 transition-transform" />
                    </motion.button>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Un viaje para el alma</h2>
                    <p className="text-xl text-white/80 font-medium">Bolivia es el secreto mejor guardado de Sudamérica. Mira nuestra guía visual y sorpréndete.</p>
                </div>
            </section>

            {/* Why Visit Section */}
            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="/images/LaPazTeleferico.jpeg"
                                alt="Modernidad y Vistas"
                                className="rounded-3xl h-80 object-cover mt-12 animate-float"
                            />
                            <img
                                src="/images/LaPazFondo3NOche.jpeg"
                                alt="La Paz de Noche"
                                className="rounded-3xl h-80 object-cover shadow-2xl"
                            />
                        </div>
                    </div>
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Corazón de Sudamérica</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">¿Por qué viajar por <br /> <span className="text-primary">Toda Bolivia?</span></h2>

                        <div className="space-y-10">
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
                                <div key={i} className="flex gap-6 group">
                                    <div className="shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110">
                                        <span className="material-icons text-primary group-hover:text-white text-3xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black mb-2">{item.title}</h4>
                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
