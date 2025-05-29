document.querySelector('.header-btn').addEventListener('click', async () => {
    const query = document.querySelector('input[type="text"]').value;
    const response = await fetch(`http://localhost:5000/api/jobs`);
    const jobs = await response.json();

    const featuredSection = document.querySelector('.featured-jobs');
    featuredSection.innerHTML = ''; // Clear existing jobs

    jobs
      .filter(job => job.title.toLowerCase().includes(query.toLowerCase()))
      .forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('jobs-container');
        jobElement.innerHTML = `
          <h2 class="jobs-h1">${job.title}</h2>
          <h3>Posted on ${new Date(job.datePosted).toDateString()}</h3>
          <p class="jobs-p">${job.descripttion}</p>
          <p><strong>${job.company}</strong> | ${job.location}</p>
          <p>Salary: ${job.salary}</p>
        `;
        featuredSection.appendChild(jobElement);
      });   


      
  });