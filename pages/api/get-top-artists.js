export default async function GetTopArtists(req, res) {
    // const type = params.type; 
    const body = await req.body; 
    const accessToken = body.token;
    console.log("top artists query: ", body); 
    console.log("access token top: ", accessToken);

    let url = `https://api.spotify.com/v1/me/top/artists` + "?";

    // if (type === "artists") {
        const params = new URLSearchParams();
        params.append("time_range", "medium_term");
        params.append("limit", 10);
        params.append("offset", 0); 

        url += params.toString();
        console.log("url: ", url);

        const response = await fetch(url, {
            method: "GET", 
            headers: {
                Authorization: 'Bearer ' + accessToken
            }, 
            // body: params.toString() 
        });

        const jsonData = await response.json();
        console.log("json data: ", jsonData);
        
        if (jsonData) {
            res.status(200).json({data: jsonData});
        } else {
            res.status(400).json("Failed to get top artists");
        }

    // } else if (type === "tracks") {

    // }

}