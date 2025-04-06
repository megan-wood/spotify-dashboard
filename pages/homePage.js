import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default  function HomePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true); // optional, for UX
    let profileInfo; 

    // console.log("is router ready: ", router.isReady);
    // if (!router.isReady) {
    //     console.log("router not ready: ", router.isReady);
    //     return <div>Loading...</div>;  // Or any loading state
    // }
    // console.log("is router ready: ", router.isReady);
    useEffect(() => {
        if (!router.isReady) {
            return; 
        }
        console.log("router query:", router.query);
        console.log("type of query: ", typeof(router.query));
        const accessToken = router.query["access_token"];
        console.log("access token: ", accessToken);
        if (!accessToken) {
            console.log("no access token");
            return;
        }
        const runGetProfile = async () => {
            profileInfo = await getProfile(accessToken, setProfile);
            console.log("profile: ", profileInfo);
            // if (profileInfo) {
            //     setProfile(profileInfo);
            // } 
        };
        runGetProfile(); 
        console.log("profile: ", profileInfo); 

        // <Link href="/user/[id]" as={`/user/${user.id}`}></Link>
        // console.log(`url: http://localhost:3000/api/profile?token=${accessToken}`);
        // const params = new URLSearchParams();
        // params.append("token", accessToken);
        // // console.log("params: ", params.toString(), " json: ", JSON.stringify(params));
        // const response = await fetch(`http://localhost:3000/api/profile`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',  // Set header for JSON content
        //     },
        //     body: JSON.stringify({"token": accessToken})
        // //     // body: params.toString()  // Send as JSON string
        // });//get/profile?token=${accessToken}`);
        // console.log("data: ", response); 
        // const data = await response.json();
        // console.log("data: ", data); 
        // getProfile(accessToken);
    }, [router.isReady, router.query.access_token]);
    // if (loading || !profile) return <div>Loading profile...</div>;
    if (!profile) {
        return (
            <div>
                <p>No profile info</p>
            </div>
        );
    }
        return (
            <div>
                <p>Hello</p>
                <h1>Welcome, {profile.display_name}</h1>
                <ul>
                    <li>Email: {profile.email}</li>
                    <li>Email: {profile.email}</li>
                </ul>
                {/* <p>Email: {profile}</p> */}
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
async function getProfile(accessToken, setProfile) {
    // console.log("get profile token:", token); 
    // const result = await fetch("https://api.spotify.com/v1/me", {
    //     method: "GET", headers: { Authorization: `Bearer ${token}` }
    // });
    // console.log("result: ", result);
    // return await result.json();
    const params = new URLSearchParams();
    params.append("token", accessToken);
    // console.log("params: ", params.toString(), " json: ", JSON.stringify(params));
    const response = await fetch(`http://localhost:3000/api/profile`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',  // Set header for JSON content
        },
        body: JSON.stringify({"token": accessToken})
    //     // body: params.toString()  // Send as JSON string
    });
    console.log("data: ", response); 
    const data = await response.json();
    console.log("data: ", data); 
    const profile = data.response; 
    setProfile(profile);
    console.log("profile: ", profile); 
    return profile; 
}

function Image(profile) {
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }

}