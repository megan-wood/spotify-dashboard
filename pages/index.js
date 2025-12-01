import "./globals.css";
import { useState } from 'react';

// require('dotenv').config();
const CLIENTID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECTURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
console.log("redirect uri: ", REDIRECTURI);

export default function LoginPage() {
  return (
    <section>
      <header>
      </header>
      <body>
        <p>hi</p>
        {/* <p>Client id: {CLIENTID}</p> */}
        <SpotifyLoginButton clientID={CLIENTID} redirectURL={REDIRECTURI} scopes={["user-read-email", "user-read-private", "playlist-modify-public", "playlist-modify-private", "user-top-read"]} />
      </body>
    </section>
  );
}

function SpotifyLoginButton({ clientID, redirectURL, scopes }) {
    const [state] = useState(Math.random().toString(36).substring(2)); // Generate a random state
    

    const handleLoginClick = () => {
        console.log("handling login click");
        const authorizationURL = generateAuthorizationURL(clientID, redirectURL, scopes, state);
        console.log("authorization url: ", authorizationURL);
        window.location.href = authorizationURL;  // redirects the user to spotify's page
    }

    return (
        <button onClick={handleLoginClick}>Login with Spotify</button>
    );
}

function generateAuthorizationURL(clientID, redirectURL, scopes, state) {
    let authorizationURL =  "https://accounts.spotify.com/authorize";
    const params = new URLSearchParams();
    params.append("client_id", clientID);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectURL);
    params.append("scope", scopes.join(" "));
    params.append("state", state);

    authorizationURL += "?" + params.toString();

    console.log("URL: ", authorizationURL);
    return authorizationURL;
}
