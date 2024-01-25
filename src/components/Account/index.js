import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

class Account extends Component {
  handleLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderAccountInfo = () => (
    <div className="member-ship-bg">
      <h1>Account</h1>
      <hr />
      <div className="user-creds">
        <p className="info-text-color">Member ship</p>
        <div className="creds">
          <p className="info-details-color">rahul@gmail.com</p>
          <p className="info-text-color">
            Password : <span>***********</span>
          </p>
        </div>
      </div>
      <hr />
      <div className="user-creds">
        <p className="info-text-color">Plan Details</p>
        <p className="creds info-details-color">
          Premium <p className="ultra-hd">Ultra HD</p>
        </p>
      </div>
      <hr />
      <div className="logout-btn-container">
        <button
          type="button"
          className="logout-btn"
          onClick={this.handleLogoutBtn}
        >
          Logout
        </button>
      </div>
    </div>
  )

  render() {
    return (
      <div className="account-bg">
        <Header />
        {this.renderAccountInfo()}
        <div className="info-container ">
          <div className="social-media-icons-container">
            <FaGoogle className="social-media-icon" />
            <FaTwitter className="social-media-icon" />
            <FaInstagram className="social-media-icon" />
            <FaYoutube className="social-media-icon" />
          </div>
          <p className="contact-us-text">Contact Us</p>
        </div>
      </div>
    )
  }
}

export default Account
