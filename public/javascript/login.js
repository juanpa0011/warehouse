const loginBtn = document.getElementById('login-btn');
 
const URLAuthorize = 'http://localhost:3000/authorize'

// FETCHES


// FUNCTION - ACTIVE

loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const bodyLogin = {
        "username": document.getElementById('username').value,
        "password": document.getElementById('password').value
    }
    axionPostQuery(bodyLogin);
})


function axionPostQuery(bodyLogin) {
    axios({
        method: 'POST',
        url: URLAuthorize,
        headers: {
            authorization: localStorage.getItem('token')
        },
        data: {
            username: bodyLogin.username,
            password: bodyLogin.password,
        }
    }).then(res => {
        localStorage.setItem('token', `Bearer ${res.data.authorized}`);
        localStorage.setItem('header', `${res.data.role}`);
        window.location.reload(false); 
    }).catch (err => {
        console.log(err);
    })
}