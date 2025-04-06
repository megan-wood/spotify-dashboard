import { cookies } from "next/headers";
// import { useRouter } from "next/router"

export default async function profleHandler(req, res) {
    // const slug = params.slug;
    if (req.method === "POST") {
        const body = await req.body;
        console.log("req body: ", body);
        console.log("type of body: ", typeof(body));
        const accessToken = body["token"];
 

        console.log("route access token: ", accessToken);

        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        });
        let response = await result.json();
        console.log("profile result: ", response);
        // }
        // return response;
        res.status(200).json({ message: 'Success', response });
        // return new Response(JSON.stringify(response), {
        //     status: 200,
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
    }
}

// export default async function getProfile(req, res) {
//     // const cookieStore = await cookies();
//     // const access_token = cookieStore.get("API token");
//     // const router = useRouter();
//     // console.log("query: ", router.query);
//     const accessToken = res.query.token; 

//     console.log("access token: ", accessToken);

//     const result = await fetch("https://api.spotify.com/v1/me", {
//         method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
//     });
//     console.log("profile result: ", await result.json());
// }
