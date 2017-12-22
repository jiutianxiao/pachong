/**
 * Created by dianying on 2017/12/19.
 */
const Koa = require("koa");
const Router = require("koa-router");
const Session = require("koa-session2");
const cors = require("koa2-cors");//跨域
// const Cheerio = require("cheerio");

// 实例化
let app = new Koa();
let router = Router();
//引入配置文件
const {session, listen} = require("./config");
//引入路由
const routers = require("./router");


app.use(cors({
    /**
     * 跨域
     * @param ctx
     * @returns {*}
     */
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return '*';
    },
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    // credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));


//把写好的路由集合配置到路由上
routers.forEach((items, index) => {
    if (typeof items.methods === "object") {
        items.methods.forEach((item, index) => {
            if (item.toUpperCase() === "GET")
                router.get(items.path, items.fn);
            else if (item.toUpperCase() === "POST")
                router.post(items.path, items.fn)
        })
    }
    else if (items.methods.toUpperCase() === "GET")
        router.get(items.path, items.fn);
    else if (items.methods.toUpperCase() === "POST")
        router.post(items.path, items.fn)
});

app.keys = ["I'm keys"];

app.use(Session(session));

app.use(router.routes())
    .use(router.allowedMethods());
app.listen(listen);