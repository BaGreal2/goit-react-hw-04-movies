import { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Searchbar from '../components/Searchbar';

import { fetchMoviesByQuery } from '../services/moviesApi';
import { urls } from '../router';

export default class MoviesPage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      this.handleFetchMovies(query);
    }
  }

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.location.search;
    const newSearch = this.props.location.search;

    if (prevSearch !== newSearch) {
      const { query } = queryString.parse(newSearch);
      this.handleFetchMovies(query);
    }
  }

  handleFetchMovies = (query) => {
    this.setState({ loading: true });

    fetchMoviesByQuery(query)
      .then((res) => this.setState({ movies: res.data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearch = (query) => {
    this.props.history.push({
      ...this.props.location,
      search: `?query=${query}`,
    });
  };

  render() {
    const { movies, loading, error } = this.state;

    return (
      <div>
        <Searchbar onSearch={this.handleSearch} />
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error.message}</h2>}

        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`${urls.movies}/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
