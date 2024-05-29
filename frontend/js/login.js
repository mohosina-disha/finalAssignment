document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = 'profile.html';
    } catch (error) {
        document.getElementById('error').innerText = error.message;
    }
});
