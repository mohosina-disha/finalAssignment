document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.getElementById('gender').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retypePassword').value;
    const profileImage = document.getElementById('profileImage').files[0];

    if (password !== retypePassword) {
        document.getElementById('error').innerText = "Passwords do not match!";
        return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
        const response = await fetch('http://localhost:3306/api/auth/register', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const data = await response.json();
        alert('Registration successful');
        window.location.href = 'login.html';
    } catch (error) {
        document.getElementById('error').innerText = error.message;
    }
});
