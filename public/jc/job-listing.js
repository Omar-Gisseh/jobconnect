document.addEventListener('DOMContentLoaded', () => {
  const jobsContainer = document.querySelector('.jobs-container');
  const searchInput = document.getElementById('search-jobs');
  const searchButton = document.querySelector('.search-button'); // fixed
  const sortSelect = document.querySelector('.sort-select');

  const renderJobs = (jobs) => {
    jobsContainer.innerHTML = ''; 
    if (jobs.length === 0) {
      jobsContainer.innerHTML = '<p>No jobs found.</p>';
      return;
    }

    jobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('job-card');

      const postedDate = job.datePosted 
        ? new Date(job.datePosted) 
        : null;

      const daysAgo = postedDate 
        ? Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24)) 
        : null;

      const dateText = daysAgo !== null
        ? `posted ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`
        : 'Date not available';

      jobElement.innerHTML = `
        <h3>${job.title || 'No Title'} — ${job.company || 'Unknown'}, ${job.location || 'N/A'}</h3>
        <p>${job.descripttion || 'No description available'}</p>
        <span class="h3-span">${dateText}</span>
        <div class="link-box">
          <a href="job-details.html?id=${job._id}" class="link">Details >></a>
        </div>
      `;

      jobsContainer.appendChild(jobElement);
    });
  };

  const fetchAndRenderJobs = async (query = '', sortBy = '') => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const jobs = await response.json();

      let filteredJobs = jobs.filter(job =>
        job.title?.toLowerCase().includes(query.toLowerCase()) ||
        job.company?.toLowerCase().includes(query.toLowerCase()) ||
        job.location?.toLowerCase().includes(query.toLowerCase())
      );

      if (sortBy === 'Newest First') {
        filteredJobs.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
      } else if (sortBy === 'Oldest First') {
        filteredJobs.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));
      } else if (sortBy === 'Company Name') {
        filteredJobs.sort((a, b) => (a.company || '').localeCompare(b.company || ''));
      }

      renderJobs(filteredJobs);

    } catch (err) {
      console.error(err);
      jobsContainer.innerHTML = `<p>Failed to load jobs. Try again later.</p>`;
    }
  };

  // Initial load
  fetchAndRenderJobs();

  // Search button
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchAndRenderJobs(query, sortSelect.value);
  });

  // Sort dropdown
  sortSelect.addEventListener('change', () => {
    const query = searchInput.value.trim();
    fetchAndRenderJobs(query, sortSelect.value);
  });
});
