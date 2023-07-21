import { useNavigate } from 'react-router-dom';
import Button from '../button/button';

export default function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button type="back" onClick={() => navigate(-1)}>
      &larr; Back
    </Button>
  );
}