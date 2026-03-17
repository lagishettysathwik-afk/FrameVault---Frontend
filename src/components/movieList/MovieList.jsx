import { Link } from 'react-router-dom'

import './MovieList.css'

function MovieList({ movie }) {
    // eslint-disable-next-line react-hooks/purity
    const score = Math.floor(Math.random() * 25 + 75)
    const scoreColor = score >= 85 ? '#c9a84c' : score >= 70 ? '#e8c97a' : '#e63946'

    return (
        <Link to={'/movie/' + movie.imdbId} className="card">
            <div className="card__poster">
                <img src={movie.poster} alt={movie.title} className="card__img" />
                <div className="card__overlay">
                    <div className="card__overlay-content">
                        <div className="card__play">▶</div>
                        <span className="card__view">View Film</span>
                    </div>
                </div>
                <div className="card__score" style={{ color: scoreColor, borderColor: scoreColor }}>
                    {score}
                </div>
                {movie.genre && (
                    <div className="card__genre">{movie.genre}</div>
                )}
                <div className="card__shine"></div>
            </div>
            <div className="card__info">
                <h3 className="card__title">{movie.title}</h3>
                <p className="card__year">{movie.releaseDate?.split('-')[0]}</p>
                <div className="card__stars">
                    {[1,2,3,4,5].map(function(s) {
                        return (
                            <span key={s} className={'card__star ' + (s <= 4 ? 'on' : '')}>★</span>
                        )
                    })}
                </div>
            </div>
        </Link>
    )
}

export default MovieList