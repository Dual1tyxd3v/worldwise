import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <>
      <p>404. Page not found</p>
      <Link to='/'>Back to main</Link>
    </>
  );
}
