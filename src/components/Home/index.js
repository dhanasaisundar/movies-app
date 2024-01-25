import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import TrendingMovies from '../TrendingMovies'
import OriginalMovies from '../OriginalMovies'
import HomeBannerLoader from '../HomeBannerLoader'
import HomeBannerFailure from '../HomeBannerFailure'
import HomeCarouselLoader from '../HomeCarouselLoader'
import HomeCarouselFailure from '../HomeCarouselFailure'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function getUpdatedMoviesData(movies) {
  const updatedTrendingMovie = movies.map(movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    overview: movie.overview,
    posterPath: movie.poster_path,
    title: movie.title,
  }))

  return updatedTrendingMovie
}

class Home extends Component {
  state = {
    trendingMovies: [],
    originalMovies: [],
    apiStatus1: apiStatusConstants.initial,
    apiStatus2: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getOriginalMovies()
  }

  getTrendingMovies = async () => {
    this.setState({apiStatus1: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedTrendingMoviesData = getUpdatedMoviesData(data.results)
      this.setState({
        trendingMovies: updatedTrendingMoviesData,
        apiStatus1: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus1: apiStatusConstants.failure})
    }
  }

  getOriginalMovies = async () => {
    this.setState({apiStatus2: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedOriginalMovies = getUpdatedMoviesData(data.results)
      this.setState({
        originalMovies: updatedOriginalMovies,
        apiStatus2: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus2: apiStatusConstants.failure,
      })
    }
  }

  handleTryAgainTrending = () => {
    this.getTrendingMovies()
  }

  handleTryAgainOriginals = () => {
    this.getOriginalMovies()
  }

  homeBannerSection = () => {
    const {originalMovies} = this.state
    const lengthOfMovies = originalMovies.length - 1
    const randomIndex = Math.floor(Math.random() * lengthOfMovies)
    const movieData = originalMovies[randomIndex]
    const bannerBgImage = movieData && movieData.backdropPath
    const movieTitle = movieData && movieData.title
    const movieOverView = movieData && movieData.overview
    return (
      <div
        className="upper-section-bg"
        style={{
          backgroundImage: `url(${bannerBgImage}`,
        }}
      >
        <Header />
        <div className="banner-info">
          <h1 className="banner-heading">{movieTitle}</h1>
          <p className="banner-text">{movieOverView}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderHomeBannerSection = () => {
    const {apiStatus2} = this.state
    switch (apiStatus2) {
      case apiStatusConstants.success:
        return this.homeBannerSection()
      case apiStatusConstants.inProgress:
        return <HomeBannerLoader />
      case apiStatusConstants.failure:
        return (
          <HomeBannerFailure
            handleTryAgainButton={this.handleTryAgainOriginals}
          />
        )
      default:
        return null
    }
  }

  renderTrendingCarousel = () => {
    const {trendingMovies, apiStatus1} = this.state
    switch (apiStatus1) {
      case apiStatusConstants.success:
        return <TrendingMovies trendingMovies={trendingMovies} />
      case apiStatusConstants.inProgress:
        return <HomeCarouselLoader />
      case apiStatusConstants.failure:
        return (
          <HomeCarouselFailure
            handleTryAgainButton={this.handleTryAgainTrending}
          />
        )
      default:
        return null
    }
  }

  renderOriginalCarousel = () => {
    const {originalMovies, apiStatus2} = this.state
    switch (apiStatus2) {
      case apiStatusConstants.success:
        return <OriginalMovies originalMovies={originalMovies} />
      case apiStatusConstants.inProgress:
        return <HomeCarouselLoader />
      case apiStatusConstants.failure:
        return (
          <HomeCarouselFailure
            handleTryAgainButton={this.handleTryAgainOriginals}
          />
        )
      default:
        return null
    }
  }

  renderCarouselSection = () => (
    <div className="lower-section-bg">
      <h1 className="list-heading">Trending Now</h1>
      {this.renderTrendingCarousel()}
      <h1 className="list-heading">Originals</h1>
      {this.renderOriginalCarousel()}
      <Footer />
    </div>
  )

  render() {
    return (
      <div className="main-bg">
        {this.renderHomeBannerSection()}
        {this.renderCarouselSection()}
      </div>
    )
  }
}

export default Home
