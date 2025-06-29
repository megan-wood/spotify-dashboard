export default async function GetTopArtists(req, res) {
    // const type = params.type; 
    const body = await req.body; 
    console.log("pref body: ", body);
    const timeRange = convertTimeRange(body.timeRange);
    const numArtists = body.numArtists;
    const accessToken = req.query.token;
    // const accessToken = body.token;
    // console.log("top artists query: ", body); 
    console.log("accesstoken top: ", accessToken);

    let url = `https://api.spotify.com/v1/me/top/artists` + "?";

    // if (type === "artists") {
        const params = new URLSearchParams();
        params.append("time_range", timeRange);
        params.append("limit", numArtists);
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

function convertTimeRange(timeRange) {
    if (timeRange === "oneYear") {
        return "long_term";
    } else if (timeRange == "sixMonths") {
        return "medium_term";
    }
    return "short_term";
}