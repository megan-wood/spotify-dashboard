import { NextResponse } from "next/server";

export default async function callbackHandler(req, res) {
    const code = req.query.code;
    console.log("code: ", code); 
    console.log(`client id: ${process.env.CLIENT_ID}, client secret: ${process.env.CLIENT_SECRET}`);
    let authURL = "https://accounts.spotify.com/api/token";

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code); 
    params.append("redirect_uri", "http://localhost:3000/api/auth/callback");
    
    const response = await fetch(authURL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded", 
            "Authorization": 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        body: params.toString(),
    })

    const data = await response.json();
    console.log("data:", data); 

    if (data.access_token) {
        console.log("received access token: ", data.access_token); 
        let url = `/homePage?access_token=${data.access_token}`;

        //added
        // console.log("token:", data.access_token); 
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${data.access_token}` }
        });
        console.log("profile result: ", await result.json());
        // return await result.json();
        //ends
        const topItemsParams = new URLSearchParams();
        topItemsParams.append("time_range", "short_term");
        topItemsParams.append("limit", 10);
        const topItemsURL = `https://api.spotify.com/v1/me/top/tracks?${topItemsParams.toString()}`;
        console.log("topItemsURL: ", topItemsURL);
        const topItemsResult = await fetch(topItemsURL, {
            method: "GET", headers: { Authorization: `Bearer ${data.access_token}` }
        });

        const topItemsJSON = await topItemsResult.json();
        console.log("top items response:", topItemsJSON); 
        console.log("followers of 0: ", topItemsJSON["followers"]);

        res.redirect(url);
        // console.log(`URL: ${(new URL(url)).toString()}`);
        // return NextResponse.redirect(new URL(url));
    } else {
        res.status(400).json({error: "Failed to get token from Spotify, response from them: ", data});
    }
}