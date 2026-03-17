import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import api from '../../api/axiosConfig'
import './SignInModal.css'

function SignInModal({ onClose, onLoginSuccess }) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        if (!email || !password) {
            setError('Please fill all fields')
            return
        }
        if (isSignUp && !username) {
            setError('Please enter a username')
            return
        }

        setLoading(true)
        setError('')

        try {
            const endpoint = isSignUp ? '/auth/register' : '/auth/login'
            const payload = isSignUp
                ? { username, email, password }
                : { email, password }

            const res = await api.post(endpoint, payload)

            // Save token and user to localStorage
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify({
                username: res.data.username,
                email: res.data.email
            }))

            if (onLoginSuccess) onLoginSuccess(res.data)
            onClose()

        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            className="smodal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="smodal"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
            >
                <button className="smodal__close" onClick={onClose}>✕</button>

                <div className="smodal__top">
                    <div className="smodal__icon">F</div>
                    <h2 className="smodal__heading">
                        {isSignUp ? 'Join FrameVault' : 'Welcome Back'}
                    </h2>
                    <p className="smodal__sub">
                        {isSignUp ? 'Your cinematic journey begins here' : 'Sign in to continue'}
                    </p>
                </div>

                <div className="smodal__tabs">
                    <button
                        className={'smodal__tab ' + (!isSignUp ? 'active' : '')}
                        onClick={() => { setIsSignUp(false); setError('') }}
                    >Sign In</button>
                    <button
                        className={'smodal__tab ' + (isSignUp ? 'active' : '')}
                        onClick={() => { setIsSignUp(true); setError('') }}
                    >Create Account</button>
                </div>

                <div className="smodal__fields">
                    {isSignUp && (
                        <div className="smodal__field">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="filmcritic42"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="smodal__field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="smodal__field">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="smodal__error">
                        ⚠ {error}
                    </div>
                )}

                <button
                    className={'smodal__cta ' + (loading ? 'loading' : '')}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : (isSignUp ? 'Create Account →' : 'Sign In →')}
                </button>

                <p className="smodal__switch">
                    {isSignUp ? 'Already a member? ' : 'New to FrameVault? '}
                    <span onClick={() => { setIsSignUp(!isSignUp); setError('') }}>
                        {isSignUp ? 'Sign in' : 'Create account'}
                    </span>
                </p>
            </motion.div>
        </motion.div>
    )
}

export default SignInModal