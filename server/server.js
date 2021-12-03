const express = require("express")
const app = express()
const port = 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,token, Access-Control-Request-Method, Access-Control-Request-Headers');
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});
// создание сессии
app.use(require('./connection/session'));

// модуль
app.use(require('./auth/authRouter'));

// модуль
app.use(require('./data/dataRouter'));

try {
    app.listen(port,()=> console.log(`Server Started on port ${port}...`))
} catch (e) {
    console.log("Сервер не запущен.")
}
