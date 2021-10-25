const DB = require ('../database/connect.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

// LOGIN
const userNoExist = (req, res, next) => {
    const { username} = req.body;
    const SQLsentence = 'SELECT * FROM Usuarios WHERE perfil = ' + JSON.stringify(username) + ' LIMIT 1';
    DB.query(SQLsentence, (err,row) => {
        if(err) {
            console.log(err);
        } else {
            if(row.length < 1) {
                console.log("Fallo")
                return res.status(409).send("El Usuario no existe").render('login', {title: 'Login'});
            }
            next();
        }
    })
}

const queryPassword = (req, res, next) => {
    const {username, password} = req.body; // Middlewear necesario? -> Username existe? Password Existe?
    const sentenceSQL = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    // bcrypt.compareSync(password, row[0].password)
    DB.query(sentenceSQL, [username, username, password], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if (!bcrypt.compareSync(password, row[0].password)) {
                return res.status(403).send('Contraseña invalida');
            }
            next();
        }
    })
}

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        let url = process.cwd() + '/public/html/login.html';
        res.sendFile(path.resolve(url));
        return;
    }
    let token = authorization.split(' ')[1];
    jwt.verify(token, process.env.PASSWORD, (err) => {
        if(err) {
            console.log(err)
            res.status(401).send('Token provided is invalid');
            return;
        } else {
            next();
        }
    })
}

const validateTokenOADMIN = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        let url = process.cwd() + '/public/html/login.html';
        res.status(401).redirect(url);
        return;
    }
    let token = authorization.split(' ')[1]
    console.log(jwt.decode(token,process.env.PASSWORD).role);
    jwt.verify(token, process.env.PASSWORD, (err) => {
        if(err) {
            console.log(err)
            res.status(401).send('Token provided is invalid');
            return;
        } else {
            if (jwt.decode(token,process.env.PASSWORD).role == 'ADM') {
                next();
            } else {
                res.status(401).send('Token role is unauthorized');
                return
            }
        }
    })
}

//REGISTER
// REGISTER
const userExist = (req, res, next) => {
    const { user} = req.body;
    const SQLsentence = 'SELECT * FROM Usuarios WHERE user = ?'
    DB.query(SQLsentence, [user], (err,row) => {
        if(err) {
            console.log(err);
        } else {
            if(row.length > 0) {
                return res.status(409).send("El Usuario ya existe").render('users', {title: 'Usuario'});
            }
            next();
        }
    })
}

const passwordsMatch = (req,res,next) => {
    const {password, repassword} = req.body
    if(password !== repassword) {
        return res.status(403).send("Las contraseñas no son iguales.").render('users', {title: 'Usuario'});
    }
    next();
}

const passwordAuthorized = (req,res,next) => {
    const {username, password} = req.body; // Middlewear necesario? -> Username existe? Password Existe?

    const SQLsentence = 'SELECT * FROM usuarios WHERE perfil = ?';
    // bcrypt.compareSync(password, row[0].password)
    DB.query(SQLsentence, [{perfil: username, password: password}], (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if (!bcrypt.compareSync(password, row[0].password)) {
                return res.status(403).send('Contraseña invalida').render('login', {title: 'Login'});
            }
            next();
        }
    })
}

// ELEMENT Already exist

const dopplergangerLocation = (req,res,next) => {
    
    const {name} = req.body
    const SQLsentenceRegions =  `SELECT * FROM regiones WHERE name = ${JSON.stringify(name)}`
    DB.query(SQLsentenceRegions, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if (row.length > 0) {
                let url = process.cwd() + '/public/html/regions.html';
                return res.status(403).sendFile(path.resolve(url));
            } else {
                const SQLsentenceCountries =  `SELECT * FROM paises WHERE name = ${JSON.stringify(name)}`
                DB.query(SQLsentenceCountries, (err, row) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (row.length > 0) {
                            let url = process.cwd() + '/public/html/regions.html';
                            return res.status(403).sendFile(path.resolve(url));
                        } else {
                            const SQLsentenceCities =  `SELECT * FROM ciudades WHERE name = ${JSON.stringify(name)}`
                            DB.query(SQLsentenceCities, (err, row) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    if (row.length > 0) {
                                        let url = process.cwd() + '/public/html/regions.html';
                                        return res.status(403).sendFile(path.resolve(url));
                                    } else {
                                        next();
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

const dopplergangerContact = (req,res,next) => {
    
    const {email} = req.body
    const SQLsentence =  `SELECT * FROM contactos WHERE email = ${JSON.stringify(email)}`
    DB.query(SQLsentence, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if (row.length > 0) {
                let url = process.cwd() + '/public/html/index.html'
                return res.status(403).sendFile(path.resolve(url));
            }
            next();
        }
    })
}

const dopplergangerCompania = (req,res,next) => {
    
    const {name} = req.body
    const SQLsentence =  `SELECT * FROM companies WHERE name = ${JSON.stringify(name)}`
    DB.query(SQLsentence, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if (row.length > 0) {
                return res.status(403).send('Element ' + name + ' already exist')
            }
            next();
        }
    })
}

module.exports = {
    userExist,
    userNoExist,
    passwordsMatch, passwordAuthorized, queryPassword,
    validateToken,validateTokenOADMIN,
    dopplergangerLocation, dopplergangerContact, dopplergangerCompania
}