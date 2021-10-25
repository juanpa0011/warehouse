//const axios = require('axios').default;
//import axios from 'axios';

// DOM 
const loader = document.getElementById('loader-folder');

const table = document.getElementsByClassName('container-contacts')[0];

const popUp = document.getElementById('container-pop-up');
const popUpCancel = document.getElementById("pop-up--cancel-operation");
const popUpConfirm = document.getElementById("pop-up--confirm-operation");

const addContact= document.getElementById('add-contact');

const downarrow = document.getElementById('downarrow');

const searchButton = document.getElementById('search-activate');

// URLs FETCHS

const urlDataLocation = `http://localhost:3000/locationData`;

const urlCompanies = `http://localhost:3000/companyData`;

const urlContacts = `http://localhost:3000/contactData`;

const urlSearchNameContact = `http://localhost:3000/contact/name`;
const urlSearchEmailContact = `http://localhost:3000/contact/email`;
const urlSearchCompanyContact = `http://localhost:3000/contact/company`;

const urlContactQuery = `http://localhost:3000/contact`;

// CLASS 

class Location {
    constructor (element) {
        this.name = element.region;
        this.arrayCountries = element.paises;
        this.arrayCities = element.ciudades;
    }
}

class Company { // CO.name AS name, CO.dir AS dir, P.name AS country, C.name AS city
    constructor (element) {
        this.name = element.name;
        this.dir = element.dir;
        this.country = element.country;
        this.city = element.city;
    }
}

class Contact { // CO.name AS name, CO.dir AS dir, P.name AS country, C.name AS city
    constructor (element) {
        this.first_name = element.first_name; // INPUTS
        this.last_name = element.last_name;
        this.email = element.email;

        this.country = element.country; // SELECT
        this.city = element.city;

        this.compania = element.compania; // SELECT - INPUT
        this.cargo = element.cargo;

        this.canales = element.canales; // SELECT

        this.interes = element.interes; // BTNS
    }
}

// VARIABLES

const arrayContacts = [];

const arrayLocations = [];

const arrayCompanies = [];

// FUNCTIONS //

function editPopUp(element, documentsArray, aux) {
    element.addEventListener('click', () => {
        popUp.classList.remove('hidden');
        popUp.getElementsByTagName('h2')[0].innerText = 'Editar contacto ' + documentsArray[0];
        let arrayCountries = popUp.getElementsByClassName('location-selector')[0].getElementsByClassName('country-select');

        // UI - MIDDLE - SELECTORS (LOCATIONS / COMPANIES)
        for (let index1 = 0; index1 < arrayCountries.length; index1++) {
            let subSelecter = arrayCountries[index1].getElementsByTagName('optgroup');

            for (let index2 = 0; index2 < subSelecter.length; index2++) {
                let values = subSelecter[index2].getElementsByTagName('option');

                for (let index3 = 0; index3 < values.length; index3++) {

                    if (values[index3].value == documentsArray[1]) {
                        let showSelect = popUp.getElementsByClassName('location-selector')[0].getElementsByClassName('region-select')[0];
                        showSelect.value = values[index3].getAttribute('class');

                        arrayCountries[index1].classList.remove('hidden');
                        arrayCountries[index1].value = documentsArray[1];
                    }
                }
            }
        }
        let fork = popUp.getElementsByClassName('company-selector')[0].getElementsByTagName('select')[0];
        fork.value =  documentsArray[2];

        // UI - END - CHECKBOXES - CHANNELS
        let arrayChannels = popUp.getElementsByClassName('channels')[0].getElementsByTagName('div');
        for (let index = 0; index < arrayChannels.length; index++) {
            arrayChannels[index].getElementsByTagName('input')[0].checked = false;
        }
        for (let index = 0; index < arrayChannels.length; index++) {
            let aux = arrayChannels[index].getElementsByTagName('input')[0].getAttribute('id').split('-')[0];
            for (let index2 = 0; index2 < documentsArray[4].length; index2++) {
                if (aux == documentsArray[4][index2].toLowerCase()) {
                    arrayChannels[index].getElementsByTagName('input')[0].checked = true;
                }
            }
        }
        let interestBars = popUp.getElementsByClassName('select-interest')[0];
        interestBars.classList.remove('A25');
        interestBars.classList.remove('A50');
        interestBars.classList.remove('A75');
        interestBars.classList.remove('A100');

        if (documentsArray[5] == "showInterest25") {
            interestBars.classList.add('A25');
        }
        if (documentsArray[5] == "showInterest50") {
            interestBars.classList.add('A50');
        }
        if (documentsArray[5] == "showInterest75") {
            interestBars.classList.add('A75');
        }
        if (documentsArray[5] == "showInterest100") {
            interestBars.classList.add('A100');
        }
    })
}

function deletePopUp (element, documentsArray, aux) {
    element.addEventListener('click', () => {
        popUp.classList.remove('hidden');
        popUp.getElementsByTagName('h2')[0].innerText = 'Eliminar contacto ' + documentsArray[0];
        let arrayCountries = popUp.getElementsByClassName('location-selector')[0].getElementsByClassName('country-select');

        // UI - MIDDLE - SELECTORS (LOCATIONS / COMPANIES)
        for (let index1 = 0; index1 < arrayCountries.length; index1++) {
            let subSelecter = arrayCountries[index1].getElementsByTagName('optgroup');

            for (let index2 = 0; index2 < subSelecter.length; index2++) {
                let values = subSelecter[index2].getElementsByTagName('option');

                for (let index3 = 0; index3 < values.length; index3++) {

                    if (values[index3].value == documentsArray[1]) {
                        let showSelect = popUp.getElementsByClassName('location-selector')[0].getElementsByClassName('region-select')[0];
                        showSelect.value = values[index3].getAttribute('class');

                        arrayCountries[index1].classList.remove('hidden');
                        arrayCountries[index1].value = documentsArray[1];
                    }
                }
            }
        }
        let fork = popUp.getElementsByClassName('company-selector')[0].getElementsByTagName('select')[0];
        fork.value =  documentsArray[2];

        // UI - END - CHECKBOXES - CHANNELS
        let arrayChannels = popUp.getElementsByClassName('channels')[0].getElementsByTagName('div');
        for (let index = 0; index < arrayChannels.length; index++) {
            arrayChannels[index].getElementsByTagName('input')[0].checked = false;
        }
        for (let index = 0; index < arrayChannels.length; index++) {
            let aux = arrayChannels[index].getElementsByTagName('input')[0].getAttribute('id').split('-')[0];
            for (let index2 = 0; index2 < documentsArray[4].length; index2++) {
                if (aux == documentsArray[4][index2].toLowerCase()) {
                    arrayChannels[index].getElementsByTagName('input')[0].checked = true;
                }
            }
        }
        let interestBars = popUp.getElementsByClassName('select-interest')[0];
        interestBars.classList.remove('A25');
        interestBars.classList.remove('A50');
        interestBars.classList.remove('A75');
        interestBars.classList.remove('A100');
        
        if (documentsArray[5] == "showInterest25") {
            interestBars.classList.add('A25');
        }
        if (documentsArray[5] == "showInterest50") {
            interestBars.classList.add('A50');
        }
        if (documentsArray[5] == "showInterest75") {
            interestBars.classList.add('A75');
        }
        if (documentsArray[5] == "showInterest100") {
            interestBars.classList.add('A100');
        }
    })
}

function companyArray(info) {
    while (arrayCompanies.length > 0) {
        arrayCompanies.pop();
    }
    info.data.forEach(element => {
        const obj = new Company (element);
        arrayCompanies.push(obj)
    });
}

function contactArray(info) {
    while (arrayContacts.length > 0) {
        arrayContacts.pop();
    }
    info.data.forEach(element => {
        const obj = new Contact (element);
        arrayContacts.push(obj)
    });
}
// ############ START OF UI

function createUI () {
    let h2 = popUp.getElementsByTagName('h2')[0];
    h2.innerText = 'AGREGAR CONTACTO';

    let labelOne = document.createElement('label');
    labelOne.innerText = 'Nombre:';
    let inputOne = document.createElement('input');
    inputOne.required

    popUp.appendChild(labelOne);
    popUp.appendChild(inputOne);

    let labelTwo = document.createElement('label');
    labelTwo.innerText = 'Apellido:';
    let inputTwo = document.createElement('input');
    inputTwo.required

    popUp.appendChild(labelTwo);
    popUp.appendChild(inputTwo);

    let labelThree = document.createElement('label');
    labelThree.innerText = 'Email:';
    let inputThree = document.createElement('input');
    inputThree.required

    popUp.appendChild(labelThree);
    popUp.appendChild(inputThree);

    let labelFour = document.createElement('label');
    labelFour.innerText = 'Cargo:'
    let inputFour = document.createElement('input');
    inputFour.required

    popUp.appendChild(labelFour);
    popUp.appendChild(inputFour);

    let locationSelect = document.createElement('div');
    locationSelect.classList.add('location-selector');

    let companySelector = document.createElement('div');
    companySelector.classList.add('company-selector');

    let channels = document.createElement('div');
    channels.classList.add('channels');

    let interestContainer = document.createElement('div');
    interestContainer.classList.add('select-interest');

    createLocation(locationSelect);
    createCompanies(companySelector)
    createChannels(channels);
    createInterest(interestContainer);

    popUp.appendChild(locationSelect);
    popUp.appendChild(companySelector);
    popUp.appendChild(channels);
    popUp.appendChild(interestContainer);
}

function createChannels(div) {
    for (let index = 0; index < 5; index++) {
        let divSub = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label');

        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "channel");

        switch (index) {
            case 0:
                input.setAttribute("id","instagram-check");
                label.setAttribute("for","instagram-check");
                label.innerText = 'Instagram'
                break;
            case 1:
                input.setAttribute("id","twitter-check");
                label.setAttribute("for","twitter-check");
                label.innerText = 'Twitter'
                break;

            case 2:
                input.setAttribute("id","whatsapp-check");
                label.setAttribute("for","whatsapp-check");
                label.innerText = 'Whatsapp'
                break;

            case 3:
                input.setAttribute("id","telegram-check");
                label.setAttribute("for","telegram-check");
                label.innerText = 'Telegram'
                break;

            case 4:
                input.setAttribute("id","facebook-check");
                label.setAttribute("for","facebook-check");
                label.innerText = 'Facebook'
                break;
        }
        divSub.appendChild(input);
        divSub.appendChild(label);
        div.appendChild(divSub);
    }
}

function createCompanies(div) {

    let label = document.createElement('div');
    label.innerText = 'Compañia:';

    div.appendChild(label);

    axios({
        method: 'GET',
        url: urlCompanies,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(res => {
        companyArray(res);
        let select = document.createElement('select');
        select.classList.add('region-select');
        arrayCompanies.forEach(element => {
            let option = document.createElement('option');
            option.value = element.name;
            option.innerText = element.name;

            select.appendChild(option)
        });
        div.appendChild(select);
    }).catch (err => {
        console.log(err);
    });
}

function createInterest(interestContainer) {

    for (let index = 0; index < 4; index++) {
        let interestBar = document.createElement('div');
        interestBar.classList.add('interestbar');

        let topCover = document.createElement('div');
        let heart = document.createElement('div');
        let bottomCover = document.createElement('div');

        topCover.classList.add('top-cover');
        heart.classList.add('heart');
        bottomCover.classList.add('bottom-cover');

        interestBar.appendChild(topCover);
        interestBar.appendChild(heart);
        interestBar.appendChild(bottomCover);

        createInterestListeners(interestBar, index)
        
        interestContainer.appendChild(interestBar);
    }
}

function createInterestListeners(bar, index) {
    switch (index) {
        case 0:
            bar.addEventListener('mouseover', () => {
                bar.parentElement.classList.add('I25')
            })
            bar.addEventListener('mouseleave', () => {
                bar.parentElement.classList.remove('I25');
            })
            bar.addEventListener('click', () => {
                bar.parentElement.classList.toggle('A25');
            })
            break;
        case 1:
            bar.addEventListener('mouseover', () => {
                bar.parentElement.classList.add('I50');
            })
            bar.addEventListener('mouseleave', () => {
                bar.parentElement.classList.remove('I50');
            })
            bar.addEventListener('click', () => {
                bar.parentElement.classList.toggle('A50');
            })
            break;

        case 2:
            bar.addEventListener('mouseover', () => {
                bar.parentElement.classList.add('I75');
            })
            bar.addEventListener('mouseleave', () => {
                bar.parentElement.classList.remove('I75');
            })
            bar.addEventListener('click', () => {
                bar.parentElement.classList.toggle('A75');
            })
            break;

        case 3:
            bar.addEventListener('mouseover', () => {
                bar.parentElement.classList.add('I100');
            })
            bar.addEventListener('mouseleave', () => {
                bar.parentElement.classList.remove('I100');
            })
            bar.addEventListener('click', () => {
                bar.parentElement.classList.toggle('A100');
            })
            break;
    }
}

function createLocation(div) {
    let labelRegion = document.createElement('label');
    labelRegion.innerText = "Region/Ciudad";
    
    let regionSelect = document.createElement('select');
    regionSelect.classList.add('region-select');
    regionSelect.addEventListener('change', () => {
        searchChildSelector(regionSelect.value);
    })

    let defaults = document.createElement('option');
    defaults.value = '';
    defaults.innerText = '';
    regionSelect.appendChild(defaults);

    while (arrayLocations.length > 0) {
        arrayLocations.pop();
    }
    axios({
        method: 'GET',
        url: urlDataLocation,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(res => {
        res.data.forEach(element => {
            const obj = new Location (element);
            arrayLocations.push(obj)
        });
        arrayLocations.forEach(region => {
            let regionOpt = document.createElement('option');
            regionOpt.value = region.name;
            regionOpt.innerText = region.name;
    
            let countrySelect = document.createElement('select');

            if (region.arrayCountries != null) {
                let trueArrayCountries = region.arrayCountries.split(',');
                trueArrayCountries.forEach(country => {
                    // CREATE SUB-GROUP - COUNTRY
                    let countryOpt = document.createElement('optgroup');
                    countryOpt.label = country;
                    
                    let trueArrayCities = region.arrayCities.split(',');
                    trueArrayCities.forEach(city => {
                        if (city.split('$')[1] == country) {
                            // IF CITY NODE == TO COUNTRY NAME | CREATE OPTION
                            // ... UNDER SUB-GROUP COUNTRY. ELSE - PASS
                            let cityOpt = document.createElement('option');
                            cityOpt.classList.add(region.name);
                            cityOpt.value = city.split('$')[0];
                            cityOpt.innerText = city.split('$')[0];
                            countryOpt.appendChild(cityOpt)
                        }
                    });
                    if(!countryOpt.hasChildNodes()) {
                        let cityOpt = document.createElement('option');
                        cityOpt.classList.add(region.name);
                        cityOpt.value = 'No city avaliable';
                        cityOpt.innerText = 'No city avaliable';
                        countryOpt.appendChild(cityOpt);
                    }
                    countrySelect.appendChild(countryOpt);
                    countrySelect.classList.add('country-select');
                    countrySelect.classList.add('hidden');
                    div.appendChild(countrySelect);
                    //countrySelect.classList.add('hidden');
                });
            }
            
            regionSelect.appendChild(regionOpt);
        });
    }).catch (err => {
        console.log(err);
    });
    div.appendChild(labelRegion);
    div.appendChild(regionSelect);
    popUp.appendChild(div);
}

// ############ END OF UI

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
        array[index].classList.add('hidden')
    }
}

function showSelected (aux) {
    let array = document.getElementsByClassName('country-select');
    for (let index = 0; index < array.length; index++) {
        let group = array[index].getElementsByTagName('optgroup')[0];
        if (group.getElementsByTagName('option')[0].getAttribute('class', aux) == aux) {
            return array[index].classList.remove('hidden');
        }
    }
}

function createContacts(data) {
    let cover = document.createElement('div');
    let folder = document.createElement('div');

    cover.classList.add('folder-cover');
    folder.classList.add('contact-folder');
    let input = document.createElement('input');
    input.type = 'checkbox'
    input.classList.add('maybe'); // Consider later on create Import Export Buttons.


    // DIV WITH NAME - IMG
    let contactNameDiv = document.createElement('div');

    let h3name = document.createElement('h3');
    let pEmail = document.createElement('p');
    let noImgDiv = document.createElement('div')

    noImgDiv.classList.add('contact-img')
    noImgDiv.classList.add('no-img')
    contactNameDiv.classList.add('contact-name');

    h3name.innerText = data.first_name + ' ' + data.last_name;
    pEmail.innerText = data.email

    contactNameDiv.appendChild(h3name)
    contactNameDiv.appendChild(pEmail)
    contactNameDiv.appendChild(noImgDiv)

    folder.appendChild(input); // div located before contact name
    folder.appendChild(contactNameDiv);


    // DIV WITH LOCATIONS

    let locationDiv = document.createElement('div');
    let locH3 = document.createElement('h3')
    let locH4 = document.createElement('h4')

    locH3.innerText = data.country;
    locH4.innerText = data.city;

    locationDiv.appendChild(locH3)
    locationDiv.appendChild(locH4)

    folder.appendChild(locationDiv);

    // Company DIV

    let companyDiv = document.createElement('div');
    let corpH3 = document.createElement('h3')

    corpH3.innerText = data.compania

    companyDiv.appendChild(corpH3)

    folder.appendChild(companyDiv);

    // charge / cargo - div

    let chargeDiv = document.createElement('div');
    let chargeH3 = document.createElement('h3')

    chargeH3.innerText = data.cargo

    chargeDiv.appendChild(chargeH3)

    folder.appendChild(chargeDiv);

    // CREATE PREFFER CHANNELS

    let channelDiv = document.createElement('div')

    let arrayCanal = data.canales.split(',')
    if (arrayCanal.length == 0) {
        let emptyChannels = document.createElement('h5');
        emptyChannels.innerText = "No preffered channel";
        channelDiv.appendChild(emptyChannels);
    } else {
        arrayCanal.forEach(canalName => {
            let channel = document.createElement('h5');
            channel.innerText = canalName;
            channelDiv.appendChild(channel);
        });
    }

    folder.appendChild(channelDiv);

    // INTEREST BUBBLES
    let divInterest = document.createElement('div');
    let divSelector = document.createElement('div')
    if (data.interes == 0) {
        divSelector.classList.add('showInterest0');
    }
    if (data.interes == 25) {
        divSelector.classList.add('showInterest25');
    }
    if (data.interes == 50) {
        divSelector.classList.add('showInterest50');
    }
    if (data.interes == 75) {
        divSelector.classList.add('showInterest75');
    }
    if (data.interes == 100) {
        divSelector.classList.add('showInterest100');
    }

    for (let index = 0; index < 4; index++) {
        let interestBar = document.createElement('div');
        interestBar.classList.add('interestbar');

        let topCover = document.createElement('div');
        let heart = document.createElement('div');
        let bottomCover = document.createElement('div');

        topCover.classList.add('top-cover');
        heart.classList.add('heart');
        bottomCover.classList.add('bottom-cover');

        interestBar.appendChild(topCover);
        interestBar.appendChild(heart);
        interestBar.appendChild(bottomCover);

        divSelector.appendChild(interestBar);
    }

    divInterest.appendChild(divSelector);

    folder.appendChild(divInterest);

    // BUTTON HOLDER

    folderButtons(folder, '')

    cover.appendChild(folder); // FOLDER COMPLETED - ADD TO COVER

    return cover;
}

function folderButtons (node, aux) {

    // Add Button Holder
let folderHolder = document.createElement('div')
let buttonHolder = document.createElement('div');
buttonHolder.classList.add('button-holder');

let buttonEdit = document.createElement('div');
buttonEdit.classList.add('button-edit');

let buttonDelete = document.createElement('div');
buttonDelete.classList.add('button-delete');

let arrayChannels = [];

for (let index = 0; index < node.getElementsByTagName('div')[5].getElementsByTagName('h5').length; index++) {
    arrayChannels[index] = node.getElementsByTagName('div')[5].getElementsByTagName('h5')[index].innerText;
}

let arrayDocuments = [node.getElementsByClassName('contact-name')[0].getElementsByTagName('p')[0].innerText, node.getElementsByTagName('div')[2].getElementsByTagName('h4')[0].innerText, node.getElementsByTagName('div')[3].getElementsByTagName('h3')[0].innerText , node.getElementsByTagName('div')[4].getElementsByTagName('h3')[0].innerText, arrayChannels, node.getElementsByTagName('div')[6].getElementsByTagName('div')[0].getAttribute('class') ]

editPopUp (buttonEdit, arrayDocuments, aux);
deletePopUp (buttonDelete, arrayDocuments, aux);

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

function createCanales(channel) {
    let h5 = document.createElement('h5');
    h5.innerText = channel.value;

    return h5;
}

function assessQuery(String) {
    let query = String.split(' ')[0];
    console.log("SENT!")
    if (query == 'AGREGAR') {
        axionQuery(query, 'none');
    } else {
        axionQuery(query, String.split(' ')[2]);
    }
}

function axionQuery(query, target) {

    // INPUTs Text/String based information

    let first_name = popUp.getElementsByTagName('input')[0].value;
    let last_name = popUp.getElementsByTagName('input')[1].value;
    let email = popUp.getElementsByTagName('input')[2].value;
    let rank = popUp.getElementsByTagName('input')[3].value;

    // LOCATIONS Select finder

    let locSelect = popUp.getElementsByClassName('country-select');
    let locAux = ''
    for (let index = 0; index < locSelect.length; index++) {
        if (locSelect[index].getAttribute('class').split(' ').length == 1 ) {
            locAux = locSelect[index].value;
            console.log(locAux)
        }
        
    }

    // COMPANY Select finder

    let compValue = popUp.getElementsByClassName('company-selector')[0].getElementsByClassName('region-select')[0].value;
    console.log(compValue);
    
    // CHANNEL SELECTOR

    let check_insta = document.getElementById('instagram-check');
    let check_twitter = document.getElementById('twitter-check');
    let check_whatsapp = document.getElementById('whatsapp-check');
    let check_telegram = document.getElementById('telegram-check');
    let check_facebook = document.getElementById('facebook-check');

    let channelsCheck = [];


    // 1 2 3 4 5

    if (check_insta.checked == true) {
        channelsCheck.push(1);
    }
    if (check_twitter.checked == true) {
        channelsCheck.push(2);
    }
    if (check_whatsapp.checked == true) {
        channelsCheck.push(3);
    }
    if (check_telegram.checked == true) {
        channelsCheck.push(4);
    }
    if (check_facebook.checked == true) {
        channelsCheck.push(5);
    }

    // NOISE

    let showInterest = popUp.getElementsByClassName('select-interest')[0];

    let noise = 0
    if (showInterest.getAttribute('class').split(' ').length == 1) { 
        noise = 0;
    } else {
        if (showInterest.getAttribute('class').split(' ')[1] == 'A25') { noise = 25; }
        if (showInterest.getAttribute('class').split(' ')[1] == 'A50') { noise = 50; }
        if (showInterest.getAttribute('class').split(' ')[1] == 'A75') { noise = 75; }
        if (showInterest.getAttribute('class').split(' ')[1] == 'A100') { noise = 100; }
    }
    console.log(noise)
    if (query == 'AGREGAR') {
        axios({
            method: 'POST',
            url: urlContactQuery,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                rank: rank,
                noise: noise,
                channels: channelsCheck,
                city_name: locAux,
                company_name: compValue
            }
        }).then(res => {
            
        }).catch (err => {
            console.log(err);
        });
    }
    if (query == 'EDITAR') {
        axios({
            method: 'PUT',
            url: urlContactQuery,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                rank: rank,
                noise: noise,
                channels: channelsCheck,
                city_name: locAux,
                company_name: compValue,
                target: target
            }
        }).then(res => {
            
        }).catch (err => {
            console.log(err);
        });
    }
    if (query == 'ELIMINAR') {
        axios({
            method: 'DELETE',
            url: urlContactQuery,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                target: target
            }
        }).then(res => {
            
        }).catch (err => {
            console.log(err);
        });
    }
}

// FUNCTIONS - ACTIVE

popUpCancel.addEventListener('click', () => {
    loader.classList.remove('hidden');
    popUp.classList.add('hidden');
    setTimeout(() => {
        loader.classList.add('hidden')
    }, 1000);
})

popUpConfirm.addEventListener('click', () => {
    loader.classList.remove('hidden');
    assessQuery(popUp.firstElementChild.innerText);
    setTimeout(() => {
        window.location.reload(false); 
    }, 1000);
})

addContact.addEventListener('click', () => {
    popUp.classList.remove('hidden');
    popUp.getElementsByTagName('h2')[0].innerText = 'Agregar contacto';
    let arrayChannels = popUp.getElementsByClassName('channels')[0].getElementsByTagName('div');
    for (let index = 0; index < arrayChannels.length; index++) {
        arrayChannels[index].getElementsByTagName('input')[0].checked = false;
    }
    let interestBars = popUp.getElementsByClassName('select-interest')[0];
        interestBars.classList.remove('A25');
        interestBars.classList.remove('A50');
        interestBars.classList.remove('A75');
        interestBars.classList.remove('A100');
})

downarrow.addEventListener('click', () => {
    let select = downarrow.parentElement.getElementsByTagName('select')[0]
    select.classList.toggle('hidden');
    select.addEventListener('change', () => {
        let input = downarrow.parentElement.getElementsByTagName('input')[0];
        if (select.value == 'name') {
            input.placeholder = 'Hernesto Gomes'
        }
        if (select.value == 'email') {
            input.placeholder = 'Hernestogomes@domain.com'
        }
        if (select.value == 'company') {
            input.placeholder = 'Hernesto INC Gomes'
        }
    })
})

searchButton.addEventListener('click', () => {
    console.log(urlDataLocation)

    let input = downarrow.parentElement.getElementsByTagName('input')[0].value;
    let having = downarrow.parentElement.getElementsByTagName('select')[0].value;
    input = input + '%'
    searchAxionContacts(input, having);
})

document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        searchButton.addEventListener('click', () => {
            console.log(urlDataLocation)
        
            let input = downarrow.parentElement.getElementsByTagName('input')[0].value;
            let having = downarrow.parentElement.getElementsByTagName('select')[0].value;
            input = input + '%'
            searchAxionContacts(input, having);
        })
    }
})
// FETCHES (?) AXIONS

function emptyTable() {
    
    while (table.hasChildNodes) {
        let node = table.getElementsByClassName('folder-cover')[0];
        console.log(node)
        if (node == undefined ) {
            break;
        }
        table.removeChild(node);
    }
}

function searchAxionContacts(input, having) {
    emptyTable();
    if (having == 'company') {
        axios({
            method: 'POST',
            url: urlSearchCompanyContact,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                company: input
            }
            
        }).then(res => {
            res.data.forEach(contact => {
                table.appendChild(createContacts(contact))
            })
        }).catch (err => {
            console.log(err);
        });
    }
    if (having == 'email') {
        axios({
            method: 'POST',
            url: urlSearchEmailContact,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                email: input
            }
            
        }).then(res => {
            res.data.forEach(contact => {
                table.appendChild(createContacts(contact))
            })
        }).catch (err => {
            console.log(err);
        });
    }
    if (having == 'name') {
        axios({
            method: 'POST',
            url: urlSearchNameContact,
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                name: input
            }
            
        }).then(res => {
            res.data.forEach(contact => {
                table.appendChild(createContacts(contact))
            })
        }).catch (err => {
            console.log(err);
        });
    } else {
        console.log(having);
    }
}

function defaultContactTable() {
    axios({
        method: 'GET',
        url: urlContacts,
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(res => {
        contactArray(res);
        arrayContacts.forEach(data => {
            table.appendChild(createContacts(data));
        });
    }).catch (err => {
        console.log(err);
    });
}

window.onload = () => {
    createUI();
    defaultContactTable();
    loader.classList.add('hidden');
}

// A