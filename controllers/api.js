const DB = require ('../database/connect.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

require('dotenv').config();

// HTTPS LOCATIONS

const warehouseIndex = (req, res) => {
    let url = process.cwd() + '/public/html/index.html'
    res.sendFile(path.resolve(url))
}
const warehouseUser = (req, res) => {
    let url = process.cwd() + '/public/html/usuarios.html';
    res.sendFile(path.resolve(url))
}
const warehouseLocations = (req, res) => {
    let url = process.cwd() + '/public/html/regions.html'
    res.sendFile(path.resolve(url));
}
const warehouseLogin = (req,res) => {
    let url = process.cwd() + '/public/html/login.html'
    res.sendFile(path.resolve(url));
}
const warehouseCompanies = (req, res) => {
    let url = process.cwd() + '/public/html/companies.html'
    res.sendFile(path.resolve(url));
}

// POST REQUEST

const postRegion = (req, res) => {
    const { name } = req.body;

    const SQLsentence = 'INSERT INTO regiones SET ?';


    DB.query(SQLsentence,[{name: name}], (err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Region creada con exito');
        }
    })
}
const postCountry = (req, res) => {
    const { name, target } = req.body;

    const SQLsearchSentence = `SELECT id_region AS region FROM regiones WHERE name = ${JSON.stringify(target)} `;

    DB.query(SQLsearchSentence, (err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row[0].region);

            const SQLpostSentence = `INSERT INTO paises SET ?`;
            DB.query(SQLpostSentence, [{name: name, id_region: row[0].region}], (err,data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Elements added successfully ' + name + ' with parent of ' + row[0].region);
                }
            })
        }
    })
}
const postCity = (req, res) => {
    const { name, target } = req.body;

    const SQLsearchSentence = `SELECT id_pais AS pais FROM paises WHERE name = ${JSON.stringify(target)} `;

    console.log(SQLsearchSentence);

    DB.query(SQLsearchSentence, (err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row[0].pais);

            const SQLpostSentence = `INSERT INTO ciudades SET ?`;
            DB.query(SQLpostSentence, [{name: name, id_pais: row[0].pais}], (err,data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Elements added successfully ' + name + ' with parent of ' + row[0].ciudad);
                }
            })
        }
    })
}
const postRegister = (req,res) => {
    const { first_name, last_name, email, user, password } = req.body;
    const SQLsentence = 'INSERT INTO usuarios SET ?';

    const readyPassword = bcrypt.hashSync(password, 10);

    DB.query(SQLsentence,[{first_name: first_name, last_name: last_name, email: email, perfil: user, password: readyPassword}], (err,row) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Usuario creado con exito')
            }
        })
}
const postLogin = (req,res) => {
    const {username} = req.body;
    
    const SQLsentence = 'SELECT * FROM usuarios WHERE perfil = ' + JSON.stringify(username);
    DB.query(SQLsentence, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            const firmJWT = {
                username: row[0].perfil,
                role: row[0].role
            };
            const role = row[0].role;
            const authorized = jwt.sign(firmJWT, process.env.PASSWORD);
            
            res.json({authorized, role})
        }
    })
}

const postCompany = (req, res) => {
    const {name, dir, citySelect} = req.body;

    const SQLgatherLocation = `SELECT id_ciudad AS id FROM ciudades WHERE name = ${JSON.stringify(citySelect)}`;

    DB.query(SQLgatherLocation, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            
            const SQLcreateCompany = `INSERT INTO companies SET ?`;
            DB.query(SQLcreateCompany, [{name: name, dir: dir, id_ciudad: row[0].id}], (err,data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Elements added successfully ' + name + ' with parent of ' + row[0].ciudad);
                }
            })
        }
    })
}

const postContact = (req, res) => {
    const {first_name, last_name, email, rank, noise, city_name, company_name, channels} = req.body;

    const SQLgatherLocation = `SELECT id_ciudad AS id FROM ciudades WHERE name = ${JSON.stringify(city_name)}`;

    const SQLIDGather = `SELECT id_contact AS id FROM contactos WHERE email = ${JSON.stringify(email)}`

    const SQLgatherCompany = `SELECT id_company AS id FROM companies WHERE name = ${JSON.stringify(company_name)}`;


    const SQLcreateContact = `INSERT INTO contactos SET ?`;
    const SQLcreateList = `INSERT INTO lista SET ?`;


    let percent = JSON.stringify(noise);
    DB.query(SQLgatherLocation, (err, loc) => {
        if (err) {
            console.log(err)
        } else {
            DB.query(SQLgatherCompany, (err, com) => {
                if (err) {
                    console.log(err);
                } else {
                    DB.query(SQLcreateContact, [{first_name: first_name, last_name: last_name, email: email, rank: rank, noise: percent, id_ciudad: loc[0].id, id_company: com[0].id}], (err, row) => {
                        if (err) {
                            console.log(err)
                        } else {
                            DB.query(SQLIDGather, (err, guide) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    channels.forEach(channel => {
                                        DB.query(SQLcreateList, [{id_canal: channel, id_contact: guide[0].id}], (err, row) => {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                console.log("New Element created " + email )
                                            }
                                        })
                                    });
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

// DELETE REQUEST

const deleteRegion = (req, res) => {
    const {target} = req.body;
    const sentenceSQL = `DELETE FROM regiones WHERE name = ${JSON.stringify(target)}`;

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El objetivo " + JSON.stringify(target) + " fue eliminado")
        }
    })
}
const deleteCountry = (req, res) => {
    const {target} = req.body;
    const sentenceSQL = `DELETE FROM paises WHERE name = ${JSON.stringify(target)}`;

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El objetivo " + target + " fue eliminado")
        }
    })
}
const deleteCity = (req, res) => {
    const {target} = req.body;
    const sentenceSQL = `DELETE FROM ciudades WHERE name = ${JSON.stringify(target)}`;

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El objetivo " + target + " fue eliminado")
        }
    })
}

const deleteCompany = (req, res) => {
    const {target} = req.body;
    const sentenceSQL = `DELETE FROM companies WHERE name = ${JSON.stringify(target)}`;

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El objetivo " + target + " fue eliminado")
        }
    })
}

const deleteUser = (req, res) => {
    const {target} = req.body;
    const sentenceSQL = `DELETE FROM usuarios WHERE perfil = ${JSON.stringify(target)}`;

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El objetivo " + target + " fue eliminado")
        }
    })
}

const deleteContact = (req, res) => {
    const {target} = req.body;
    const sentenceSQL = `DELETE FROM contactos WHERE email = ${JSON.stringify(target)}`;

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El objetivo " + target + " fue eliminado")
        }
    })
}

// PUT REQUEST

const putRegion = (req, res) => {
    const {name, target} = req.body;
    const sentenceSQL = `UPDATE regiones SET name = ${JSON.stringify(name)} WHERE name = ${JSON.stringify(target)}`;
    console.log(sentenceSQL)

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            res.json({
                mensaje: "Modded",
                row
            })
        }
    })
}

const putCountry = (req, res) => {
    const {name, target} = req.body;
    const sentenceSQL = `UPDATE paises SET name = ${JSON.stringify(name)} WHERE name = ${JSON.stringify(target)}`;
    console.log(sentenceSQL)

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            res.json({
                mensaje: "Modded",
                row
            })
        }
    })
}

const putCity = (req, res) => {
    const {name, target} = req.body;
    const sentenceSQL = `UPDATE ciudades SET name = ${JSON.stringify(name)} WHERE name = ${JSON.stringify(target)}`;
    console.log(sentenceSQL)

    DB.query(sentenceSQL,(err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            res.json({
                mensaje: "Modded",
                row
            })
        }
    })
}

const putCompany = (req, res) => {
    const {name, dir, citySelect, target} = req.body;

    const SQLgatherLocation = `SELECT id_ciudad AS id FROM companies WHERE name = ${JSON.stringify(citySelect)}`;

    DB.query(SQLgatherLocation, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            
            const SQLeditCompany = `UPDATE companies SET name = ${JSON.stringify(name)}, dir = ${JSON.stringify(dir)}, id_ciudad = ${row[0].id} WHERE name = ${JSON.stringify(target)}`;
            DB.query(SQLeditCompany, (err,data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Elements editted successfully ' + name + ' with parent of ' + row[0].id);
                }
            })
        }
    })
}

const putContact = (req, res) => {
    const {first_name, last_name, email, rank, noise, city_name, company_name, channels, target} = req.body;

    const SQLgatherLocation = `SELECT id_ciudad AS id FROM ciudades WHERE name = ${JSON.stringify(city_name)}`;

    const SQLIDGather = `SELECT id_contact AS id FROM contactos WHERE email = ${JSON.stringify(target)}`

    const SQLgatherCompany = `SELECT id_company AS id FROM companies WHERE name = ${JSON.stringify(company_name)}`;


    let percent = JSON.stringify(noise);

    DB.query(SQLgatherLocation, (err, loc) => {
        if (err) {
            console.log(err)
        } else {
            DB.query(SQLgatherCompany, (err, com) => {
                if (err) {
                    console.log(err);
                } else {
                    let SQLUpdateContact = `UPDATE contactos SET `
                    if (first_name != '') {
                        SQLUpdateContact = SQLUpdateContact + `first_name = ${JSON.stringify(first_name)},`
                    }
                    if (last_name != '') {
                        SQLUpdateContact = SQLUpdateContact + `last_name = ${JSON.stringify(first_name)},`
                    }
                    if (email != '') {
                        SQLUpdateContact = SQLUpdateContact + `email = ${JSON.stringify(email)},`
                    }
                    if (rank != '') {
                        SQLUpdateContact = SQLUpdateContact + `rank = ${JSON.stringify(rank)},`
                    }
                    SQLUpdateContact = SQLUpdateContact + `noise = ${JSON.stringify(percent)}, id_company = ${com[0].id}, id_ciudad = ${loc[0].id} WHERE email = ${JSON.stringify(target)}`;

                    console.log(SQLUpdateContact);
                    DB.query(SQLUpdateContact, (err, row) => {
                        if (err) {
                            console.log(err);
                        } else {
                            DB.query(SQLIDGather, (err, guide) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    const SQLoldListDrop = `DELETE FROM lista WHERE id_contact = ${guide[0].id}`;
                                    DB.query(SQLoldListDrop, (err, deleted) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            const SQLcreateList = `INSERT INTO lista SET ?`;
                                            console.log('New element modify using the email known as ' + email);
                                            channels.forEach(channel => {
                                                DB.query(SQLcreateList, [{id_canal: channel, id_contact: guide[0].id}], (err, row) => {
                                                    if (err) {
                                                        console.log(err)
                                                    } else {
                                                        console.log("New Element created for " + email + " adding the list channel for " + channel);
                                                    }
                                                })
                                            });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

// REQUEST - SHOW DATA

const companiesQuery = (req, res) => {
    const SQLsentence = "SELECT CO.name AS name, CO.dir AS dir, P.name AS country, C.name AS city FROM companies AS CO INNER JOIN ciudades AS C ON CO.id_ciudad = C.id_ciudad INNER JOIN paises AS P ON P.id_pais = C.id_pais GROUP BY CO.name;"
    DB.query(SQLsentence,(err,row) => {
        if (err) {
            console.log(err);
        } else {
            res.json(row)
        }
    })
}
const locationQuery = (req, res) => {
    const SQLsentence = "SELECT R.name AS region, GROUP_CONCAT( DISTINCT P.name) AS paises, GROUP_CONCAT( DISTINCT C.name,'$',P.name)AS ciudades FROM regiones AS R LEFT JOIN paises AS P ON R.id_region = P.id_region LEFT JOIN ciudades AS C ON P.id_pais = C.id_pais GROUP BY R.name"
    DB.query(SQLsentence,(err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row);
            res.json(row);
        }
    })
}
const userQuery = (req, res) => {
    const SQLsentence = "SELECT U.first_name AS nombre, U.last_name AS apellido, U.perfil as username, U.email as email FROM usuarios AS U;" 
    DB.query(SQLsentence,(err,row) => {
    if (err) {
        console.log(err);
        } else {
            res.json(row);
        }
    })
}
const contactQuery = (req,res) => {
    const SQLsentence = "SELECT CON.first_name AS first_name, CON.last_name AS last_name, CON.email AS email, P.name AS country, C.name AS city, COM.name AS compania, CON.rank AS cargo, GROUP_CONCAT( DISTINCT CA.name ) AS canales, CON.noise AS interes FROM contactos AS CON INNER JOIN ciudades AS C ON CON.id_ciudad = C.id_ciudad INNER JOIN paises AS P ON P.id_pais = C.id_pais INNER JOIN companies AS COM ON CON.id_company = COM.id_company INNER JOIN lista AS LC ON LC.id_contact = CON.id_contact INNER JOIN canales AS CA ON CA.id_canal = LC.id_canal GROUP BY CON.first_name"

    DB.query(SQLsentence,(err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row)
            res.json(row)
        }
    })
}

const searchContactQueryName = (req, res) => {

    const {name} = req.body;

    const SQLsentence = `SELECT CON.first_name AS first_name, CON.last_name AS last_name, CON.email AS email, P.name AS country, C.name AS city, COM.name AS compania, CON.rank AS cargo, GROUP_CONCAT( DISTINCT CA.name ) AS canales, CON.noise AS interes FROM contactos AS CON INNER JOIN ciudades AS C ON CON.id_ciudad = C.id_ciudad INNER JOIN paises AS P ON P.id_pais = C.id_pais INNER JOIN companies AS COM ON CON.id_company = COM.id_company INNER JOIN lista AS LC ON LC.id_contact = CON.id_contact INNER JOIN canales AS CA ON CA.id_canal = LC.id_canal GROUP BY CON.first_name HAVING first_name LIKE ${JSON.stringify(name)}`

    DB.query(SQLsentence,(err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row)
            res.json(row)
        }
    })
}
const searchContactQueryEmail = (req, res) => {

    const {email} = req.body;

    const SQLsentence = `SELECT CON.first_name AS first_name, CON.last_name AS last_name, CON.email AS email, P.name AS country, C.name AS city, COM.name AS compania, CON.rank AS cargo, GROUP_CONCAT( DISTINCT CA.name ) AS canales, CON.noise AS interes FROM contactos AS CON INNER JOIN ciudades AS C ON CON.id_ciudad = C.id_ciudad INNER JOIN paises AS P ON P.id_pais = C.id_pais INNER JOIN companies AS COM ON CON.id_company = COM.id_company INNER JOIN lista AS LC ON LC.id_contact = CON.id_contact INNER JOIN canales AS CA ON CA.id_canal = LC.id_canal GROUP BY CON.first_name HAVING email LIKE ${JSON.stringify(email)}`

    DB.query(SQLsentence,(err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row)
            res.json(row)
        }
    })
}
const searchContactQueryCompany = (req, res) => {

    const {company} = req.body;

    const SQLsentence = `SELECT CON.first_name AS first_name, CON.last_name AS last_name, CON.email AS email, P.name AS country, C.name AS city, COM.name AS compania, CON.rank AS cargo, GROUP_CONCAT( DISTINCT CA.name ) AS canales, CON.noise AS interes FROM contactos AS CON INNER JOIN ciudades AS C ON CON.id_ciudad = C.id_ciudad INNER JOIN paises AS P ON P.id_pais = C.id_pais INNER JOIN companies AS COM ON CON.id_company = COM.id_company INNER JOIN lista AS LC ON LC.id_contact = CON.id_contact INNER JOIN canales AS CA ON CA.id_canal = LC.id_canal GROUP BY CON.first_name HAVING COM.name LIKE ${JSON.stringify(company)}`

    DB.query(SQLsentence,(err,row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row)
            res.json(row)
        }
    })
}

module.exports = {
    warehouseIndex, warehouseUser, warehouseLocations, warehouseCompanies, warehouseLogin,
    postRegister, postLogin,
    postRegion, postCountry, postCity,
    deleteRegion, deleteCountry, deleteCity,
    putRegion, putCountry, putCity,
    postCompany, deleteCompany, putCompany,
    deleteUser,
    searchContactQueryName, searchContactQueryEmail, searchContactQueryCompany,
    postContact, putContact, deleteContact,
    locationQuery, companiesQuery, userQuery, contactQuery
};