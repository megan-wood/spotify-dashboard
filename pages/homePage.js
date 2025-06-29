import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Link from "next/link";
import avatar from "../public/avatar.jpg";
import "./globals.css";

export default  function HomePage() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [topArtistsFormData, setTopArtistsFormData] = useState({
        time_range: "", 
        num_artists: 0, 
    });
    const [loading, setLoading] = useState(false); // state to manage loading status while fetching data
    let profileInfo; 
    // let profile;

    // console.log("is router ready: ", router.isReady);
    // if (!router.isReady) {
    //     console.log("router not ready: ", router.isReady);
    //     return <div>Loading...</div>;  // Or any loading state
    // }
    // console.log("is router ready: ", router.isReady);
    const accessToken = router.query["access_token"];

    useEffect(() => {
        if (!router.isReady) {
            console.log("router is not ready"); 
            return; 
        }
        console.log("router query:", router.query);
        console.log("type of query: ", typeof(router.query));
        // const accessToken = router.query["access_token"];
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

        let topArtistsInfo; 
        const runGetTopArtist = async () => {
            topArtistsInfo = await getTopArtists(accessToken, setTopArtists); 
            console.log("top artists info: ", topArtistsInfo); 
        };
        runGetTopArtist();

        // console.log("top artists info: ", topArtistsInfo); 


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
        let listItems;
    // if (!topArtists) {
    //     return (
    //         <div>
    //             <p>No top artists info.</p>
    //         </div>
    //     )
    // }
        console.log("artists: ", topArtists);
        console.log("list items: ", listItems); 

        async function onSubmitTopArtists(event) {
            event.preventDefault();
            console.log("event", event); 
            console.log("event target: ", event.target);
            const formData = new FormData(event.target);
            // console.log("form data: ", formData); 

            const formObject = Object.fromEntries(formData.entries());
            console.log(formObject);
            console.log("submit access token: ", accessToken);
            console.log(formObject.timeRange);
            const response = await fetch(`http://localhost:3000/api/submitPreferences?token=${accessToken}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST", 
                body:  JSON.stringify(formObject),
            });
            const reqTopArtists = await response.json();
            console.log("req top artists: ", reqTopArtists.artists);
            setTopArtists(reqTopArtists.artists);
        }

        return (
            <div>
                <nav style={{paddingBottom:"10px", paddingTop:"10px",backgroundColor: "#f0f0f0" }}>
                    <ul style={{display: "flex", gap: "1rem", listStyle: "none" }}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                    </ul>
                </nav>
                <section id="homePage">
                    <div id="profileInfo">
                        <ProfileImage profile={profile}/>
                        <div id="profileText">
                            <h1>Hello {profile.display_name}</h1>
                            {/* <ul>
                                <li>Email: {profile.email}</li>
                            </ul> */}
                        </div>
                    </div>
                    {/* <ul>
                        {topArtists.map((artist, index) => (
                        <li key={index}>{artist}</li> // Use the index or unique id as the key
                        ))}
                    </ul> */}
                    <section className="trendPreferences">
                        <form onSubmit={onSubmitTopArtists}>
                            <label htmlFor="top-artist-select">Choose the time frame for your listening trends: </label>
                            <br></br>
                            <select name="timeRange" id="timeRangeSelect">
                                    <option value="">--Please choose an option--</option>
                                    <option value="oneMonth">1 Month</option>
                                    <option value="sixMonths">6 Months</option>
                                    <option value="oneYear">1 Year</option>
                            </select> 
                            <br></br>
                            <label htmlFor="numArtists">Enter the number of artists to show.</label>
                            <br></br>
                            <input type="text" name="numArtists" />
                            <button type="submit">Submit</button>
                        </form>
                    </section>
                    <h3 className="heading3">Your top 10 artists for the last 6 months are: </h3>
                    <div id="topArtists">
                        {/* <p>First artist: {topArtists[0].name}</p>
                        <p>Second artist: {topArtists[1].name}</p>
                        <p>Third artist: {topArtists[2].name}</p>  */}
                        {/* <ul>{listItems}</ul> */}
                        {topArtists && <ArtistsList artists={topArtists}/>}
                    </div>

                    
                    {/* <p>Email: {profile}</p> */}
                </section>
            </div>
        );
    }
    

    //testing 
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

function ProfileImage({profile}) {

    let imgSrc = "/avatar.jpg";
    // let imgSrc = avatar;
    console.log("profile.images.length: ", profile.images.length);
    if (profile.images.length != 0) {
        imgSrc = profile.images[0].url;
    }
    console.log("imgSrc: ", imgSrc);

    return (
        <img src={imgSrc}
        alt="spotify user image" id="profileImg"/>
    );
}

async function getTopArtists(accessToken, setTopArtists) {
    // const params = new URLSearchParams();
    // params.append("token", accessToken);
    console.log("top artists token:", accessToken);
    const response = await fetch(`http://localhost:3000/api/get-top-artists?accessToken=${accessToken}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',  // Set header for JSON content
        },
        // body: JSON.stringify({"token": accessToken})
    });

    const topArtists = await response.json();
    const items = topArtists.data.items;
    console.log("items: ", items);  
    // setTopArtists(items.artists); 
    setTopArtists(items);
    // console.log("top artists fun: ", ); 
    return items; 
}

function ArtistsList({artists}) {
    console.log("artists in function: ", artists);
    return (
        // <ul>
        //     {artists.map((artist, index) => (
        //     <li key={index}>
        //         {artist.name}
        //     </li>
        //     ))}
        // </ul>
        // );
    //     <ul>
    //         {artists.map((artist, index) => (
    //         <li key={index}>{artist.name}</li> // Use the index or unique id as the key
    //         ))}
    //     </ul>
    // );
        <div>
                {artists.map((artist, index) => (
                    <div className="artistInfo" key={index}>
                        <img src={artist.images[0].url} alt="artist image"/>
                        <div className="artistName">
                            <ul>
                                <li>{artist.name}</li>
                            </ul>
                        </div>
                    </div>
                ))}
        </div>
    );
}