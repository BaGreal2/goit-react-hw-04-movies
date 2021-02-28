import { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import Cast from './Cast';
import Reviews from './Reviews';

import { fetchMovieDetails } from '../services/moviesApi';

const baseImageUrl = 'https://image.tmdb.org/t/p/original';

export default class MovieDetailsPage extends Component {
  state = {
    data: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });

    fetchMovieDetails(this.props.match.params.movieId)
      .then((res) => this.setState({ data: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { match } = this.props;
    const { data, loading } = this.state;
    return (
      <div>
        {/* <h1>Movie Details page</h1> */}
        {loading && <p>Loading...</p>}
        <Link to={`/`}><button>Go back</button></Link>
        {data && (
          <>
          <div className={styles.container}>
          <img
              src={baseImageUrl + data.poster_path}
              alt={data.title}
              width={300}
              
            />
            <div className={styles.containerSmall}>
            <h2>{data.title}({data.release_date})</h2>
            {/* <pre>{data.release_date}</pre> */}
            <h3>Overview</h3>
            <p>{data.overview}</p>
            <h3>Generes</h3>
            <p>
            {data.genres.map((genre)=>(
              genre.name + ', '
            ))}
            </p>
            {/* <p>{data.genres.join(', ')}</p> */}
            </div>

          </div>
            <br />
          </>
        )}
        <p>Additional information</p>
        <ul className={styles.addition}>
          <li><Link to={`${match.url}/cast`}>Cast</Link></li>
          <li><Link to={`${match.url}/reviews`}>Reviews</Link></li>
        </ul>

        <Route path={`${match.path}/cast`} component={Cast} />
        <Route path={`${match.path}/reviews`} component={Reviews} />
      </div>
    );
  }
}
