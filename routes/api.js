const axios = require('axios')
const URL = process.env.ReleaseURL
const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN

function home(req, res) {
    res.render("./index")
}

async function fetchRecords(page = 1)
{
    const send_params = {
        type: 'release',
        page: page,
        per_page: 50
    }

    try {
        const response = await axios.get(URL, {params: send_params, headers: {'Authorization': `Discogs token=${DISCOGS_TOKEN}`} });
        console.log("Data received from discogs: ", response.data);
        return response.data;
    }
    
    catch (error)
    {
        console.error("Failed to fetch data: ", error);
        return null;
    }

}

async function discover(req, res)
{
    const page = req.query.page || 1;
    const records = await fetchRecords(page);

    if(records)
    {res.render("discover", {records: records.results, pagination: records.pagination}); }
    
    else
    {res.render("discover", {records: [], pagination: {}}); }
}


module.exports = {home, discover}
