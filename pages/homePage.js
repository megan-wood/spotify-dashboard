import { useRouter } from "next/router"
import { useState } from "react";

export default  function HomePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    // console.log("is router ready: ", router.isReady);
    // if (!router.isReady) {
    //     console.log("router not ready: ", router.isReady);
    //     return <div>Loading...</div>;  // Or any loading state
    // }
    // console.log("is router ready: ", router.isReady);
    console.log("router query:", router.query);
    const accessToken = router.query.access_token; 
    console.log("access token: ", accessToken);
    // <Link href="/user/[id]" as={`/user/${user.id}`}></Link>
    // console.log(`url: http://localhost:3000/api/profile?token=${accessToken}`);
    // const params = new URLSearchParams();
    // params.append("token", accessToken);
    // console.log("params: ", params.toString(), " json: ", JSON.stringify(params));
    // const response = await fetch(`http://localhost:3000/api/profile`, {
    //     method: "POST",
    //     // headers: {
    //     //     'Content-Type': 'application/json',  // Set header for JSON content
    //     // },
    //     body: params.toString()  // Send as JSON string
    // });//get/profile?token=${accessToken}`);
    // console.log("data: ", response); 
    // const data = await response.json();
    // console.log("data: ", data); 
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
    console.log("get profile token:", token); 
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    console.log("result: ", result);
    return await result.json();
}