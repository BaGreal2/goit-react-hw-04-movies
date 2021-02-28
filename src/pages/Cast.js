import { Component } from 'react';

import { fetchMovieCast } from '../services/moviesApi';

const baseImageUrl = 'https://image.tmdb.org/t/p/original';

export default class Cast extends Component {
  state = {
    cast: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });

    fetchMovieCast(this.props.match.params.movieId)
      .then((res) => this.setState({ cast: res.data.cast }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { cast } = this.state;

    return (
      <div>
        {cast.length > 0 && (
          <ul>
            {cast.map((elem) => (
              <li key={elem.id}>
                <h4>{elem.name}</h4>
                <p>{elem.character}</p>
                <img
                  src={baseImageUrl + elem.profile_path}
                  alt={elem.name}
                  width={250}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
