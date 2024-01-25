import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-bg">
        <h1>Lost Your Way?</h1>
        <p className="not-found-para-text">
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>
        <Link to="/">
          <button type="button" className="go-to-home-btn ">
            Go to Home
          </button>
        </Link>
      </div>
    )
  }
}

export default NotFound
