import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { MIDContextProvider } from './contexts/mId';

const pca = new PublicClientApplication({
  auth: {
    clientId: '50f84740-f4ca-4ef1-9f6f-e2ed4402e09b',
    authority: 'https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c',
    redirectUri: '/',   // home page, http://localhost:3000
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
})

pca.addEventCallback(event => {
  if(event.eventType === EventType.LOGIN_SUCCESS) {
    // console.log(event);
    pca.setActiveAccount(event.payload.account);
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MIDContextProvider>
      <MsalProvider instance={pca}>
        <App msalInstance={pca}/>
      </MsalProvider>
    </MIDContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
