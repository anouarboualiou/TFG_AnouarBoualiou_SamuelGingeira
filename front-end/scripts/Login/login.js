const form = document.getElementById("loginForm")

form.addEventListener('submit', async (e) => {

    e.preventDefault()

    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const errorText = document.getElementById('loginError')

    const email = emailInput.value
    const password = passwordInput.value

    // Reset visual
    errorText.classList.add('d-none')
    emailInput.classList.remove('is-invalid')
    passwordInput.classList.remove('is-invalid')

     try {

        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (!res.ok) {

            // Mostrar error bonito
            errorText.classList.remove('d-none')

            // Bordes rojos bootstrap
            emailInput.classList.add('is-invalid')
            passwordInput.classList.add('is-invalid')

            return
        }

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        if (data.user.rol === 'superadmin') {
            window.location.href = '/superadmin'
        } else {
            window.location.href = '/dashboard'
        }

    }
    catch (err) {

        console.error(err)

        errorText.textContent = 'Error del servidor'
        errorText.classList.remove('d-none')
    }
})