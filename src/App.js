import './App.css';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);
;

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error('error', error)
      })
  }
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error('error', error)
      })
  }


  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        console.log('sign out')
      })
      .catch(error => {
        console.error('error', error)
      })

  }
  const handleFbSignIN = () => {

    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        setUser({})
        console.log(user)
      })
      .catch(error => {
        console.error('error', error)
      })

  }

  return (
    <div className="App">
      {
        user.displayName ? <button onClick={handleGoogleSignOut}> Google Sign Out</button> :
          <div>
            <button onClick={handleGoogleSignIn}> Google Sign In</button>

            <button onClick={handleFbSignIN}>Facebook Sign In</button>

            <button onClick={handleGitHubSignIn}> GitHub Sign In</button>
          </div>


      }
      <h4>Name: {user?.displayName}</h4>
      <p>Email: {user?.email}</p>
      <img src={user?.photoURL} alt="" />
    </div>
  );
}


export default App;
