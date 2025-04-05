import { useRouter } from "next/router"
import { useState } from "react";

export default function HomePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    // console.log("is router ready: ", router.isReady);
    // if (!router.isReady) {
    //     console.log("router not ready: ", router.isReady);
    //     return <div>Loading...</div>;  // Or any loading state
    // }
    // console.log("is router ready: ", router.isReady);
    console.log("router query:", router.query.access_token);
    const accessToken = router.query.access_token; 
    console.log("access token: ", accessToken);
    // getProfile(accessToken);
    return (
        <div>
            <p>Hello</p>
        </div>
    );
}

// async function getProfile(accessToken) {  
//     const response = await fetch('https://api.spotify.com/v1/me', {
//       headers: {
//         Authorization: 'Bearer ' + accessToken
//       }
//     });
  
//     const data = await response.json();
//     console.log("profile data: ", data); 
//   }
async function getProfile(token) {
    console.log("token:", token); 
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    console.log("result: ", result);
    return await result.json();
}