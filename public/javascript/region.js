// DOM //
const popUp = document.getElementById("container-pop-up");

const popUpCancel = document.getElementById("pop-up--cancel-operation");
const popUpConfirm = document.getElementById("pop-up--confirm-operation");

const addRegion = document.getElementById("button-add-region");

const containerLocations = document.getElementsByClassName("container-locations")[0]

const loader = document.getElementById('loader-folder');

const URLLocations = `http://localhost:3000/locationData`;

const URLQueryRegion = `http://localhost:3000/regions`;
const URLQueryCountry = `http://localhost:3000/country`;
const URLQueryCity = `http://localhost:3000/city`;

// ARRAYS

const arrayLocations = [];

// FUNCTIONS - HTMLs Focus //

function cardButtons (node, aux) {

    // Add Button
    let buttonAdd = document.createElement('div');
    buttonAdd.classList.add('button-add');
        // Add Button Holder
    let buttonHolder = document.createElement('div');
    buttonHolder.classList.add('button-holder');

    let buttonEdit = document.createElement('div');
    buttonEdit.classList.add('button-edit');
    
    let buttonDelete = document.createElement('div');
    buttonDelete.classList.add('button-delete');
    // Helpers
    let helperPopAdd = document.createElement('div');
    helperPopAdd.classList.add('helper-pop-up');
    helperPopAdd.textContent = 'Agregar'

    let helperPopEdit = document.createElement('div');
    helperPopEdit.classList.add('helper-pop-up');
    helperPopEdit.textContent = 'Editar'

    let helperPopDelete = document.createElement('div');
    helperPopDelete.classList.add('helper-pop-up');
    helperPopDelete.textContent = 'Eliminar'

    buttonDelete.appendChild(helperPopDelete);
    buttonEdit.appendChild(helperPopEdit);
    buttonAdd.appendChild(helperPopAdd);

    buttonHolder.appendChild(buttonDelete);
    buttonHolder.appendChild(buttonEdit);

    if(aux != 'Soy leyenda'){
        addPopUp (buttonAdd, node.firstElementChild.innerHTML, aux);
        node.appendChild(buttonAdd);
    }
    editPopUp (buttonEdit, node.firstElementChild.innerHTML, aux);
    deletePopUp (buttonDelete, node.firstElementChild.innerHTML, aux);

    node.appendChild(buttonHolder);
}
function addPopUp (element, title, aux) {
    element.addEventListener('click' , () => {
        popUp.classList.remove('hidden');
        popUp.firstElementChild.innerHTML = 'Agregar ' + verifyLocation(aux) + ' EN ' + title;
        popUp.getElementsByTagName('label')[0].innerText = 'Nombre';
        popUp.getElementsByTagName('input')[0].classList.remove('hidden');
    })
}
function editPopUp(element, title, aux) {
    element.addEventListener('click', () => {
        popUp.classList.remove('hidden');
        popUp.firstElementChild.innerText = 'Editar ' + verifyParentLocation(aux) + ' ' + title;
        popUp.getElementsByTagName('label')[0].innerText = 'Editar ' + verifyParentLocation(aux);
        popUp.getElementsByTagName('input')[0].classList.remove('hidden');
    })
}
function deletePopUp (element, title, aux) {
    element.addEventListener('click', () => {
        popUp.classList.remove('hidden');
        popUp.firstElementChild.innerText = 'Eliminar ' + verifyParentLocation(aux) + ' ' + title;
        popUp.getElementsByTagName('label')[0].innerText = '¿Eliminar ' + verifyParentLocation(aux) + '?';
        popUp.getElementsByTagName('input')[0].classList.add('hidden');
    })
}
function verifyParentLocation (string) {
    let location = string.split(' ')[1]
    if(location == 'país') return 'region';
    if(location == 'ciudad') return 'país'
    return 'ciudad'
}
function verifyLocation (string) {
    return string.split(' ')[1];
}
function storeRegions(data) {
    data.forEach(element => {
        arrayLocations.push(element)
    });
}
function createFolders(data) {
        let cover = document.createElement('div');
        let folder = document.createElement('div');
        let headerFolder = document.createElement('div');
        let headerH3 = document.createElement('h3');

        // region-cover --> region --> container-header -> h3

        cover.classList.add('region-cover');
        folder.classList.add('region');
        headerFolder.classList.add('container-header');

        // H3 -> REGION'S NAME

        headerH3.innerText = data.region;

        headerFolder.appendChild(headerH3);

        cardButtons(headerFolder, 'Un país llamado');

        folder.appendChild(headerFolder);

        // --> country --> container-header -> h4 . --> city --> container-header -> h5 

        if( !(data.paises == undefined) || !(data.paises == null) ) {
            let arrayCountry = data.paises.split(',');
            arrayCountry.forEach(country => {
            let countryFolder = document.createElement('div');
            let countryHeaderFolder = document.createElement('div');
            let headerH4 = document.createElement('h3');

            // region-cover --> region --> container-header -> h3

            countryFolder.classList.add('country');
            countryHeaderFolder.classList.add('container-header');

            // H3 -> REGION'S NAME

            headerH4.innerText = country;

            countryHeaderFolder.appendChild(headerH4);

            cardButtons(countryHeaderFolder, 'Una ciudad llamada');

            countryFolder.appendChild(countryHeaderFolder);

            folder.appendChild(countryFolder);

            if (data.ciudades == null) {
                
            } else {
                let arrayState = data.ciudades.split(',');
            arrayState.forEach(elements => {
                if (elements.split('$')[1] == country) {
                    //  --> city --> container-header -> h5 

                    let stateFolder = document.createElement('div');
                    let stateHeaderFolder = document.createElement('div');
                    let headerH5 = document.createElement('h5');

                    stateFolder.classList.add('city');
                    stateHeaderFolder.classList.add('container-header');

                    headerH5.innerText = elements.split('$')[0];

                    stateHeaderFolder.appendChild(headerH5);

                    cardButtons(stateHeaderFolder, 'Soy leyenda');

                    stateFolder.appendChild(stateHeaderFolder);

                    countryFolder.appendChild(stateFolder);

                }
            });
            }
        });
        }
        cover.appendChild(folder);
        return cover;
}

// FUNCTION - ASSESSING QUERIES APIs

function locateTarget(String, aux) {
    let target = ''
    for (aux; aux < String.split(' ').length; aux++){
        target = target + String.split(' ')[aux] + ' ';
    }
    return target;
}

function assessQuery(String) {
    let query = String.split(' ')[0];
    let location = String.split(' ')[1];

    // EJ: AGREGAR - REG/COUN/CITY - TARGET(NAME)

    if (query == 'ELIMINAR') {
        let target = locateTarget(String, 2);
        axionDelete(location, target)
    }
    if (query == 'EDITAR') {
        let target = locateTarget(String, 2);
        let inputName = popUp.getElementsByTagName('input')[0].value;
        axionEdit(inputName, location, target)
    }
    if (query == 'AGREGAR') {
        let target = ''
        if (String.split(' ').length > 2) {
            target = locateTarget(String, 3);
        }

        let inputName = popUp.getElementsByTagName('input')[0].value; // VALUES FROM POP-UPs Inputs.

        axionPostQuery(inputName, location, target)
    }
}

// FUNCTIONS - ACTIVE

popUpConfirm.addEventListener('click', () => {
    assessQuery(popUp.firstElementChild.innerText);
})

addRegion.addEventListener('click' , () => {
    popUp.classList.remove('hidden');
    popUp.firstElementChild.innerText = "Agregar Region";
    popUp.getElementsByTagName('label')[0].innerText = 'Nombre:'
})

popUpCancel.addEventListener('click', () => {
    loader.classList.remove('hidden')
    popUp.classList.add('hidden');
    setTimeout(() => {
        loader.classList.add('hidden')
    }, 1000);
})

// FETCHs - AXIONs

function axionPostQuery(data, location, target) {
    if(location == 'REGION') {
        axios({
            method: 'POST',
            url: URLQueryRegion,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: data
            }
        }).then(res => {
            console.log("COMPLETED THE QUERY: " + method + " WITH THIS DATA " + data);
        }).catch (err => {
            console.log(err);
        })
    }
    if(location == 'PAÍS') {
        axios({
            method: 'POST',
            url: URLQueryCountry,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: data,
                target: target
            }
        }).then(res => {
            console.log("COMPLETED THE QUERY: " + method + " WITH THIS DATA " + data);
        }).catch (err => {
            console.log(err);
        })
    }
    if(location == 'CIUDAD') {
        axios({
            method: 'POST',
            url: URLQueryCity,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: data,
                target: target
            }
        }).then(res => {
            console.log("COMPLETED THE QUERY: " + method + " WITH THIS DATA " + data);
            console.log(res)
        }).catch (err => {
            console.log(err);
        })
    }
    window.location.reload(false); 
}
function axionEdit(data, location, target) {
    if(location == 'REGION') {
        axios({
            method: 'PUT',
            url: URLQueryRegion,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: data,
                target: target
            }
        }).then(res => {
            
        }).catch (err => {
            console.log(err);
        })
    }
    if(location == 'PAÍS') {
        axios({
            method: 'PUT',
            url: URLQueryCountry,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: data,
                target: target
            }
        }).then(res => {
        }).catch (err => {
            console.log(err);
        })
    }
    if(location == 'CIUDAD') {
        axios({
            method: 'PUT',
            url: URLQueryCity,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: data,
                target: target
            }
        }).then(res => {
        }).catch (err => {
            console.log(err);
        })
    }
    window.location.reload(false);
}
function axionDelete( location, target) {
    console.log( location + " " + target)
    if(location == 'REGION') {
        axios({
            method: 'DELETE',
            url: URLQueryRegion,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                target: target
            }
        }).then(res => {
            console.log("COMPLETED THE QUERY: " + method + " WITH THIS DATA " + data);
        }).catch (err => {
            console.log(err);
        })
    }
    if(location == 'PAÍS') {
        axios({
            method: 'DELETE',
            url: URLQueryCountry,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                target: target
            }
        }).then(res => {
            console.log("COMPLETED THE QUERY: " + method + " WITH THIS DATA " + data);
        }).catch (err => {
            console.log(err);
        })
    }
    if(location == 'CIUDAD') {
        axios({
            method: 'DELETE',
            url: URLQueryCity,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                target: target
            }
        }).then(res => {
            console.log("COMPLETED THE QUERY: " + method + " WITH THIS DATA " + data);
        }).catch (err => {
            console.log(err);
        })
    }
    window.location.reload(false); 
}

window.onload = () => {
    axios({
        method: 'GET',
        url: URLLocations,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(res => {
        console.log(res)
        res.data.forEach(data => {
            containerLocations.appendChild(createFolders(data));
        });
    }).catch (err => {
        console.log(err);
    })
    loader.classList.add('hidden')
}