// DOM //
const buttonAdd = document.getElementById('add-company');

const popUp = document.getElementById("container-pop-up");
const popUpCancel = document.getElementById("pop-up--cancel-operation");
const popUpConfirm = document.getElementById("pop-up--confirm-operation");

const contactTable = document.getElementsByClassName('container-table')[0];

const loader = document.getElementById('loader-folder');

// VARIABLE - CONST //

const arrayRegions = [];

const URLLocations = `http://localhost:3000/locationData`;

const URLCompanies = `http://localhost:3000/companyData`;

const URLQueryCompany = `http://localhost:3000/company`;

// CLASS //

class Location {
    constructor (element) {
        this.name = element.region;
        this.arrayCountries = element.paises;
        this.arrayCities = element.ciudades;
    }
}

// FUNCTIONS //

function folderButtons (node, aux) {

    // Add Button Holder
let folderHolder = document.createElement('div')
let buttonHolder = document.createElement('div');
buttonHolder.classList.add('button-holder');

let buttonEdit = document.createElement('div');
buttonEdit.classList.add('button-edit');

let buttonDelete = document.createElement('div');
buttonDelete.classList.add('button-delete');

editPopUp (buttonEdit, node.firstElementChild.getElementsByTagName('h3')[0].innerText, aux);
deletePopUp (buttonDelete, node.firstElementChild.getElementsByTagName('h3')[0].innerText, aux);

// Helpers

let helperPopEdit = document.createElement('div');
helperPopEdit.classList.add('helper-pop-up');
helperPopEdit.textContent = 'Editar'

let helperPopDelete = document.createElement('div');
helperPopDelete.classList.add('helper-pop-up');
helperPopDelete.textContent = 'Eliminar'

buttonDelete.appendChild(helperPopDelete);
buttonEdit.appendChild(helperPopEdit);

buttonHolder.appendChild(buttonDelete);
buttonHolder.appendChild(buttonEdit);

folderHolder.appendChild(buttonHolder);

node.appendChild(folderHolder);
}
function editPopUp(element, title, aux) {
    element.addEventListener('click', () => {
        popUp.classList.remove('hidden');
        let arrayInput = popUp.getElementsByTagName('input'); // .classList.add('hidden');
        for (let index = 0; index < arrayInput.length; index++) {
            arrayInput[index].classList.remove('hidden');
        }
        let arrayLabel = popUp.getElementsByTagName('label'); // .classList.add('hidden');
        for (let index = 0; index < arrayLabel.length; index++) {
            arrayLabel[index].classList.remove('hidden');
        }
        let arraySelect = popUp.getElementsByTagName('select'); // .classList.add('hidden');
        for (let index = 0; index < arraySelect.length; index++) {
            arraySelect[index].classList.remove('hidden');
            console.log("Activated")
        }
        popUp.firstElementChild.innerText = 'Editar compañia ' + title;
        popUp.getElementsByTagName('label')[0].innerText = 'Cambiar el nombre'
        popUp.getElementsByTagName('input')[0].value = title;
    })
}
function deletePopUp (element, title, aux) {
    element.addEventListener('click', () => {
        popUp.classList.remove('hidden');
        let arrayInput = popUp.getElementsByTagName('input'); // .classList.add('hidden');
        for (let index = 0; index < arrayInput.length; index++) {
            arrayInput[index].classList.add('hidden');
        }
        let arrayLabel = popUp.getElementsByTagName('label'); // .classList.add('hidden');
        for (let index = 0; index < arrayLabel.length; index++) {
            arrayLabel[index].classList.add('hidden');
        }
        let arraySelect = popUp.getElementsByTagName('select'); // .classList.add('hidden');
        for (let index = 0; index < arraySelect.length; index++) {
            arraySelect[index].classList.add('hidden');
        }
        popUp.firstElementChild.innerText = 'Eliminar compañia ' + title ;
    })
}
function regionArray (info) {
    while (arrayRegions.length > 0) {
        arrayRegions.pop();
    }
    info.forEach(element => {
        const obj = new Location (element);
        arrayRegions.push(obj)
    });
}
function createUI (arrayRegions) {
}

function searchChildSelector(node) {
    let index = node;
    hideAllCountries();
    showSelected(index);
}
function hideAllCountries () {
    let array = document.getElementsByClassName('country-select');
    if (!array) {
        return;
    }
    for (let index = 0; index < array.length; index++) {
        array[index].classList.remove('select-active');
        array[index].classList.add('hidden')
    }
}
function showSelected (aux) {
    let array = document.getElementsByClassName('country-select');
    for (let index = 0; index < array.length; index++) {
        let group = array[index].getElementsByTagName('optgroup')[0];
        if (group.getElementsByTagName('option')[0].classList.contains(aux)) {
            array[index].classList.add('select-active');
            return array[index].classList.remove('hidden');
        }
    }
}
function createFolders(data) {
    // FOLDER-COVER - CONTACT-FOLDER -(DIV-H3-%VALUE)

    let cover = document.createElement('div');
    let folder = document.createElement('div');

    cover.classList.add('folder-cover');
    folder.classList.add('contact-folder');

    // COMPANY NAME - START
    let divname = document.createElement('div');
    let h3name = document.createElement('h3');

    h3name.innerText = data.name;

    divname.appendChild(h3name);
    folder.appendChild(divname);
    // COMPANY NAME - END


    // COMPANY REG - START
    let divlocation = document.createElement('div');
    let h3country = document.createElement('h3');
    let h4city = document.createElement('h4');

    h4city.innerText = data.city;
    h3country.innerText = data.country;

    divlocation.appendChild(h3country);
    folder.appendChild(divlocation);
    // COMPANY REG - END

    // COMPANY DIR - START
    let divdir = document.createElement('div');
    let h3dir = document.createElement('p');

    h3dir.innerText = data.dir;

    divdir.appendChild(h3dir);
    folder.appendChild(divdir);
    // COMPANY DIR - END

    folderButtons(folder, '')

    cover.appendChild(folder); // FOLDER COMPLETED - ADD TO COVER

    return cover;
}
function locateTarget(String, aux) {
    let target = ''
    for (let aux = 2; aux < String.split(' ').length; aux++){
        target = target + String.split(' ')[aux] + ' ';
    }
    return target;
}

// FUNCTIONs - PASSIVE //

async function regions(URLLocations) {
    
    if (popUp.getElementsByClassName('location-selector')[0] != undefined) {
        const aux = document.getElementsByClassName('location-selector')[0];
        aux.parentElement.removeChild(aux);
    }

    let locationSelect = document.createElement('div');
    locationSelect.classList.add('location-selector');

    let labelRegion = document.createElement('label');
    labelRegion.innerText = "Region/Ciudad"
    
    let regionSelect = document.createElement('select');
    regionSelect.classList.add('region-select');
    regionSelect.addEventListener('change', () => {
        searchChildSelector(regionSelect.value);
    })
    let defaults = document.createElement('option');
    defaults.value = '';
    defaults.innerText = '';
    regionSelect.appendChild(defaults);

    axios({
        method: 'GET',
        url: URLLocations,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(res => {
        console.log(res.data)
        res.data.forEach(region => {
            console.log(region.region)
            let regionOpt = document.createElement('option');
            regionOpt.value = region.region;
            regionOpt.innerText = region.region;
    
            let countrySelect = document.createElement('select');

            if (region.paises != null) {
                let trueArrayCountries = region.paises.split(',');
                trueArrayCountries.forEach(country => {
                // CREATE SUB-GROUP - COUNTRY
                let countryOpt = document.createElement('optgroup');
                countryOpt.label = country;
                
                if (region.ciudades != null) {
                    let trueArrayCities = region.ciudades.split(',');
                    trueArrayCities.forEach(city => {
                        if (city.split('$')[1] == country) {
                            // IF CITY NODE == TO COUNTRY NAME | CREATE OPTION
                            // ... UNDER SUB-GROUP COUNTRY. ELSE - PASS
                            let cityOpt = document.createElement('option');
                            cityOpt.classList.add(region.region);
                            cityOpt.value = city.split('$')[0];
                            cityOpt.innerText = city.split('$')[0];
                            countryOpt.appendChild(cityOpt)
                        }
                    });
                    if(!countryOpt.hasChildNodes()) {
                        let cityOpt = document.createElement('option');
                        cityOpt.classList.add(region.region);
                        cityOpt.value = 'No city avaliable';
                        cityOpt.innerText = 'No city avaliable';
                        countryOpt.appendChild(cityOpt);
                    }
                    countrySelect.appendChild(countryOpt);
                    countrySelect.classList.add('country-select');
                    countrySelect.classList.add('hidden');
                    locationSelect.appendChild(countrySelect);
                }
                
                //countrySelect.classList.add('hidden');
            });
            regionSelect.appendChild(regionOpt);
            } else {
                let countryOpt = document.createElement('optgroup');
                countryOpt.label = 'No data avaliable';
                countrySelect.appendChild(countryOpt);
            }
        });
    }).catch (err => {
        console.log(err);
    })

    locationSelect.appendChild(labelRegion);
    locationSelect.appendChild(regionSelect);
    popUp.appendChild(locationSelect);
}
async function companies(URLCompanies) {
    axios({
        method: 'GET',
        url: URLCompanies,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(res => {
        console.log(res)
        res.data.forEach(data => {
            contactTable.appendChild(createFolders(data));
        });
    }).catch (err => {
        console.log(err);
    })
}

/**
 * 
 * @param {headers: {
            authorization: localStorage.getItem('token')
        }} String 
 */

// FETCHs AXIOns //

function assessQuery(String) {
    let query = String.split(' ')[0];
    let location = String.split(' ')[1];

    // EJ: AGREGAR - REG/COUN/CITY - TARGET(NAME)
    if (query == 'ELIMINAR') {
        let target = locateTarget(String, 2);
        axionDelete(target)
    }
    if (query == 'EDITAR') {
        let target = locateTarget(String, 2);
        let inputName = popUp.getElementsByTagName('input')[0].value; // VALUES FROM POP-UPs Inputs.
        let inputDir = popUp.getElementsByTagName('input')[1].value;
        let citySelect = popUp.getElementsByClassName('select-active')[0].value;
        axionEdit(inputName,inputDir,citySelect, target);
    }
    if (query == 'AGREGAR') {

        let inputName = popUp.getElementsByTagName('input')[0].value; // VALUES FROM POP-UPs Inputs.
        let inputDir = popUp.getElementsByTagName('input')[1].value;
        let citySelect = popUp.getElementsByClassName('select-active')[0];
        if (citySelect != undefined) {
            axionPostQuery(inputName, inputDir, citySelect.value)
        }
        alert('No se seleciono una ubicacion concreta o el almacen de datos no tiene ninguna guardada.')
    }
}
function axionPostQuery(inputName, inputDir, citySelect) {
        axios({
            method: 'POST',
            url: URLQueryCompany,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: inputName,
                dir: inputDir,
                citySelect: citySelect
            }
        }).then(res => {
            console.log("COMPLETED THE QUERY: " + 'POST' + " WITH THIS DATA " + data);
        }).catch (err => {
            console.log(err);
        })
        window.location.reload(false); 
}
function axionEdit(inputName, inputDir, citySelect, target) {
        axios({
            method: 'PUT',
            url: URLQueryCompany,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: inputName,
                dir: inputDir,
                citySelect: citySelect,
                target: target
            }
        }).then(res => {
            
        }).catch (err => {
            console.log(err);
        })
        window.location.reload(false);
}
function axionDelete(target) {
        axios({
            method: 'DELETE',
            url: URLQueryCompany,
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
    window.location.reload(false); 
}

// EVENTs - ACTIVE //

buttonAdd.addEventListener('click' , () => {
    popUp.classList.remove('hidden');
    createUI(arrayRegions);
    let arrayInput = popUp.getElementsByTagName('input'); // .classList.add('hidden');
        for (let index = 0; index < arrayInput.length; index++) {
            arrayInput[index].classList.remove('hidden');
        }
        let arrayLabel = popUp.getElementsByTagName('label'); // .classList.add('hidden');
        for (let index = 0; index < arrayLabel.length; index++) {
            arrayLabel[index].classList.remove('hidden');
        }
        let arraySelect = popUp.getElementsByTagName('select'); // .classList.add('hidden');
        for (let index = 0; index < arraySelect.length; index++) {
            arraySelect[index].classList.remove('hidden');
        }
    popUp.firstElementChild.innerText = "Agregar Compañia";
    popUp.getElementsByTagName('label')[0].innerText = 'Nombre de la nueva Compañia:'
    popUp.getElementsByTagName('input')[0].value = '';
})
popUpCancel.addEventListener('click', () => {
    loader.classList.remove('hidden');
    popUp.classList.add('hidden');
    setTimeout(() => {
        loader.classList.add('hidden')
    }, 1000);
})
popUpConfirm.addEventListener('click', () => {
    assessQuery(popUp.firstElementChild.innerText);
})
window.onload = () => {
    companies(URLCompanies);
    regions(URLLocations);
    loader.classList.add('hidden')
}
// FOLDER-COVER - CONTACT-FOLDER -(DIV-H3-%VALUE)

// Apparently needed -