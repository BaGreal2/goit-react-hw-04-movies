import { Component } from 'react';

import { fetchMovieReviews } from '../services/moviesApi';

export default class Reviews extends Component {
  state = {
    reviews: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });

    fetchMovieReviews(this.props.match.params.movieId)
      .then((res) => this.setState({ reviews: res.data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { reviews } = this.state;

    return (
      <div>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((elem) => (
              <li key={elem.id}>
                <h4>Author:{elem.author}</h4>
                <p>{elem.content}</p>
              </li>
            ))}
          </ul>
        ) : <p>We don't have any reviews for this movie</p>}
      </div>
    );
  }
}

