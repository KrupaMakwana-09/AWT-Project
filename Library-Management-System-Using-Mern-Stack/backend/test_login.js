async function testLogin() {
    const creds = {
        email: 'admin@example.com',
        password: 'admin123'
    };

    try {
        const url = 'http://localhost:5001/api/auth/login';
        console.log('Testing Login URL:', url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        });

        const status = response.status;
        const data = await response.json();
        console.log('Status Code:', status);
        console.log('Response body:', data);
    } catch (error) {
        console.error('Error fetching:', error.message);
    }
}

testLogin();
