import Slider from 'react-slick'
import {Link} from 'react-router-dom'

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const TrendingMovies = props => {
  const {trendingMovies} = props
  console.log(trendingMovies)
  return (
    <>
      <div className="slick-container">
        <Slider {...settings}>
          {trendingMovies.map(eachLogo => (
            <div className="slick-item" key={eachLogo.id}>
              <Link to={`/movies/${eachLogo.id}`} className="movie-link">
                <img
                  className="logo-image"
                  src={eachLogo.posterPath}
                  alt={eachLogo.name}
                  key={eachLogo.id}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default TrendingMovies
