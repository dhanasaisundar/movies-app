import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="info-container ">
      <div className="social-media-icons-container">
        <FaGoogle className="social-media-icon" />
        <FaTwitter className="social-media-icon" />
        <FaInstagram className="social-media-icon" />
        <FaYoutube className="social-media-icon" />
      </div>
      <p className="contact-us-text">Contact Us</p>
    </div>
  )
}
