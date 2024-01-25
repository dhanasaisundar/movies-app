import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import PopularMovieItem from '../PopularMovieItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function getUpdatedPopularMovies(movies) {
  const updatedTrendingMovie = movies.map(movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    overview: movie.overview,
    posterPath: movie.poster_path,
    title: movie.title,
  }))

  return updatedTrendingMovie
}

class PopularMovies extends Component {
  state = {moviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/popular-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedPopularMovies = getUpdatedPopularMovies(data.results)
      this.setState({
        moviesList: updatedPopularMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getPopularMovies() {
    const {moviesList} = this.state
    return (
      <div>
        <ul className="popular-movies-container">
          {moviesList.map(eachMovie => (
            <PopularMovieItem key={eachMovie.id} eachMovie={eachMovie} />
          ))}
        </ul>
      </div>
    )
  }

  renderPopularFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-view-text">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-again-btn">
        Try Again
      </button>
    </div>
  )

  renderPopularLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={70}
        fontWeight="bold"
      />
    </div>
  )

  renderFinalPopularView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getPopularMovies()
      case apiStatusConstants.inProgress:
        return this.renderPopularLoaderView()
      case apiStatusConstants.failure:
        return this.renderPopularFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-bg">
        <Header />
        {this.renderFinalPopularView()}
        <Footer />
      </div>
    )
  }
}

export default withRouter(PopularMovies)
