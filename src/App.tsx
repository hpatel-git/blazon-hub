import React from 'react';
import logo from './logo.svg';
import './App.css';
import FacebookLogin from 'react-facebook-login';

function App() {
  const responseFacebook = (response: any) => {
    console.log(response);
  }
  const componentClicked = (response: any) => {
    console.log(response);
  }
  return (
    <div className="App">
    Welcome here
    <FacebookLogin
    appId="2633424136966343"
    autoLoad={false}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />
    </div>
  );
}

export default App;
