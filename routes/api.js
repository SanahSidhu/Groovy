const axios = require('axios')
const URL = process.env.Search_Release_URL
const release_url = process.env.Single_Release_URL
const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN

function home(req, res) {
    res.render("./index")
}

async function fetchRecords(page = 1, per_page = 30)
{
    const send_params = {
        type: 'release',
        page: page,
        per_page: per_page
    }

    try {
        const response = await axios.get(URL, {params: send_params, headers: {'Authorization': `Discogs token=${DISCOGS_TOKEN}`} });
        console.log("Data received from discogs: ", response.data);
        
        const records = response.data.results.map(item => {
            const splitTitle = item.title.split(' - ');
            const artist = splitTitle[0] || 'Unknown Artist';
            const title = splitTitle[1] || 'Untitled';
        
            return {
                id: item.id,
                title: title.trim(),
                artist: artist.trim(),
                thumb: item.thumb
            };
        });
        
        return {
            results: records, pagination: response.data.pagination
        };
        
        
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


async function fetchRecordDetails(id) {
    try {
        const response = await axios.get(`${release_url}/${id}`, {
            headers: {'Authorization': `Discogs token=${DISCOGS_TOKEN}`}
        });
        console.log("Detailed record data: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch record details: ", error);
        return null;
    }
}


async function details(req, res) {
    const recordId = req.params.id;
    const recordDetails = await fetchRecordDetails(recordId);

    if(recordDetails) {
        res.render("details", { record: recordDetails });
    } else {
        res.render("details", { record: null });
    }
}


async function searchRecords(query)
{
    const send_params = {
        type: 'release',
        query: query
    }

    try {
        const response = await axios.get(URL, {params: send_params, headers: {'Authorization': `Discogs token=${DISCOGS_TOKEN}`} });
        console.log("Data received from discogs: ", response.data);

        const records = response.data.results.map(item => {
            const splitTitle = item.title.split(' - ');
            const artist = splitTitle[0] || 'Unknown Artist';
            const title = splitTitle[1] || 'Untitled';
        
            return {
                id: item.id,
                title: title.trim(),
                artist: artist.trim(),
                thumb: item.thumb
            };
        });

        return {
            results: records, pagination: response.data.pagination
        };
    }
    
    catch (error)
    {
        console.error("Failed to fetch data: ", error);
        return null;
    }

}


async function search(req, res) {
    const query = req.query.search || '';

    const page = Math.floor(Math.random() * 100) + 1;
    const per_page = 5;
    const randomRecords = await fetchRecords(page, per_page);

    let searchResults = [];

    if (query !== '') {
        const searchRecordsResponse = await searchRecords(query);
        if (searchRecordsResponse && searchRecordsResponse.results) {
            let titleSet = new Set();
            searchResults = searchRecordsResponse.results.filter(
                record => {
                    if(!titleSet.has(record.title))
                    {
                        titleSet.add(record.title);
                        return true;
                    }
                    return false;

                }
            );
        }
    }

    res.render("./search", {
        records: searchResults,
        randomrecords: randomRecords.results,
        searchQuery: query
    });
}


module.exports = { home, discover, details, fetchRecords, search}

