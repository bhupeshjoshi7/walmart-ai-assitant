import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Signin.css';
import { auth } from '../../utility/firebase'; // Firebase authentication
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ClipLoader } from 'react-spinners';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loadingSignIn, setLoadingSignIn] = useState(false); // For loading state during sign-in
  const [loadingSignUp, setLoadingSignUp] = useState(false); // For loading state during sign-up
  const navigate = useNavigate();
  const navStateData = useLocation(); // For navigation state (redirect purposes)

  const signHandler = (e) => {
    e.preventDefault();
    setLoadingSignUp(true);
    setTimeout(() => {
      navigate('/signup');
    }, 1000); // Optional delay to simulate loading effect
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoadingSignIn(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log('Signed in:', authUser);
        setError('');
        setLoadingSignIn(false);
        navigate(navStateData?.state?.redirect || '/'); // Redirect to passed location or home
      })
      .catch((err) => {
        setError(err.message);
        setLoadingSignIn(false);
      });
  };

  return (
    <div className="signin">
      <Link to="/">
        <img
          className="signin-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      <div className="signin-container">
        <h1>Sign-In</h1>

        {navStateData?.state?.msg && (
          <small
            style={{
              padding: '5px',
              textAlign: 'center',
              color: 'red',
              fontWeight: 'bold',
            }}
          >
            {navStateData.state.msg}
          </small>
        )}

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignIn}>
          <h5>Email or mobile phone number</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <button
            type="submit"
            name="signin"
            className="signin-button"
            disabled={loadingSignIn || loadingSignUp}
          >
            {loadingSignIn ? <ClipLoader size={20} color="#fff" /> : 'Sign In'}
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>

        <button
          type="button"
          name="signup"
          className="signup-button"
          onClick={signHandler}
          disabled={loadingSignIn || loadingSignUp}
        >
          {loadingSignUp ? <ClipLoader size={20} color="#fff" /> : 'Create your Amazon Account'}
        </button>
      </div>
    </div>
  );
}

export default Signin;
