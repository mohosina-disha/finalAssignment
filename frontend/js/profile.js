document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3306/api/profile', {
            headers: { 'Authorization': 'Bearer ${token}' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        document.getElementById('firstName').value = data.firstName;
        document.getElementById('lastName').value = data.lastName;
        document.getElementById('gender').value = data.gender;
        document.getElementById('dateOfBirth').value = data.dateOfBirth;
        document.getElementById('email').value = data.email;
    } catch (error) {
        document.getElementById('error').innerText = error.message;
    }
});

document.getElementById('editButton').addEventListener('click', () => {
    document.getElementById('firstName').disabled = false;
    document.getElementById('lastName').disabled = false;
    document.getElementById('gender').disabled = false;
    document.getElementById('dateOfBirth').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('profileImage').style.display = 'block';
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('updateButton').style.display = 'block';
});

document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.getElementById('gender').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const email = document.getElementById('email').value;
    const profileImage = document.getElementById('profileImage').files[0];

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('email', email);
    if (profileImage) {
        formData.append('profileImage', profileImage);
    }

    try {
        const response = await fetch('http://localhost:3306/api/profile', {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        alert('Profile updated successfully');
        window.location.reload();
    } catch (error) {
        document.getElementById('error').innerText = error.message;
    }
});

document.getElementById('deleteButton').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    if (confirm('Are you sure you want to delete your account?')) {
        try {
            const response = await fetch('http://localhost:3306/api/profile', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            alert('Account deleted successfully');
            localStorage.removeItem('token');
            window.location.href = 'register.html';
        } catch (error) {
            document.getElementById('error').innerText = error.message;
        }
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});
