import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './page/Router';
// import { auth } from './utility/firebase'; // Make sure this exports the Firebase `auth` object
import { DataContext } from './Components/dataprovider/DataProvider';

function App() {
  const [, dispatch] = useContext(DataContext); // Get the dispatch method from your context

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       // User is signed in
  //       dispatch({
  //         type: 'SET_USER',
  //         user: authUser,
  //       });
  //     } else {
  //       // User is signed out
  //       dispatch({
  //         type: 'SET_USER',
  //         user: null,
  //       });
  //     }
  //   });

  //   return unsubscribe; // Cleanup listener on unmount
  // }, [dispatch]);

  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
