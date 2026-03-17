import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <footer className="ftr">
            <div className="ftr__top">
                <div className="ftr__brand">
                    <div className="ftr__logo">
                        <div className="ftr__logo-mark">F</div>
                        <div>
                            <span className="ftr__logo-main">FRAMEVAULT</span>
                            <span className="ftr__logo-sub">Cinema Collection</span>
                        </div>
                    </div>
                    <p>The most immersive film discovery experience. Crafted with passion by a student developer.</p>
                    <div className="ftr__socials">
                        <span>𝕏</span>
                        <span>in</span>
                        <span>▶</span>
                        <span>◎</span>
                    </div>
                </div>
                <div className="ftr__col">
                    <h4>Discover</h4>
                    <Link to="/">Popular Films</Link>
                    <Link to="/">Top Rated</Link>
                    <Link to="/">New Releases</Link>
                    <Link to="/">Coming Soon</Link>
                </div>
                <div className="ftr__col">
                    <h4>Genres</h4>
                    <a href="#">Action</a>
                    <a href="#">Drama</a>
                    <a href="#">Sci-Fi</a>
                    <a href="#">Thriller</a>
                    <a href="#">Comedy</a>
                </div>
                <div className="ftr__col">
                    <h4>Community</h4>
                    <a href="#">Write a Review</a>
                    <a href="#">Create a List</a>
                    <a href="#">Join Members</a>
                    <a href="#">Discussions</a>
                </div>
            </div>
            <div className="ftr__bottom">
                <p>© 2025 FrameVault — Built by a student 🎬</p>
                <div className="ftr__links">
                    <span>Privacy</span>
                    <span>Terms</span>
                    <span>About</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer