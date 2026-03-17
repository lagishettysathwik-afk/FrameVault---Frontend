
import { useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import './TrailerModal.css'

function TrailerModal({ trailerLink, title, onClose }) {

    function getYoutubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    const videoId = trailerLink ? getYoutubeId(trailerLink) : null

    useEffect(function() {
        function handleKey(e) {
            if (e.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'

        return function() {
            window.removeEventListener('keydown', handleKey)
            document.body.style.overflow = 'unset'
        }
    }, [onClose])

    return (
        <AnimatePresence>
            <motion.div
                className="tm-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
            >

                {/* BLURRED BG POSTER */}
                <div className="tm-bg-blur"></div>

                <motion.div
                    className="tm-card"
                    initial={{ scale: 0.88, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.88, opacity: 0, y: 40 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* CLOSE BUTTON */}
                    <button className="tm-close" onClick={onClose}>✕</button>

                    {/* VIDEO */}
                    <div className="tm-video-wrap">

                        {videoId ? (
                            <iframe
                                className="tm-iframe"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="tm-error">
                                <span>🎬</span>
                                <p>Trailer unavailable</p>
                            </div>
                        )}

                        {/* SHIMMER LOADING */}
                        <div className="tm-shimmer"></div>

                    </div>

                    {/* INFO */}
                    <div className="tm-info">

                        <div className="tm-info-left">
                            <p className="tm-label">Official Trailer</p>
                            <h3 className="tm-title">{title}</h3>
                        </div>

                        <div className="tm-info-right">
                            <div className="tm-now-playing">
                                <span className="tm-live-dot"></span>
                                <span>Now Playing</span>
                            </div>
                        </div>

                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="tm-actions">

                        <a
                            href={trailerLink}
                            target="_blank"
                            rel="noreferrer"
                            className="tm-yt-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            ↗ Watch on YouTube
                        </a>

                        <button
                            className="tm-close-btn"
                            onClick={onClose}
                        >
                            Close
                        </button>

                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default TrailerModal

