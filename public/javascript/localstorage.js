// DOM INFORMATION

const li1 = document.getElementsByTagName('ul')[0].getElementsByTagName('li')[0];
const li2 = document.getElementsByTagName('ul')[0].getElementsByTagName('li')[1];
const li3 = document.getElementsByTagName('ul')[0].getElementsByTagName('li')[2];
const li4 = document.getElementsByTagName('ul')[0].getElementsByTagName('li')[3];
const li5 = document.getElementsByTagName('ul')[0].getElementsByTagName('li')[4];
const li6 = document.getElementsByTagName('ul')[0].getElementsByTagName('li')[5];

const URLIndex = 'http://localhost:3000/'
const URLCompany = 'http://localhost:3000/companies'
const URLUsers = 'http://localhost:3000/users'
const URLRegions = 'http://localhost:3000/locations'
const URLLogin = 'http://localhost:3000/login'


// FUNCTION - PASSIVE

/**
 * 
 *          <li><a id="1" href="/">Contactos</a></li>
            <li><a id="2" href="/companies">Compañias</a></li>
            <li><a id="3" href="/users">Usuarios</a></li>
            <li><a id="4" href="/regions">Region/Ciudad</a></li>
            <li><a id="5" href="/login">Login</a></li>
            <li><a id="6" href="/login">Log out</a></li>} data 
 */

function hideShowHeader(data) {
        li1.classList.add('hidden');
        li2.classList.add('hidden');
        li3.classList.add('hidden');
        li4.classList.add('hidden');
        li5.classList.add('hidden');
        li6.classList.add('hidden');
    if (data == 'ADM') {
        li1.classList.remove('hidden');
        li2.classList.remove('hidden');
        li3.classList.remove('hidden');
        li4.classList.remove('hidden');
        li6.classList.remove('hidden');
    }
    else if (data == 'USER') {
        li1.classList.remove('hidden');
        li2.classList.remove('hidden');
        li4.classList.remove('hidden');
        li6.classList.remove('hidden');
    } else {
        li5.classList.remove('hidden');
    }
}

hideShowHeader(localStorage.getItem('header'));


// FUNCTION - ACTIVE


li6.addEventListener('click' , () => {
    localStorage.setItem('token', '');
    localStorage.setItem('header', '');
})


// CHECK LS