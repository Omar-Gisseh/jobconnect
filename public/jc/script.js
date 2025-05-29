

document.querySelector('.header-btn').addEventListener('click', async () => {
 
  const query = document.querySelector('input[type="text"]').value;

 
  const response = await fetch(`http://localhost:5000/api/jobs`);
  const jobs = await response.json();

  
  const featuredSection = document.querySelector('.featured-jobs');
  featuredSection.innerHTML = ''; 
  
  jobs
    .filter(job => job.title.toLowerCase().includes(query.toLowerCase()))
    .forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('jobs-container');

      
      const postedDate = new Date(job.datePosted);
      const daysAgo = Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

      
      jobElement.innerHTML = `
        <h2 class="jobs-h1">${job.title}</h2>
        <h3>Posted ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago</h3> <!-- Dynamic "Posted X days ago" -->
        <p class="jobs-p">${job.descripttion}</p>
        <p><strong>${job.company}</strong> | ${job.location}</p>
        <p>Salary: ${job.salary}</p>
        <a href="job-details.html?id=${job._id}" class="jobs-link">Details</a> <!-- ❗Link to dynamic job details page -->
      `;

     
      featuredSection.appendChild(jobElement);
    });
});
