import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {getYear, format} from 'date-fns'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function getUpdatedSimilarMovies(movies) {
  const updatedSimilarMovie = movies.map(movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    overview: movie.overview,
    posterPath: movie.poster_path,
    title: movie.title,
  }))

  return updatedSimilarMovie
}

function getUpdatedSpokenLanguages(language) {
  const updatedLanguage = language.map(eachLang => ({
    id: eachLang.id,
    englishName: eachLang.english_name,
  }))
  return updatedLanguage
}

function getUpdatedMovieDetail(data) {
  const updatedMovie = {
    adult: data.adult,
    backdropPath: data.backdrop_path,
    budget: data.budget,
    genres: data.genres,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    runtime: data.runtime,
    similarMovies: getUpdatedSimilarMovies(data.similar_movies),
    spokenLanguages: getUpdatedSpokenLanguages(data.spoken_languages),
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  }
  return updatedMovie
}

class MovieDetails extends Component {
  state = {movieDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    await this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedMovieDetail = getUpdatedMovieDetail(data.movie_details)
      this.setState({
        movieDetails: updatedMovieDetail,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMovieDetailsUpperSection = () => {
    const {movieDetails} = this.state
    const {runtime} = movieDetails
    const hours = Math.floor(runtime / 60)
    const minutes = Math.ceil(runtime % 60)
    const duration = `${hours}h ${minutes}m`
    const releaseDate = new Date(movieDetails.releaseDate)
    const year = getYear(releaseDate)
    const certificate = movieDetails.adult ? 'A' : 'U/A'

    return (
      <div
        className="upper-section-bg-movie-detail"
        style={{backgroundImage: `url(${movieDetails.backdropPath})`}}
      >
        <Header />
        <div className="banner-info-movie-detail">
          <h1 className="banner-heading">{movieDetails.title}</h1>
          <div className="movie-detail ">
            <p>{duration}</p>
            <p className="certificate">{certificate}</p>
            <span>{year}</span>
          </div>
          <p className="banner-text">{movieDetails.overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  handleMovieClick = movieId => {
    const {history} = this.props
    history.replace(`/movies/${movieId}`)
    this.getMovieDetails()
  }

  handleTryAgainBtn = () => {
    this.getMovieDetails()
  }

  renderSimilarMovies = () => {
    const {movieDetails} = this.state
    return (
      <div>
        <h1 className="more-like-this-text">More like this</h1>
        <ul className="similar-movies-container">
          {movieDetails.similarMovies.map(eachSimilarMovie => (
            <li
              key={eachSimilarMovie.id}
              className="similar-movie-list-container"
            >
              <img
                src={eachSimilarMovie.posterPath}
                alt={eachSimilarMovie.title}
                className="similar-movie"
                onClick={() => this.handleMovieClick(eachSimilarMovie.id)}
              />
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderMovieInfo = () => {
    const {movieDetails} = this.state
    const releaseDate = new Date(movieDetails.releaseDate)
    const formattedDate = format(releaseDate, 'do MMMM yyyy')
    return (
      <div className="movie-info">
        <div>
          <h1 className="info-heading">Genres</h1>
          <ul className="info-list-container">
            {movieDetails.genres.map(eachGenre => (
              <li key={eachGenre.id} className="info-text">
                <p>{eachGenre.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="info-heading">Audio Available</h1>
          <ul className="info-list-container">
            {movieDetails.spokenLanguages.map(eachAudio => (
              <li className="info-text" key={eachAudio.id}>
                <p>{eachAudio.englishName}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rating">
          <h1 className="info-heading">Rating Count</h1>
          <p className="info-text">{movieDetails.voteCount}</p>
          <h1 className="info-heading">Rating Average</h1>
          <p className="info-text">{movieDetails.voteAverage}</p>
        </div>
        <div className="budget-release-date">
          <h1 className="info-heading">Budget</h1>
          <p className="info-text">{movieDetails.budget}</p>
          <h1 className="info-heading">Release Date</h1>
          <p className="info-text">{formattedDate}</p>
        </div>
      </div>
    )
  }

  renderMovieDetailsBottomSection = () => (
    <div className="lower-section-bg">
      {this.renderMovieInfo()}
      {this.renderSimilarMovies()}
    </div>
  )

  renderMovieDetails = () => (
    <>
      {this.renderMovieDetailsUpperSection()}
      {this.renderMovieDetailsBottomSection()}
    </>
  )

  renderSimilarFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-view-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.handleTryAgainBtn}
      >
        Try Again
      </button>
    </div>
  )

  renderSimilarLoaderView = () => (
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

  renderFinalSimilarView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetails()
      case apiStatusConstants.inProgress:
        return this.renderSimilarLoaderView()
      case apiStatusConstants.failure:
        return this.renderSimilarFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderFinalSimilarView()}</>
  }
}

export default MovieDetails
