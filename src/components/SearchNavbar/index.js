import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

function SearchNavbar(props) {
  const [inputSearch, setInputSearch] = useState('')
  const {onSearchMovies} = props

  function handleInputChange(event) {
    setInputSearch(event.target.value)
  }

  function handleOnClickSearch() {
    onSearchMovies(inputSearch)
  }

  return (
    <div className="navbar-main-bg">
      <img
        src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1698415386/Group_7399-removebg-preview_1_xdmayi.png"
        alt="website logo"
        className="navbar-header-logo-sm"
      />
      <div className="logo-container">
        <Link to="/" className="link-style">
          <img
            src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1698415386/Group_7399-removebg-preview_1_xdmayi.png"
            alt="website logo"
            className="navbar-header-logo"
          />
        </Link>
        <ul className="nav-links">
          <li className="nav-link-text" key="home">
            <Link to="/" className="link-style">
              Home
            </Link>
          </li>
          <li className="nav-link-text" key="popular">
            <Link to="/popular" className="link-style">
              Popular
            </Link>
          </li>
        </ul>
      </div>
      <div className="avatar-container">
        <div className="search-container">
          <input
            value={inputSearch}
            placeholder="search"
            className="search-input-element"
            onChange={handleInputChange}
            type="search"
          />
          <button type="button" testid="searchButton" className="search-button">
            <HiOutlineSearch
              className="search-input-icon"
              onClick={() => handleOnClickSearch()}
            />
          </button>
        </div>
        <Link to="/account">
          <div className="avatar-img-bg">
            <img
              src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1699612332/Group_hv4ogf.svg"
              alt="avatar"
              className="avatar-image"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default withRouter(SearchNavbar)
