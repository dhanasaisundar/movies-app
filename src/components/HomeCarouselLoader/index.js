import Loader from 'react-loader-spinner'

const HomeCarouselLoader = () => (
  <div className="home-loader-container" testid="loader">
    <Loader
      type="TailSpin"
      color="#D81F26"
      height={50}
      width={70}
      fontWeight="bold"
    />
  </div>
)

export default HomeCarouselLoader
