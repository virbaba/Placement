const axios = require('axios');
module.exports.jobs = async (req, res) =>{
    try{ 
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign_in');
        }
    
        const indeedJobs = await axios.get('https://api.indeed.com/ads/apisearch', {
      params: {
        publisher: 'YOUR_PUBLISHER_ID', // Replace with your publisher ID
        l: 'india',
        v: 2,
        format: 'json',
        q: 'developer', // Example query
      }
    });
    
    const jobs = indeedJobs.data.results; // Get job listings from the API response
    console.log(jobs);
    res.render('jobs', { 
        title: 'Placement | Jobs',
        jobs : jobs
    }); // Render the index.ejs file with the jobs data
    }catch(err){
        console.log(`error coming in fetcing job ${err}`)
    }
}