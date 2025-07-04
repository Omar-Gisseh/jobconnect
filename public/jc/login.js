   document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const message = document.getElementById('login-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        message.style.color = 'green';
        message.textContent = ' Login successful!';
        // Optionally redirect: setTimeout(() => window.location.href = '/dashboard.html', 1000);
      } else {
        message.style.color = 'red';
        message.textContent = ` ${data.message || 'Login failed'}`;
      }
    } catch (err) {
      console.error(err);
      message.style.color = 'red';
      message.textContent = ' Network error. Please try again.';
    }
  });
});


const menuBtn = document.querySelector('.menu');
        const navSection = document.querySelector('.nav-section');
      
        menuBtn.addEventListener('click', () => {
          navSection.classList.toggle('show');
        });
