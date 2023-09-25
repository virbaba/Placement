const linkedIn = require('linkedin-jobs-api');
// here i am using job api of linked in
module.exports.jobs = async (req, res) => {
    const queryOptions = {
                keyword: 'software engineer',
                location: 'India',
                dateSincePosted: 'past Week',
                jobType: 'full time',
                remoteFilter: 'remote',
                salary: '100000',
                experienceLevel: 'entry level',
                limit: '10'
    };
            
    try{
        let response = [];
        // fetching job accordin to queryOptions
        jobList = await linkedIn.query(queryOptions);
        res.render('jobs', {
            title: "Placement | Jobs",
            jobs: jobList
        });
    } catch (error) {
        console.error('Error:', error);
     }
   
}


