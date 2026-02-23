import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Search as SearchIcon, MapPin, Star, ArrowRight, X } from 'lucide-react'
import { destinations } from '../data/destinations'

const Explore = () => {
    const [searchParams] = useSearchParams()
    const initialCategory = searchParams.get('cat') || 'Todos'
    const initialQuery = searchParams.get('query') || ''

    // Normalize category to match our internal category names if needed
    const normalizedInitial = initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)

    const [selectedCategory, setSelectedCategory] = useState(normalizedInitial)
    const [searchQuery, setSearchQuery] = useState(initialQuery)

    // Synchronize with URL if it changes while on the page
    useEffect(() => {
        const cat = searchParams.get('cat')
        if (cat) {
            setSelectedCategory(cat.charAt(0).toUpperCase() + cat.slice(1))
        } else {
            setSelectedCategory('Todos')
        }

        const queryValue = searchParams.get('query')
        if (queryValue) {
            setSearchQuery(queryValue)
        } else {
            setSearchQuery('')
        }
    }, [searchParams])

    const categories = ['Todos', 'Naturaleza', 'Lago', 'Historia', 'Aventura', 'Ciudad', 'Transporte']

    const removeAccents = (str) => {
        return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
    }

    const filteredDestinations = destinations.filter(dest => {
        const matchesCategory = selectedCategory === 'Todos' ||
            dest.category.toLowerCase() === selectedCategory.toLowerCase()

        const normalizedQuery = removeAccents(searchQuery.toLowerCase());
        const matchesSearch = removeAccents((dest.name || '').toLowerCase()).includes(normalizedQuery) ||
            removeAccents((dest.location || '').toLowerCase()).includes(normalizedQuery) ||
            removeAccents((dest.department || '').toLowerCase()).includes(normalizedQuery)

        return matchesCategory && matchesSearch
    })

    return (
        <div className="pt-32 pb-20 bg-background-light dark:bg-background-dark min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-5xl font-black mb-4">Explora Bolivia</h1>
                    <p className="text-slate-500 text-lg font-medium">Descubre destinos únicos en los 9 departamentos</p>
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
                                            className={`text-left px-4 py-3 rounded-xl transition-all font-bold ${selectedCategory.toLowerCase() === cat.toLowerCase()
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
                                    {['Altiplano', 'Amazonía', 'Valles', 'Llanos'].map(region => (
                                        <label key={region} className="flex items-center gap-3 text-sm font-bold cursor-pointer group">
                                            <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 dark:border-slate-800 text-primary focus:ring-primary bg-transparent" />
                                            <span className="group-hover:text-primary transition-colors">{region}</span>
                                        </label>
                                    ))}
                                </div>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {filteredDestinations.map((dest, i) => (
                                    <motion.div
                                        key={dest.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="card group h-full flex flex-col"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={dest.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'}
                                                alt={dest.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-900 shadow-sm">
                                                    {dest.department}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-900 shadow-sm">
                                                    {dest.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
                                                <MapPin size={12} className="text-primary" />
                                                {dest.location}
                                            </div>
                                            <h3 className="text-xl font-black mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                                {dest.name}
                                            </h3>
                                            <div className="flex items-center gap-1 mb-4">
                                                <Star size={14} className="fill-orange-400 text-orange-400" />
                                                <span className="font-bold text-sm">{dest.rating}</span>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-2">
                                                {dest.shortDescription}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Desde</span>
                                                    <span className="text-xl font-black text-slate-900 dark:text-white">${dest.price}</span>
                                                </div>
                                                <Link
                                                    to={`/destination/${dest.id}`}
                                                    className="w-12 h-12 bg-primary text-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <ArrowRight size={20} />
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
                                <h3 className="text-2xl font-black mb-2">Sin resultados</h3>
                                <p className="text-slate-500">No encontramos destinos que coincidan con tu búsqueda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
