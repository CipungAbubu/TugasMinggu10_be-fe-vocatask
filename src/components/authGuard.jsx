import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ isAuthenticated, children }) => {
    console.log(isAuthenticated);
  if (!isAuthenticated) {
   return <Navigate to="/login" replace />;
    }
  return children;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};