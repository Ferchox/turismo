import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Search as SearchIcon, MapPin, Star, ArrowRight, X } from 'lucide-react'
import { destinations } from '../data/destinations'

const Explore = () => {
    const [searchParams] = useSearchParams()
    const initialCategory = searchParams.get('cat') || 'Todos'

    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [searchQuery, setSearchQuery] = useState('')

    const categories = ['Todos', 'Naturaleza', 'Lago Titicaca', 'Historia', 'Aventura', 'Ciudad', 'Montaña']

    const filteredDestinations = destinations.filter(dest => {
        const matchesCategory = selectedCategory === 'Todos' || dest.category === selectedCategory
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.location.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="pt-32 pb-20 bg-background-light dark:bg-background-dark min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-5xl font-black mb-4">Explora La Paz</h1>
                    <p className="text-slate-500 text-lg font-medium">Descubre destinos únicos en todo el departamento</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-72 space-y-8 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-primary/10 shadow-sm sticky top-28">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-black text-xl flex items-center gap-2">
                                    <Filter size={20} className="text-primary" /> Filtros
                                </h3>
                                <button
                                    onClick={() => { setSelectedCategory('Todos'); setSearchQuery('') }}
                                    className="text-xs text-primary font-bold uppercase tracking-wider hover:underline"
                                >
                                    Limpiar
                                </button>
                            </div>

                            <div className="mb-10">
                                <h4 className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-4">Categorías</h4>
                                <div className="flex flex-col gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`text-left px-4 py-3 rounded-xl transition-all font-bold ${selectedCategory === cat
                                                    ? 'bg-primary text-slate-900 shadow-lg shadow-primary/20'
                                                    : 'hover:bg-primary/5 text-slate-600 dark:text-slate-400'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-4">Región</h4>
                                <div className="space-y-3">
                                    {['Altiplano', 'Yungas', 'Cordillera', 'Valles'].map(region => (
                                        <label key={region} className="flex items-center gap-3 text-sm font-bold cursor-pointer group">
                                            <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 dark:border-slate-800 text-primary focus:ring-primary bg-transparent" />
                                            <span className="group-hover:text-primary transition-colors">{region}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden h-64 group">
                            <img
                                src="https://images.unsplash.com/photo-1549419163-9524e9956417?q=80&w=1974&auto=format&fit=crop"
                                alt="Promo"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <p className="text-xs font-black uppercase tracking-[0.2em] mb-2">Oferta Especial</p>
                                <h4 className="text-2xl font-black leading-tight mb-4">Ahorra 20% en Tours al Lago</h4>
                                <button className="bg-white text-slate-900 px-6 py-2 rounded-xl text-sm font-black w-fit hover:scale-105 transition-transform">
                                    Ver Cupón
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row gap-6 mb-10">
                            <div className="relative flex-1">
                                <SearchIcon size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar destinos, actividades..."
                                    className="w-full pl-16 pr-6 py-5 bg-white dark:bg-slate-900 border border-primary/5 rounded-2xl focus:ring-2 focus:ring-primary shadow-sm font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-5 rounded-2xl border border-primary/5 shadow-sm">
                                <span className="text-sm font-bold text-slate-400 whitespace-nowrap">Ordenar por:</span>
                                <select className="bg-transparent border-none focus:ring-0 font-bold text-slate-900 dark:text-white cursor-pointer min-w-[120px]">
                                    <option>Popularidad</option>
                                    <option>Precio: Bajo</option>
                                    <option>Precio: Alto</option>
                                    <option>Rating</option>
                                </select>
                            </div>
                        </div>

                        {filteredDestinations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
                                {filteredDestinations.map((dest, i) => (
                                    <motion.div
                                        key={dest.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className="card group h-full flex flex-col"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={dest.image}
                                                alt={dest.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-lg transition-colors">
                                                <span className="material-icons text-xl">favorite_border</span>
                                            </button>
                                            <div className="absolute bottom-6 left-6 flex gap-2">
                                                <span className="bg-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase text-slate-900 shadow-sm">
                                                    {dest.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex-grow flex flex-col">
                                            <div className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                                                <MapPin size={12} className="text-primary" />
                                                {dest.location}
                                            </div>
                                            <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors line-clamp-1">
                                                {dest.name}
                                            </h3>
                                            <div className="flex items-center gap-1 mb-6">
                                                <Star size={14} className="fill-orange-400 text-orange-400" />
                                                <span className="font-bold text-sm">{dest.rating}</span>
                                                <span className="text-slate-400 text-xs ml-1">(24 reviews)</span>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 flex-grow line-clamp-2">
                                                {dest.shortDescription}
                                            </p>
                                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Desde</span>
                                                    <span className="text-2xl font-black text-slate-900 dark:text-white">${dest.price}</span>
                                                </div>
                                                <Link
                                                    to={`/destination/${dest.id}`}
                                                    className="w-14 h-14 bg-primary text-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <ArrowRight size={24} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-40">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <X size={40} className="text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black mb-2">No se encontraron destinos</h3>
                                <p className="text-slate-500">Intenta con otra categoría o término de búsqueda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
