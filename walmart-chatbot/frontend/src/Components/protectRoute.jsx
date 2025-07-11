import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from './dataprovider/DataProvider';

function ProtectRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user, authLoading }] = useContext(DataContext); // Optional `authLoading`

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin', {
        state: {
          msg,
          redirect: redirect || location.pathname,
        },
      });
    }
  }, [user, authLoading, navigate, location, msg, redirect]);

  // Optional loading spinner
  if (authLoading) return <div>Loading...</div>;

  return user ? children : null;
}

export default ProtectRoute;
