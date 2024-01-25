import Header from '../Header'

const HomeBannerFailureView = props => {
  const {handleTryAgainButton} = props
  return (
    <div className="loading-bg">
      <Header />
      <div className="upper-section-bg-dark">
        <div className="home-upper-loader-container">
          <img
            src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1699635454/alert-triangle_cvqiy1.svg"
            alt="failure view"
            className="home-failure-view-image"
          />
          <p className="failure-view-text">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="try-again-btn"
            onClick={() => handleTryAgainButton()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeBannerFailureView
