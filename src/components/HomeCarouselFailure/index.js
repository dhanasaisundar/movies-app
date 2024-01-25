const HomeCarouselFailure = props => {
  const {handleTryAgainButton} = props
  return (
    <div className="home-loader-container">
      <img
        src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1699635454/alert-triangle_cvqiy1.svg"
        alt="failure view"
        className="home-failure-view-image"
      />
      <p className="home-failure-view-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="home-try-again-btn"
        onClick={() => handleTryAgainButton()}
      >
        Try Again
      </button>
    </div>
  )
}

export default HomeCarouselFailure
