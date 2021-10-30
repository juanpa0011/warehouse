const { Router } = require('express');
const {warehouseIndex, warehouseUser, warehouseLocations, warehouseCompanies, warehouseLogin, postRegister, locationQuery, postLogin, companiesQuery, userQuery, contactQuery, postRegion, postCountry, postCity, deleteRegion, deleteCountry, deleteCity, putRegion, putCountry, putCity, postCompany, deleteCompany, putCompany, deleteUser, searchContactQueryName, searchContactQueryEmail, searchContactQueryCompany, postContact, putContact, deleteContact} = require('../controllers/api');
const {userNoExist, validateToken, dopplergangerLocation, dopplergangerCompania, dopplergangerContact, validateTokenOADMIN, passwordsMatch} = require('../middleware/middleware');
const router = Router();

// ############## APIs Direct to Files

router.get('/', warehouseIndex);
router.get('/users', warehouseUser);
router.get('/regions', warehouseLocations);
router.get('/companies', warehouseCompanies);
router.get('/login', warehouseLogin); 

// #################  POSTs

router.post('/users', validateTokenOADMIN, postRegister );

router.post('/regions', dopplergangerLocation, validateToken, postRegion);
router.post('/country', dopplergangerLocation, validateToken, postCountry);
router.post('/city', dopplergangerLocation, validateToken, postCity);

router.post('/company', dopplergangerCompania, validateToken, postCompany);

router.post('/contact', dopplergangerContact, validateToken, postContact);

// ############### DELETEs

router.delete('/regions', validateToken, deleteRegion);
router.delete('/country', validateToken, deleteCountry);
router.delete('/city', validateToken, deleteCity);

router.delete('/company', validateToken, deleteCompany);

router.delete('/users', validateTokenOADMIN, deleteUser);

router.delete('/contact', validateToken, deleteContact);

// ################## PUTs

router.put('/regions', dopplergangerLocation, validateToken, putRegion);
router.put('/country', dopplergangerLocation, validateToken, putCountry);
router.put('/city', dopplergangerLocation, validateToken, putCity);

router.put('/company',dopplergangerCompania, validateToken, putCompany);

router.put('/contact', dopplergangerContact, validateToken, putContact);

// ????
router.post('/authorize',userNoExist, postLogin);

// ################ FETCH only data
router.get('/locationData', validateToken, locationQuery);
router.get('/companyData', validateToken, companiesQuery);
router.get('/userData', validateTokenOADMIN, userQuery);
router.get('/contactData', validateToken, contactQuery);

router.post('/contact/name', validateToken, searchContactQueryName);
router.post('/contact/email', validateToken, searchContactQueryEmail);
router.post('/contact/company', validateToken, searchContactQueryCompany);

module.exports = router;