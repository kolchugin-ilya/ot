const {pool} = require("./pool");

const getConnection = (cb) => {
    pool.getConnection(function (err, connection) {
        if(err) {
            return cb(err);
        }
        cb(null, connection);
    });
};

module.exports = getConnection;