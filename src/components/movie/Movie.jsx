import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import api from '../../api/axiosConfig'
import Reviews from '../reviews/Reviews'
import PageTransition from '../transition/PageTransition'
import TrailerModal from '../trailerModal/TrailerModal'
import './Movie.css'

function Movie() {
    const params = useParams()
    const [movie, setMovie] = useState(null)
    const [showTrailer, setShowTrailer] = useState(false)

    useEffect(function() {
        api.get('/movies/' + params.imdbId)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err))
    }, [])

    if (!movie) {
        return (
            <PageTransition>
                <div className="detail-loading">
                    <div className="detail-loader"></div>
                    <p>Loading film...</p>
                </div>
            </PageTransition>
        )
    }

    return (
        <PageTransition>
            <div className="detail">

                {showTrailer && (
                    <TrailerModal
                        trailerLink={movie.trailerLink}
                        title={movie.title}
                        onClose={() => setShowTrailer(false)}
                    />
                )}

                {/* CINEMATIC BG */}
                <div className="detail__bg">
                    <img src={movie.poster} alt="" className="detail__bg-img" />
                    <div className="detail__bg-overlay"></div>
                    <div className="detail__bg-grain"></div>
                </div>

                <div className="detail__inner">

                    <Link to="/" className="detail__back">
                        ← Back to Collection
                    </Link>

                    <motion.div
                        className="detail__showcase"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* POSTER */}
                        <div className="detail__poster-col">
                            <div className="detail__poster-wrap">
                                <img src={movie.poster} alt={movie.title} className="detail__poster" />
                                <div className="detail__poster-frame"></div>
                            </div>
                            <button className="detail__trailer-btn" onClick={() => setShowTrailer(true)}>
                                <span className="detail__trailer-play">▶</span>
                                Watch Trailer
                            </button>
                            <div className="detail__poster-actions">
                                <button className="detail__icon-btn">❤</button>
                                <button className="detail__icon-btn">⭐</button>
                                <button className="detail__icon-btn">📋</button>
                                <button className="detail__icon-btn">🔗</button>
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="detail__info">
                            <div className="detail__eyebrow">
                                <span className="detail__dot"></span>
                                <span>Now in Collection</span>
                                <span className="detail__eyebrow-line"></span>
                            </div>

                            <h1 className="detail__title">{movie.title}</h1>

                            <div className="detail__meta">
                                <span className="detail__genre-badge">{movie.genre}</span>
                                <span className="detail__meta-sep">·</span>
                                <span className="detail__year">{movie.releaseDate}</span>
                                <span className="detail__meta-sep">·</span>
                                <span className="detail__rating">PG-13</span>
                            </div>

                            {/* SCORES */}
                            <div className="detail__scores">
                                <div className="detail__score-item">
                                    <div className="detail__score-ring gold">
                                        <svg viewBox="0 0 60 60">
                                            <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="3"/>
                                            <circle cx="30" cy="30" r="25" fill="none" stroke="#c9a84c" strokeWidth="3"
                                                strokeDasharray="157" strokeDashoffset="20"
                                                strokeLinecap="round" transform="rotate(-90 30 30)"/>
                                        </svg>
                                        <span>87<sub>%</sub></span>
                                    </div>
                                    <p>Critics</p>
                                </div>
                                <div className="detail__score-item">
                                    <div className="detail__score-ring green">
                                        <svg viewBox="0 0 60 60">
                                            <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(0,200,100,0.15)" strokeWidth="3"/>
                                            <circle cx="30" cy="30" r="25" fill="none" stroke="#00c864" strokeWidth="3"
                                                strokeDasharray="157" strokeDashoffset="12"
                                                strokeLinecap="round" transform="rotate(-90 30 30)"/>
                                        </svg>
                                        <span>92<sub>%</sub></span>
                                    </div>
                                    <p>Audience</p>
                                </div>
                                <div className="detail__score-item">
                                    <div className="detail__score-ring red">
                                        <svg viewBox="0 0 60 60">
                                            <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(230,57,70,0.15)" strokeWidth="3"/>
                                            <circle cx="30" cy="30" r="25" fill="none" stroke="#e63946" strokeWidth="3"
                                                strokeDasharray="157" strokeDashoffset="40"
                                                strokeLinecap="round" transform="rotate(-90 30 30)"/>
                                        </svg>
                                        <span>74</span>
                                    </div>
                                    <p>Metascore</p>
                                </div>
                            </div>

                            {/* FACTS */}
                            <div className="detail__facts">
                                <div className="detail__fact">
                                    <span className="detail__fact-key">Release</span>
                                    <span className="detail__fact-val">{movie.releaseDate}</span>
                                </div>
                                <div className="detail__fact">
                                    <span className="detail__fact-key">Genre</span>
                                    <span className="detail__fact-val">{movie.genre || 'Drama'}</span>
                                </div>
                                <div className="detail__fact">
                                    <span className="detail__fact-key">Rating</span>
                                    <span className="detail__fact-val">PG-13</span>
                                </div>
                                <div className="detail__fact">
                                    <span className="detail__fact-key">Language</span>
                                    <span className="detail__fact-val">English</span>
                                </div>
                                <div className="detail__fact">
                                    <span className="detail__fact-key">Status</span>
                                    <span className="detail__fact-val detail__fact-val--released">✓ Released</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* REVIEWS */}
                    <motion.div
                        className="detail__reviews"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Reviews imdbId={params.imdbId} reviews={movie.reviews} />
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}

export default Movie