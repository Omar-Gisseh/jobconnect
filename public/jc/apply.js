
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.application-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload

    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const resumeFile = document.getElementById('resume').files[0];
    const cover = document.getElementById('cover').value.trim();

    if (!name || !email || !resumeFile || !cover) {
      alert('❌ Please fill in all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fullname', name);
      formData.append('email', email);
      formData.append('resume', resumeFile);
      formData.append('cover', cover);

      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('✅ Application submitted successfully!');
        form.reset();
      } else {
        const errorData = await response.json();
        alert(`❌ Failed to submit application: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Failed to submit application due to a network or server error.');
    }
  });
});

 document.getElementById("applyBtn").addEventListener("click", function() {
    amplitude.track("Job Applied", {
      jobId: "123",
      jobTitle: "Frontend Developer"
    });
    alert("Application tracked in Amplitude!");
    });

