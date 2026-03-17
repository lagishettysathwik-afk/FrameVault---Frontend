import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ onSignIn, user, onLogout }) {
    const [search, setSearch] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(function() {
        function handleScroll() { setScrolled(window.scrollY > 60) }
        window.addEventListener('scroll', handleScroll)
        return function() { window.removeEventListener('scroll', handleScroll) }
    }, [])

    useEffect(function() {
        function handleClickOutside(e) {
            if (!e.target.closest('.hdr__user')) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return function() { document.removeEventListener('click', handleClickOutside) }
    }, [])

    function handleSearch(e) {
        e.preventDefault()
        if (search.trim()) {
            navigate('/?search=' + search)
            setSearch('')
        }
    }

    function scrollToFilms() {
        const filmsSection = document.querySelector('.films')
        if (filmsSection) {
            filmsSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    function handleDiscover() {
        if (location.pathname === '/') {
            scrollToFilms()
        } else {
            navigate('/')
            setTimeout(scrollToFilms, 300)
        }
    }

    function handleCollections(genre) {
        if (location.pathname === '/') {
            window.dispatchEvent(new CustomEvent('setGenre', { detail: genre }))
            scrollToFilms()
        } else {
            navigate('/?genre=' + genre)
            setTimeout(scrollToFilms, 300)
        }
    }

    function handleCritics() {
        if (location.pathname === '/') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        } else {
            navigate('/')
            setTimeout(function() {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }, 300)
        }
    }

    return (
        <header className={'hdr ' + (scrolled ? 'hdr--scrolled' : '')}>
            <div className="hdr__inner">

                <Link to="/" className="hdr__logo">
                    <div className="hdr__logo-mark">F</div>
                    <div className="hdr__logo-text">
                        <span className="hdr__logo-main">FRAMEVAULT</span>
                        <span className="hdr__logo-tagline">Cinema Collection</span>
                    </div>
                </Link>

                <form className="hdr__search" onSubmit={handleSearch}>
                    <span className="hdr__search-icon">◎</span>
                    <input
                        type="text"
                        placeholder="Search films..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>

                <nav className="hdr__nav">

                    <button className="hdr__nav-link" onClick={handleDiscover}>
                        Discover
                    </button>

                    <div className="hdr__nav-dropdown">
                        <button className="hdr__nav-link">
                            Collections ▾
                        </button>
                        <div className="hdr__nav-dropdown-menu">
                            <button onClick={() => handleCollections('Action')}>Action</button>
                            <button onClick={() => handleCollections('Drama')}>Drama</button>
                            <button onClick={() => handleCollections('Sci-Fi')}>Sci-Fi</button>
                            <button onClick={() => handleCollections('Thriller')}>Thriller</button>
                            <button onClick={() => handleCollections('Comedy')}>Comedy</button>
                            <button onClick={() => handleCollections('Romance')}>Romance</button>
                            <button onClick={() => handleCollections('Fantasy')}>Fantasy</button>
                            <button onClick={() => handleCollections('Animation')}>Animation</button>
                            <button onClick={() => handleCollections('Western')}>Western</button>
                        </div>
                    </div>

                    <button className="hdr__nav-link" onClick={handleCritics}>
                        Critics
                    </button>

                    {user ? (
                        <div className="hdr__user">
                            <button
                                className="hdr__user-btn"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className="hdr__user-avatar">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="hdr__username">{user.username}</span>
                                <span className="hdr__chevron">▾</span>
                            </button>

                            {dropdownOpen && (
                                <div className="hdr__dropdown">
                                    <div className="hdr__dropdown-header">
                                        <p className="hdr__dropdown-name">{user.username}</p>
                                        <p className="hdr__dropdown-email">{user.email}</p>
                                    </div>
                                    <div className="hdr__dropdown-divider"></div>
                                    <button className="hdr__dropdown-item">♡ Watchlist</button>
                                    <button className="hdr__dropdown-item">★ My Reviews</button>
                                    <button className="hdr__dropdown-item">◎ Profile</button>
                                    <div className="hdr__dropdown-divider"></div>
                                    <button
                                        className="hdr__dropdown-item hdr__dropdown-item--logout"
                                        onClick={() => {
                                            setDropdownOpen(false)
                                            onLogout()
                                        }}
                                    >
                                        ← Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="hdr__cta" onClick={onSignIn}>
                            Sign In
                        </button>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header