/**
 * Created by dianying on 2017/12/19.
 */
module.exports = {
    session: {
        key: "koa:sess",
        maxAge: 1800000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false
    },
    mysql: {
        host: '192.168.100.182',
        user: 'root',
        password: '123456',
        database: 'contrast',
        port: 3306,
        multipleStatements: true
    },
    listen: 80
};