import { useState } from 'react'
import api from '../../api/axiosConfig'
import './Reviews.css'

function Reviews(props) {
    const [reviewBody, setReviewBody] = useState('')
    const [reviews, setReviews] = useState(props.reviews || [])
    const [likes, setLikes] = useState({})
    const [selectedStar, setSelectedStar] = useState(0)
    const [hoverStar, setHoverStar] = useState(0)
    const [reviewRatings, setReviewRatings] = useState({})

    function submitReview() {
        if (!reviewBody.trim()) return
        api.post('/reviews', { reviewBody, imdbId: props.imdbId })
        .then(res => {
            const newIndex = reviews.length
            setReviews([...reviews, res.data])
            setReviewRatings(prev => ({...prev, [newIndex]: selectedStar}))
            setReviewBody('')
            setSelectedStar(0)
        })
        .catch(err => console.log(err))
    }

    function getStarLabel(num) {
        const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Masterpiece']
        return labels[num] || ''
    }

    return (
        <div className="rv">
            <div className="rv__head">
                <div className="rv__head-left">
                    <h2 className="rv__title">Audience Reviews</h2>
                    <p className="rv__subtitle">Share your verdict on this film</p>
                </div>
                <div className="rv__count-badge">
                    <span className="rv__count-num">{reviews.length}</span>
                    <span className="rv__count-lbl">Reviews</span>
                </div>
            </div>

            {/* WRITE REVIEW */}
            <div className="rv__form">
                <div className="rv__form-header">
                    <div className="rv__form-avatar">✦</div>
                    <div className="rv__form-meta">
                        <p className="rv__form-title">Write a Review</p>
                        <p className="rv__form-sub">Your opinion matters</p>
                    </div>
                </div>

                {/* STAR RATING */}
                <div className="rv__rating-wrap">
                    <div className="rv__stars">
                        {[1,2,3,4,5].map(function(s) {
                            const isActive = hoverStar > 0 ? s <= hoverStar : s <= selectedStar
                            return (
                                <button
                                    key={s}
                                    className={'rv__star-btn ' + (isActive ? 'active' : '')}
                                    onMouseEnter={() => setHoverStar(s)}
                                    onMouseLeave={() => setHoverStar(0)}
                                    onClick={() => {
                                        setSelectedStar(s)
                                        setHoverStar(0)
                                    }}
                                    type="button"
                                >
                                    ★
                                </button>
                            )
                        })}
                    </div>
                    {(hoverStar > 0 || selectedStar > 0) && (
                        <span className="rv__star-label">
                            {getStarLabel(hoverStar > 0 ? hoverStar : selectedStar)}
                        </span>
                    )}
                </div>

                <textarea
                    className="rv__textarea"
                    placeholder="What did you think of this film? Share your thoughts..."
                    value={reviewBody}
                    onChange={e => setReviewBody(e.target.value)}
                    rows={4}
                    maxLength={500}
                />

                <div className="rv__form-footer">
                    <div className="rv__chars-wrap">
                        <div
                            className="rv__chars-bar"
                            style={{ width: (reviewBody.length / 500 * 100) + '%' }}
                        ></div>
                        <span className="rv__chars">{reviewBody.length} / 500</span>
                    </div>
                    <button
                        className={'rv__submit ' + (reviewBody.trim() ? 'ready' : '')}
                        onClick={submitReview}
                        disabled={!reviewBody.trim()}
                    >
                        Publish Review →
                    </button>
                </div>
            </div>

            {/* REVIEWS LIST */}
            <div className="rv__list">
                {reviews.length > 0 ? reviews.map(function(review, i) {
                    const rating = reviewRatings[i] || 0
                    return (
                        <div key={i} className="rv__item">
                            <div className="rv__item-side">
                                <div className="rv__item-avatar">
                                    {String.fromCharCode(65 + (i % 26))}
                                </div>
                                <div className="rv__item-stars">
                                    {[1,2,3,4,5].map(function(s) {
                                        return (
                                            <span
                                                key={s}
                                                className={'rv__item-star ' + (s <= rating ? 'on' : '')}
                                            >
                                                ★
                                            </span>
                                        )
                                    })}
                                </div>
                                {rating > 0 && (
                                    <span className="rv__item-rating">{rating}.0</span>
                                )}
                            </div>
                            <div className="rv__item-main">
                                <div className="rv__item-header">
                                    <span className="rv__item-user">Critic {i + 1}</span>
                                    <span className="rv__item-time">Just now</span>
                                </div>
                                <p className="rv__item-text">{review.body}</p>
                                <div className="rv__item-footer">
                                    <button
                                        className="rv__vote"
                                        onClick={() => setLikes(p => ({...p, [i]: (p[i]||0)+1}))}
                                    >
                                        ↑ Helpful {likes[i] > 0 && <span className="rv__vote-count">{likes[i]}</span>}
                                    </button>
                                    {rating > 0 && (
                                        <span className="rv__item-label">
                                            {getStarLabel(rating)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }) : (
                    <div className="rv__empty">
                        <div className="rv__empty-icon">✦</div>
                        <p className="rv__empty-title">No reviews yet</p>
                        <p className="rv__empty-sub">Be the first critic — share your verdict above</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Reviews