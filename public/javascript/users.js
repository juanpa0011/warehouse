// DOM
const loader = document.getElementById('loader-folder');

const table = document.getElementsByClassName('table-users')[0];

const popUp = document.getElementById('container-pop-up');
const popUpCancel = document.getElementById("pop-up--cancel-operation");
const popUpConfirm = document.getElementById("pop-up--confirm-operation");

const registerbtn = document.getElementById('registerbtn');

const URLusers = `http://localhost:3000/userData`;

const URLQueryUser = `http://localhost:3000/users`;



// VARIABLES

const arrayUsers = [];

// FUNCTION - PASSIVE

function createArray(data) {
    arrayUsers.push(data);
}

function createUsers(user) {
        let coverUser = document.createElement('div');
        let folderUser = document.createElement('div');

        let hname = document.createElement('h5');
        let hapellido = document.createElement('h5');
        let huser = document.createElement('h5');
        let hemail = document.createElement('p');

        hname.innerText = user.nombre;
        hapellido.innerText = user.apellido;
        huser.innerText = user.username;
        hemail.innerText = user.email;

        folderUser.classList.add('user-contact');
        coverUser.classList.add('cover-user');

        folderUser.append(hname);
        folderUser.append(hapellido);
        folderUser.append(huser);
        folderUser.append(hemail);
        folderUser.append(createBtnHolder(user));
        coverUser.appendChild(folderUser);

        table.appendChild(coverUser);
}

function createBtnHolder(user) {
    let coverBtnHolder = document.createElement('div');
    let btnHolder = document.createElement('div');
    btnHolder.classList.add('button-holder');

    let buttonDelete = document.createElement('div');
    buttonDelete.classList.add('button-delete');

    deletePopUp (buttonDelete, user.username);

    btnHolder.appendChild(buttonDelete);

    coverBtnHolder.appendChild(btnHolder);

    return coverBtnHolder;
}

function deletePopUp (element, title) {
    element.addEventListener('click', () => {
        popUp.classList.remove('hidden');
        popUp.firstElementChild.innerText = 'Eliminar usuario: ' + title ;
    })
}

// FUNCTIONS - ACTIVE

popUpCancel.addEventListener('click', () => {
    loader.classList.remove('hidden');
    popUp.classList.add('hidden');
    popUp.firstElementChild.innerText = '' ;
    setTimeout(() => {
        loader.classList.add('hidden')
    }, 1000);
});

popUpConfirm.addEventListener('click', () => {
    let string = popUp.firstElementChild.innerText;
    let target = string.split(' ')[2];

    if (string.split(' ')[0] == 'ELIMINAR') {
        axios({
            method: 'DELETE',
            url: URLQueryUser,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                target: target
            }
        }).then(res => {
        }).catch (err => {
            console.log(err);
        })
    }

    if (condition) {
        
    }
    window.location.reload(false); 

})

// FETCHS

async function getUsers(URLusers) {

    axios({
        method: 'GET',
        url: URLusers,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(res => {
        res.data.forEach(data => {
            createUsers(data);
        });
    }).catch (err => {
        console.log(err);
    })
}

registerbtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const bodyLogin = {
        "first_name": document.getElementById('first_name').value,
        "last_name": document.getElementById('last_name').value,
        "email": document.getElementById('email').value,
        "user": document.getElementById('user').value,
        "password": document.getElementById('password').value,
        "repassword": document.getElementById('repassword').value,
    }
    axionPostQuery(bodyLogin);
})


function axionPostQuery(bodyLogin) {
    axios({
        method: 'POST',
        url: URLQueryUser,
        headers: {
            authorization: localStorage.getItem('token')
        },
        data: {
            first_name: bodyLogin.first_name,
            last_name: bodyLogin.last_name,
            email: bodyLogin.email,
            user: bodyLogin.user,
            password: bodyLogin.password,
            repassword: bodyLogin.repassword,
        }
    }).then(res => {
        console.log(res.data)
        if(isNaN(res.data)) {
            alert(res.data)
        } else {
            window.location.reload(false);
        }
    }).catch (err => {
        console.log(err);
    })
}

// WINDOWS ON LOAD

window.onload = () => {
    getUsers(URLusers);
    loader.classList.add('hidden');
}