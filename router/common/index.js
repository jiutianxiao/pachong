/**
 * Created by dianying on 2017/12/19.
 */
const fs = require("fs");
const request = require("request");
const Mysql = require("mysql2");
const cheerio = require("cheerio");
const iconv = require("iconv-lite")

/*let {mysql} = require("../../config");
const con = Mysql.createConnection(mysql);*/

/**
 * 格式化mysql数据
 * 说明：把从sql中拿到的数据格式化成对象
 * @param roow
 * @returns {Array}
 * @constructor
 */
let SQLDataForm = (roow) => {
    let ary = [];
    let l = roow.length;
    if (l !== 0) {
        for (let i = 0; i < l; i++) {
            let data = Object.getOwnPropertyNames(roow[i]);
            let obj = {};
            for (let key of data) {
                obj[key] = new String(roow[i][key]).toString();
            }
            ary.push(obj);
        }
    }
    return ary
}

module.exports = utils = {
    /**
     * 解析前端参数
     * @param ctx
     * @returns {Promise.<*>}
     */
    parameter: async function (ctx) {
        if (ctx.method.toUpperCase() === "GET")//get请求直接使用koa封装好的参数
            return ctx.query;
        if (ctx.method.toUpperCase() === "POST") {//post请求使用原生获取到参数
            return await this.postData(ctx)
        }
    },
    /**
     * 解析post前端参数
     * @param ctx
     * @returns {Promise}
     */
    postData: function (ctx) {
        return new Promise((resolve, reject) => {
            let buff = "";
            let size = 0;
            ctx.req.on("data", function (chunk) {
                buff += (chunk);
                size += buff.length;
            });
            ctx.req.on("end", function () {
                buff = buff.split("&");
                let obj = {};
                for (let i = 0; i < buff.length; i++) {
                    let temp = buff[i].split("=");
                    obj[temp[0]] = temp[1];
                }
                resolve(obj);
            })
        })
    },
    /**
     * 读取本地文件
     * @param path
     * @returns {Promise}
     */
    readPathFile(path){
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    },
    /**
     * 抓取淘宝页面数据
     * @param url
     * @returns {Promise}
     */
    captureData(url){
        return new Promise((resolve, reject) => {
            request.get(url, function (err, response, body) {
                console.log(body);
                if (err) reject(err);
                let data = /"params\W[^\]]+/.exec(body);
                let title = /"spuTitle\W[^\,]+/.exec(body);
                if (data) {
                    title = JSON.parse(`{${title[0]}}`);
                    title = title["spuTitle"];
                    data = {data: JSON.parse(`{${data[0]}]}`), title};
                    resolve(data);
                } else {
                    reject("没有搜索到");
                }
            });
        })
    },
    /**
     *用于查找并存储数据
     * @param title 查找的名字，唯一索引，不能为空
     * @param data 详细参数
     * @returns {Promise}
     */
    querySQLData(title, data)
    {
        if (!data) {
            return new Promise((resolve, reject) => {
                con.query(`select data from data where title=?`, [title], (err, results, fields) => {
                    if (err) reject(err);
                    resolve(SQLDataForm(results));
                })
            })
        } else {
            con.query(`INSERT INTO data (title,data) VALUES (?,?)`, [title, data])
        }
    }
}
;
// console.log(utils.querySQLData('234234'));
