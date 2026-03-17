import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Movie from './components/movie/Movie'
import Footer from './components/footer/Footer'
import SignInModal from './components/signin/SignInModal'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import './App.css'

function App() {
    const [showSignIn, setShowSignIn] = useState(false)
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )

    function handleLoginSuccess(data) {
        const userData = { username: data.username, email: data.email }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', data.token)
    }

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <Router>
            <ScrollToTop />
            {showSignIn && (
                <SignInModal
                    onClose={() => setShowSignIn(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
            <Header
                onSignIn={() => setShowSignIn(true)}
                user={user}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:imdbId" element={<Movie />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App