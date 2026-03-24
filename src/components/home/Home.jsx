/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../../api/axiosConfig'
import MovieList from '../movieList/MovieList'
import SkeletonCard from '../skeleton/SkeletonCard'
import PageTransition from '../transition/PageTransition'
import TrailerModal from '../trailerModal/TrailerModal'
import './Home.css'

const genres = ['All', 'Action', 'Drama', 'Sci-Fi', 'Thriller', 'Comedy', 'Romance', 'Fantasy', 'Western', 'Animation']
const languages = ['All', 'English', 'Hindi', 'Telugu', 'Anime']

function Home() {
    const [movies, setMovies] = useState([])
    const [activeGenre, setActiveGenre] = useState('All')
    const [activeLanguage, setActiveLanguage] = useState('All')
    const [search, setSearch] = useState('')
    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showTrailer, setShowTrailer] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(function() {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)
        api.get('/movies')
        .then(function(res) {
            setMovies(res.data)
            if (res.data.length > 0) setFeatured(res.data[0])
            setLoading(false)
        })
        .catch(function(err) {
            console.log(err)
            setLoading(false)
        })
    }, [])

    useEffect(function() {
        const genreParam    = searchParams.get('genre')
        const searchParam   = searchParams.get('search')
        const languageParam = searchParams.get('language')
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (genreParam)    setActiveGenre(genreParam)
        if (searchParam)   setSearch(searchParam)
        if (languageParam) setActiveLanguage(languageParam)
    }, [searchParams])

    useEffect(function() {
        function handleSetGenre(e) {
            setActiveGenre(e.detail)
        }
        window.addEventListener('setGenre', handleSetGenre)
        return function() {
            window.removeEventListener('setGenre', handleSetGenre)
        }
    }, [])

    const filtered = movies.filter(function(movie) {
        const matchSearch   = movie.title.toLowerCase().includes(search.toLowerCase())
        const matchGenre    = activeGenre === 'All' || movie.genre === activeGenre
        const matchLanguage = activeLanguage === 'All' ||
                              (movie.language && movie.language.trim() === activeLanguage.trim())
        return matchSearch && matchGenre && matchLanguage
    })

    return (
        <PageTransition>
            <div className="home">

                {showTrailer && featured && (
                    <TrailerModal
                        trailerLink={featured.trailerLink}
                        title={featured.title}
                        onClose={() => setShowTrailer(false)}
                    />
                )}

                {featured && (
                    <div className="hero">
                        <div className="hero__bg">
                            <img src={featured.poster} alt={featured.title} />
                            <div className="hero__bg-overlay"></div>
                            <div className="hero__bg-grain"></div>
                            <div className="hero__bg-vignette"></div>
                        </div>

                        <div className="hero__filmstrip">
                            {Array(20).fill(0).map(function(_, i) {
                                return <div key={i} className="hero__filmhole"></div>
                            })}
                        </div>

                        <div className="hero__content">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                style={{ willChange: 'opacity' }}
                            >
                                <div className="hero__eyebrow">
                                    <span className="hero__pulse-dot"></span>
                                    <span>Featured Film</span>
                                    <span className="hero__eyebrow-line"></span>
                                </div>

                                <h1 className="hero__title">
                                    {featured.title.split(' ').map(function(word, i) {
                                        return (
                                            <motion.span
                                                key={i}
                                                className="hero__title-word"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                                                style={{ willChange: 'opacity, transform' }}
                                            >
                                                {word}
                                            </motion.span>
                                        )
                                    })}
                                </h1>

                                <div className="hero__meta">
                                    <span className="hero__genre-badge">{featured.genre}</span>
                                    <span className="hero__meta-sep">·</span>
                                    <span className="hero__year">{featured.releaseDate}</span>
                                </div>

                                <div className="hero__actions">
                                    <Link to={'/movie/' + featured.imdbId} className="hero__btn-primary">
                                        View Film
                                    </Link>
                                    <button className="hero__btn-secondary" onClick={() => setShowTrailer(true)}>
                                        <span className="hero__play-circle">▶</span>
                                        Watch Trailer
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        <div className="hero__scroll-hint">
                            <div className="hero__scroll-line"></div>
                            <span>Scroll to explore</span>
                        </div>

                        <motion.div
                            className="hero__stats"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <div className="hero__stat">
                                <span className="hero__stat-num">87<sub>%</sub></span>
                                <span className="hero__stat-lbl">Critics</span>
                            </div>
                            <div className="hero__stat-div"></div>
                            <div className="hero__stat">
                                <span className="hero__stat-num">92<sub>%</sub></span>
                                <span className="hero__stat-lbl">Audience</span>
                            </div>
                            <div className="hero__stat-div"></div>
                            <div className="hero__stat">
                                <span className="hero__stat-num">74</span>
                                <span className="hero__stat-lbl">Meta</span>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* FILMS SECTION */}
                <div className="films">
                    <div className="films__header">
                        <div className="films__title-wrap">
                            <h2 className="films__title">The Collection</h2>
                            <p className="films__subtitle">{filtered.length} films curated</p>
                        </div>
                        <div className="films__search">
                            <span>◎</span>
                            <input
                                type="text"
                                placeholder="Filter titles..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* LANGUAGE FILTER */}
                    <div className="films__languages">
                        {languages.map(function(lang) {
                            return (
                                <button
                                    key={lang}
                                    className={'films__language ' + (activeLanguage === lang ? 'active' : '')}
                                    onClick={() => {
                                        setActiveLanguage(lang)
                                        setActiveGenre('All')
                                    }}
                                >
                                    {lang}
                                </button>
                            )
                        })}
                    </div>

                    {/* GENRE FILTER */}
                    <div className="films__genres">
                        {genres.map(function(g) {
                            return (
                                <button
                                    key={g}
                                    className={'films__genre ' + (activeGenre === g ? 'active' : '')}
                                    onClick={() => setActiveGenre(g)}
                                >
                                    {g}
                                </button>
                            )
                        })}
                    </div>

                    {loading ? (
                        <div className="films__grid">
                            {Array(12).fill(0).map(function(_, i) {
                                return <SkeletonCard key={i} />
                            })}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="films__empty">
                            <p>No films found</p>
                        </div>
                    ) : (
                        <div className="films__grid">
                            {filtered.map(function(movie, i) {
                                return (
                                    <motion.div
                                        key={movie.id}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, margin: '-30px' }}
                                        transition={{ duration: 0.3 }}
                                        style={{ willChange: 'opacity' }}
                                    >
                                        <MovieList movie={movie} />
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </div>

            </div>
        </PageTransition>
    )
}

export default Home