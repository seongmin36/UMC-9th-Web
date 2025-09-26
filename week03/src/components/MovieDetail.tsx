import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();

  return <div>movie detail page입니다: {movieId}</div>;
};

export default MovieDetail;
