export default async function GetAPIToken(req, res) {
    const { code } = req.body;

    let authURL = "https://accounts.spotify.com/api/token";

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code); 
    params.append("redirect_uri", "http://localhost:3000/api/auth/callback");
    
    const response = await fetch(authURL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded", 
            "Authorization": 'Basic ' + (new Buffer.from(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
        },
        body: params.toString(),
    })

    const data = await response.json();
    console.log("data:", data); 
    if (data) {
        res.status(200).json({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        });
    } else {
        res.status(400).json({error: "Failed to get token from Spotify, response from them: ", data});
    }
}