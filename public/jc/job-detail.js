window.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('id');

  if (!jobId) {
    document.querySelector('.jobs-header').textContent = 'Job not found';
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
    const job = await response.json();

    document.querySelector('.jobs-header').textContent = job.title;
    document.querySelector('.Company-name').innerHTML = `<strong>Company:</strong> ${job.company}`;
    document.querySelector('.Company-location').innerHTML = `<strong>Location:</strong> ${job.location}`;

    document.querySelector('.tags').innerHTML = `
      <span class="tag">${job.jobType || 'N/A'}</span>
      <span class="tag">${job.mode || 'N/A'}</span>
      <span class="tag">${job.level || 'N/A'}</span>
    `;

    document.querySelector('.job-description p').textContent = job.descripttion;

    const requirementsList = document.querySelector('.requirements-list');
    job.requirements?.forEach(req => {
      const li = document.createElement('li');
      li.textContent = req;
      requirementsList.appendChild(li);
    });

    const perksList = document.querySelector('.perks-list');
    job.perks?.forEach(perk => {
      const li = document.createElement('li');
      li.textContent = perk;
      perksList.appendChild(li);
    });

  } catch (error) {
    console.error(error);
    document.querySelector('.jobs-header').textContent = 'Error loading job details.';
  }
});
