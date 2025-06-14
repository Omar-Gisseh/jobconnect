window.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('http://localhost:5000/api/jobs');
  const jobs = await response.json();

  const jobListContainer = document.querySelector('.job-list');
  jobListContainer.innerHTML = '';

  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.innerHTML = `
      <h2>${job.title}</h2>
      <p><strong>${job.company}</strong> - ${job.location}</p>
      <p>${job.descripttion}</p>
      <a href="job-details.html?id=${job._id}" class="detail-btn">View Details</a>
    `;
    jobListContainer.appendChild(jobCard);
  });
});
