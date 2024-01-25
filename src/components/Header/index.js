import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    isClosed: true,
  }

  toggleIsClosed = () => {
    this.setState(prevIsClosed => !prevIsClosed)
  }

  render() {
    const {isClosed} = this.state
    return (
      <>
        <div className="navbar-main-bg">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1698415386/Group_7399-removebg-preview_1_xdmayi.png"
              alt="website logo"
              className="navbar-header-logo-sm"
            />
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
            <Link to="/search">
              <HiOutlineSearch className="search-icon" />
            </Link>
            <Link to="account">
              <div className="avatar-img-bg">
                <img
                  src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1699612332/Group_hv4ogf.svg"
                  alt="profile"
                  className="avatar-image"
                />
              </div>
            </Link>
          </div>
          <div className="sm-icons-container">
            <Link to="/search">
              <HiOutlineSearch className="search-icon" />
            </Link>
            <button
              type="button"
              className="search-button"
              onClick={this.toggleIsClosed}
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>
        </div>
        <div className={isClosed ? 'closed' : 'opened'}>
          <ul className="nav-links-sm">
            <li key="smHome">
              <Link to="/" className="nav-links-sm-link">
                Home
              </Link>
            </li>
            <li key="smPopular">
              <Link to="/popular" className="nav-links-sm-link">
                Popular
              </Link>
            </li>
            <li key="smAccount">
              <Link to="/account" className="nav-links-sm-link">
                Account
              </Link>
            </li>
            <AiFillCloseCircle onClick={this.toggleIsClosed} />
          </ul>
        </div>
      </>
    )
  }
}

export default withRouter(Header)
