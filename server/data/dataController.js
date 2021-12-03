const getConnection = require('../connection/connection');
const mysql = require("mysql");

class dataController {

    async readData(req, res) {
        try {
            const {table, columns, condition} = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в readData"})
                }
                const search_query = mysql.format(`select ${columns} from ${table} WHERE ACTIVE_SIGN=1 ${condition}`)
                await connection.query(search_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка в readData"})
                    }
                    res.json({result: result})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка чтения из базы данных"})
        }
    }

    async createData(req, res) {
        try {
            const {table, columns, values} = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в createData"})
                }
                const insert_query = mysql.format(`insert into ${table}(${columns}) values(${values})`);
                await connection.query(insert_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка в createData", result: err})
                    }
                    res.json({message: "Успешное добавление"})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка createData"})
        }
    }

    async deleteData(req, res) {
        try {
            const {id, table} = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в insertData"})
                }
                const delete_query = mysql.format(`update ${table} set ACTIVE_SIGN=0 where ID='${id}'`);
                await connection.query(delete_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка удаления", err: err})
                    }
                    res.json({message: "Удалено."})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка deleteData"})
        }
    }

    async updateData(req, res) {
        try {
            const {id, table, columns} = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в updateData"})
                }
                const update_query = mysql.format(`update ${table} set ${columns} where ID=${id}`);
                await connection.query(update_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка удаления", error: err})
                    }
                    res.json({message: "Обновлено."})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка обновления"})
        }
    }
}

module.exports = new dataController()
