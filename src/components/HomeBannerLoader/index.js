import Loader from 'react-loader-spinner'
import Header from '../Header'

const HomeBannerLoader = () => (
  <div className="loading-bg">
    <Header />
    <div className="upper-section-bg-dark">
      <div className="home-upper-loader-container" testid="loader">
        <Loader
          type="TailSpin"
          color="#D81F26"
          height={50}
          width={70}
          fontWeight="bold"
        />
      </div>
    </div>
  </div>
)

export default HomeBannerLoader
