document.addEventListener('DOMContentLoaded', () => {
  const jobsContainer = document.querySelector('.jobs-container');
  const searchInput = document.getElementById('search-jobs');
  const searchButton = document.querySelector('.search-btn');

  // Function to render jobs
  const renderJobs = (jobs) => {
    jobsContainer.innerHTML = ''; // clear old jobs
    if (jobs.length === 0) {
      jobsContainer.innerHTML = '<p>No jobs found.</p>';
      return;
    }

    jobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('job-card');

      const postedDate = new Date(job.datePosted);
      const daysAgo = Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

      jobElement.innerHTML = `
        <h3>${job.title} — ${job.company}, ${job.location}</h3>
        <p>${job.descripttion || 'No description available'}</p>
        <span class="h3-span">posted ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago</span>
        <div class="link-box">
          <a href="job-details.html?id=${job._id}" class="link">Details >></a>
        </div>
      `;

      jobsContainer.appendChild(jobElement);
    });
  };

  // Function to fetch and (optionally) filter jobs
  const fetchAndRenderJobs = async (query = '') => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const jobs = await response.json();

      const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
      );

      renderJobs(filteredJobs);

    } catch (err) {
      console.error(err);
      jobsContainer.innerHTML = `<p>Failed to load jobs. Try again later.</p>`;
    }
  };

  // Initially load all jobs
  fetchAndRenderJobs();

  // Add event listener for search
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchAndRenderJobs(query);
  });
});
