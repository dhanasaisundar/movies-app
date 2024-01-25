import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import SearchNavbar from '../SearchNavbar'
import './index.css'

function getUpdatedSearchMovies(movies) {
  const updatedTrendingMovie = movies.map(movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    overview: movie.overview,
    posterPath: movie.poster_path,
    title: movie.title,
  }))

  return updatedTrendingMovie
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchedMovies extends Component {
  state = {
    searchInput: '',
    searchedMovieList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchedMovieList()
  }

  getSearchedMovieList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedSearchMovies = getUpdatedSearchMovies(data.results)
      this.setState({
        searchedMovieList: updatedSearchMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearchMovies = value => {
    this.setState({searchInput: value}, () => {
      this.getSearchedMovieList()
    })
  }

  renderSearchedMovies = () => {
    const {searchInput, searchedMovieList} = this.state
    const isMoviesAvailable = searchedMovieList.length > 0
    return isMoviesAvailable ? (
      <ul className="searched-movies-container">
        {searchedMovieList.map(eachMovie => (
          <li key={eachMovie.id} className="searched-movies-list-container">
            <Link to={`/movies/${eachMovie.id}`}>
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="search-movies"
              />
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <div className="no-movies-bg">
        <img
          src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1699611422/Group_7394_dk2wkz.png"
          alt="no movie"
          className="no-movies-image"
        />
        <p className="no-movies-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSearchedMoviesFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="failure-view"
        className="failure-view-image"
      />
      <h1 className="failure-view-text">
        Something went wrong. Please try again
      </h1>
      <button type="button" className="try-again-btn">
        Try Again
      </button>
    </div>
  )

  renderSearchedMoviesLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={70}
        fontWeight="bold"
      />
    </div>
  )

  renderFinalSearchedMovieView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchedMovies()
      case apiStatusConstants.inProgress:
        return this.renderSearchedMoviesLoaderView()
      case apiStatusConstants.failure:
        return this.renderSearchedMoviesFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-movies-bg">
        <SearchNavbar onSearchMovies={this.onSearchMovies} />
        {this.renderFinalSearchedMovieView()}
      </div>
    )
  }
}

export default SearchedMovies
