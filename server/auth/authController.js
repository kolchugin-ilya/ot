const getConnection = require('../connection/connection');
const mysql = require("mysql");
const bcrypt = require('bcrypt');

class authController {
    async registration(req, res) {
        try {
            const name = req.body.name.trim();
            const password = req.body.password.trim();
            const role = (req.body.role) ? req.body.role : "user";
            if (!name && !password) {
                res.status(400).json({message: "Введены некорректные данные"})
                return;
            }
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в registration"})
                }
                const search_query = mysql.format(`select * from users where name='${name}'`)
                const hashPassword = bcrypt.hashSync(password, 7);
                const insert_query = mysql.format(`insert into users(name,password,role,active) values ('${name}', '${hashPassword}', '${role}', '1')`)
                await connection.query(search_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка в search_query"})
                    }
                    if (result.length !== 0) {
                        connection.release()
                        res.status(409).json({message: "Пользователь с таким логином уже существует"})
                    } else {
                        await connection.query(insert_query, (err, result) => {
                            connection.release()
                            if (err) {
                                res.status(400).json({message: "Ошибка в insert_query", error: err})
                            }
                            res.status(201).json({message: "Пользователь успешно зарегистрирован", result: result})
                        })
                    }
                })
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Ошибка в модуле registration"})
        }
    }

    async login(req, res) {
        try {
            const name = req.body.name;
            const password = req.body.password;
            if (!name && !password) {
                res.status(400).json({message: "Введены некорректные данные"})
                return;
            }
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в login"})
                }
                const search_query = mysql.format(`select password, role from users where name='${name}'`)
                await connection.query(search_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка в search_query"})
                    } else {
                        if (result.length === 0) {
                            res.status(400).json({message: "Такого пользователя не существует!"})
                        } else {
                            const validPassword = bcrypt.compareSync(password.toString(), result[0].password);
                            if (!validPassword) {
                                res.status(400).json({message: "Неверный пароль"})
                            } else {
                                req.session.userinfo = { name: name, role: result[0]['role']}
                                res.json({message: "Успешная авторизация", session: req.session})
                            }
                        }
                    }
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка авторизации"})
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy(function (err) {
                if (err) {
                    res.status(400).json({message: "Ошибка в logout"})
                }
                res.json({message: "Успешный выход"})
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка logout"})
        }
    }

    async isLogin(req, res) {
        try {
            if(req.session.userinfo){
                res.json({user: req.session.userinfo})
            }
            else{
                res.json({user: "", error: "Не авторизован"})
            }
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка isLogin"})
        }
    }
}

module.exports = new authController()
