import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
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

    // Fetch movies
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true)

        api.get('/movies')
            .then((res) => {
                const validMovies = (res.data || []).filter(m => m && m.title)

                setMovies(validMovies)

                if (validMovies.length > 0) {
                    setFeatured(validMovies[0])
                }

                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    // URL params
    useEffect(() => {
        const genreParam = searchParams.get('genre')
        const searchParam = searchParams.get('search')
        const languageParam = searchParams.get('language')

        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (genreParam) setActiveGenre(genreParam)
        if (searchParam) setSearch(searchParam)
        if (languageParam) setActiveLanguage(languageParam)
    }, [searchParams])

    // Genre event
    useEffect(() => {
        const handleSetGenre = (e) => setActiveGenre(e.detail)

        window.addEventListener('setGenre', handleSetGenre)
        return () => window.removeEventListener('setGenre', handleSetGenre)
    }, [])

    // ✅ SAFE FILTER
    const filtered = movies.filter((movie) => {
        const title = (movie.title || "").toLowerCase()
        const genre = movie.genre || ""
        const language = (movie.language || "").toLowerCase().trim()

        const matchSearch = title.includes(search.toLowerCase())
        const matchGenre = activeGenre === 'All' || genre === activeGenre
        const matchLanguage =
            activeLanguage === 'All' ||
            language === activeLanguage.toLowerCase().trim()

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
                        </div>

                        <div className="hero__content">
                            <h1>{featured.title}</h1>
                            <p>{featured.genre} · {featured.releaseDate}</p>

                            <div>
                                <Link to={`/movie/${featured.imdbId}`}>
                                    View Film
                                </Link>

                                <button onClick={() => setShowTrailer(true)}>
                                    Watch Trailer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="films">

                    <div className="films__header">
                        <h2>The Collection</h2>
                        <p>{filtered.length} films curated</p>

                        <input
                            type="text"
                            placeholder="Search films..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Language Filter */}
                    <div className="films__languages">
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                className={activeLanguage === lang ? 'active' : ''}
                                onClick={() => {
                                    setActiveLanguage(lang)
                                    setActiveGenre('All')
                                }}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    {/* Genre Filter */}
                    <div className="films__genres">
                        {genres.map((g) => (
                            <button
                                key={g}
                                className={activeGenre === g ? 'active' : ''}
                                onClick={() => setActiveGenre(g)}
                            >
                                {g}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="films__grid">
                            {Array(6).fill(0).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="films__empty">
                            <p>No films found</p>
                        </div>
                    ) : (
                        <div className="films__grid">
                            {filtered.map((movie) => (
                                <MovieList key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </PageTransition>
    )
}

export default Home