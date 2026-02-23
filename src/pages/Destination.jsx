import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, Calendar, Thermometer, ArrowLeft, ShieldCheck, Share2, Heart, CheckCircle2 } from 'lucide-react'
import { destinations } from '../data/destinations'

const Destination = () => {
    const { id } = useParams()
    const dest = destinations.find(d => d.id === id)

    if (!dest) {
        return (
            <div className="pt-40 text-center min-h-screen">
                <h2 className="text-4xl font-black mb-4">Destino no encontrado</h2>
                <Link to="/explore" className="btn-primary inline-flex">Volver a Explorar</Link>
            </div>
        )
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen pb-32">
            {/* Visual Header / Gallery */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-32 left-0 w-full px-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-end">
                        <div>
                            <nav className="flex items-center gap-2 text-white/70 text-sm font-bold uppercase tracking-widest mb-6">
                                <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
                                <ArrowLeft size={14} className="rotate-180" />
                                <Link to="/explore" className="hover:text-primary transition-colors">Destinos</Link>
                                <ArrowLeft size={14} className="rotate-180" />
                                <span className="text-primary">{dest.name}</span>
                            </nav>
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">
                                {dest.name}
                            </h1>
                            <div className="flex flex-wrap gap-6 items-center text-white/90 font-bold">
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-primary" size={20} /> {dest.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="text-primary fill-primary" size={20} /> {dest.rating} (124 reviews)
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex gap-4">
                            <button className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20">
                                <Heart size={24} />
                            </button>
                            <button className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20">
                                <Share2 size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 mt-[-100px] relative z-20">
                <div className="lg:col-span-2 space-y-16">
                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-primary/5">
                        {[
                            { label: 'Altitud', val: '3,841m', icon: Clock },
                            { label: 'Mejor Época', val: 'May - Oct', icon: Calendar },
                            { label: 'Temperatura', val: '12°C - 18°C', icon: Thermometer },
                            { label: 'Duración', val: 'Todo el día', icon: Clock },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                                    <item.icon size={20} className="text-primary group-hover:text-slate-900" />
                                </div>
                                <p className="text-[10px] uppercase font-black text-slate-400 mb-1">{item.label}</p>
                                <p className="font-black text-slate-900 dark:text-white">{item.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* About Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1.5 h-10 bg-primary rounded-full"></div>
                            <h2 className="text-4xl font-black">Sobre el Destino</h2>
                        </div>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium space-y-6">
                            <p>{dest.description}</p>
                            <p>Ideal para aquellos que buscan conectarse con la esencia de los Andes bolivianos, este lugar ofrece una combinación perfecta de misticismo y belleza natural inigualable.</p>
                        </div>
                    </section>

                    {/* What to do Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-10 bg-primary rounded-full"></div>
                                <h2 className="text-4xl font-black">Qué hacer</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { name: 'Tour Guiado Privado', price: 45, time: '6 horas de inmersión' },
                                { name: 'Excursión Fotográfica', price: 35, time: 'Captura los mejores ángulos' },
                            ].map((act, i) => (
                                <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm group">
                                    <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{act.name}</h3>
                                    <p className="text-slate-500 mb-6 font-medium">{act.time}</p>
                                    <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-800">
                                        <span className="text-2xl font-black">${act.price} <span className="text-xs text-slate-400 font-normal">/persona</span></span>
                                        <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-primary hover:text-slate-900 transition-all">
                                            Reservar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tips Section */}
                    <section className="bg-primary/5 p-10 rounded-3xl border border-primary/20">
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-primary" /> Consejos para tu visita
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'Lleva bloqueador solar y sombrero',
                                'Mantente hidratado por la altitud',
                                'Usa calzado cómodo para caminar',
                                'Lleva efectivo para artesanías locales',
                            ].map((tip, i) => (
                                <li key={i} className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 size={18} className="text-primary shrink-0" /> {tip}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Booking Sidebar */}
                <aside className="space-y-8 sticky top-28 self-start">
                    <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <span className="material-icons text-9xl">luggage</span>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-5xl font-black">${dest.price}</span>
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Precio Inicial</span>
                            </div>

                            <div className="space-y-6 mb-10">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Personas</label>
                                    <select className="bg-slate-800 border-none rounded-xl py-3 px-4 font-bold focus:ring-2 focus:ring-primary w-full">
                                        <option>1 Persona</option>
                                        <option>2 Personas</option>
                                        <option>3+ Personas</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Fecha Tentativa</label>
                                    <input type="date" className="bg-slate-800 border-none rounded-xl py-3 px-4 font-bold focus:ring-2 focus:ring-primary w-full" />
                                </div>
                            </div>

                            <button className="btn-primary w-full py-5 text-lg shadow-primary/40 hover:scale-[1.02] active:scale-95 mb-4">
                                Confirmar Reserva
                            </button>
                            <p className="text-center text-xs text-slate-500 font-bold uppercase tracking-widest">Garantía de Mejor Precio</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-primary/10 shadow-sm">
                        <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                            <MapPin size={20} className="text-primary" /> Ubicación
                        </h4>
                        <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden relative">
                            <iframe
                                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(dest.name + ', ' + dest.location)}!5e0!3m2!1ses!2sbo!4v1700000000000!5m2!1ses!2sbo`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.name + ', ' + dest.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full mt-6 py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-center text-slate-900 dark:text-white"
                        >
                            Abrir en Google Maps
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Destination
