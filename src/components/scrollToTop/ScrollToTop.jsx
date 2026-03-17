import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
    const location = useLocation()

    useEffect(function() {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [location.pathname])

    return null
}

export default ScrollToTop