import {Link} from 'react-router-dom'
import './index.css'

export default function PopularMovieItem(props) {
  const {eachMovie} = props
  return (
    <li className="popular-movie-list-container">
      <Link to={`/movies/${eachMovie.id}`} className="popular-list-style">
        <img
          src={eachMovie.posterPath}
          alt={eachMovie.title}
          className="popular-movie-image"
        />
      </Link>
    </li>
  )
}
