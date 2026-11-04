import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon.jsx';

export default function OrderButton({ children = 'Order Now', to = '/bowl-builder/meals', onClick }) {
  return (
    <Link className="button button--glass" to={to} onClick={onClick}>
      <span className="button__icon"><ArrowIcon /></span>
      <span className="button__label"><span>{children}</span><span aria-hidden="true">{children}</span></span>
    </Link>
  );
}
