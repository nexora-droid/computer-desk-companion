export default async function handler(req, res) {
    const response = await fetch("https://api.ipapi.is/", {
        headers: {
            Authorization: `Bearer ${process.env.IPAPI_KEY}`
        }
    });
    const data = await response.json()
    res.status(200).json(data);
}