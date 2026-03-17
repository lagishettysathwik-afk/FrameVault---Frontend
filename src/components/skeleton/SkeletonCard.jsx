import './SkeletonCard.css'

function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-poster shimmer"></div>
            <div className="skeleton-info">
                <div className="skeleton-title shimmer"></div>
                <div className="skeleton-year shimmer"></div>
                <div className="skeleton-stars shimmer"></div>
            </div>
        </div>
    )
}

export default SkeletonCard