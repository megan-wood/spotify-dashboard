export default async function handler(req, res) {
    const data = req.body; 
    const accessToken = req.query.token;
    console.log("pref data: ", data);
    console.log("pref access token: ", accessToken);
    // const formData = new FormData(data);
    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
    console.log("data keys: ", Object.keys(data))
    console.log("time range: ", data.timeRange);
    const artists = await getTopArtists(accessToken, data);
    console.log("pref artists: ", artists); 
    res.status(200).json({ artists }); 
}

async function getTopArtists(accessToken, data) {
    const params = new URLSearchParams();
    params.append("token", accessToken);
    console.log("top artists token:", accessToken);
    const timeRange = data.timeRange;
    const numArtists = data.numArtists;
    const preferencesBody = {timeRange, numArtists};
    console.log("preferences body: ", preferencesBody);
    const response = await fetch(`http://localhost:3000/api/get-top-artists?token=${accessToken}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',  // Set header for JSON content
        },
        body: JSON.stringify(preferencesBody)
        // body: JSON.stringify({"token": accessToken})
    });

    const topArtists = await response.json();
    const items = topArtists.data.items;
    console.log("items: ", items);  
    // setTopArtists(items); 
    // console.log("top artists fun: ", ); 
    return items; 
}