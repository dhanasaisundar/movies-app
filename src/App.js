import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import LogInForm from './components/LogInForm'
import Home from './components/Home'
import PopularMovies from './components/PopularMovies'
import MovieDetails from './components/MovieDetails'
import SearchedMovies from './components/SearchedMovies'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LogInForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/popular" component={PopularMovies} />
        <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
        <ProtectedRoute exact path="/search" component={SearchedMovies} />
        <ProtectedRoute exact path="/account" component={Account} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
