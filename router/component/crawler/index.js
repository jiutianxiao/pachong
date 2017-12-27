/**
 * Created by dianying on 2017/12/19.
 */
const utils = require("../../common");
/*const cheerio = require("cheerio");
 const iconv = require("iconv-lite");*/

//爬虫部分
module.exports = {
    async search(ctx){
        let {parameter} = await utils.parameter(ctx);
        //如果判断传进来的是不是一个合法的字符串
        if (parameter.trim()) {
            try {
                /*let dataParameter = decodeURIComponent(parameter);
                let data = await utils.querySQLData(dataParameter);
                if (!data.length) {*/
                    let url = `https://s.taobao.com/search?initiative_id=tbindexz_20170306&ie=utf8&spm=a21bo.2017.201856-taobao-item.2&sourceId=tb.index&search_type=item&ssid=s5-e&commend=all&imgfile=&q=${parameter}&suggest=history_1&_input_charset=utf-8&wq=${parameter}&suggest_query=${parameter}&source=suggest&app=detailproduct&through=1`;
                    let ary = await utils.captureData(url);
                    let data = ary;
                    ctx.body = {code: "0000", data, msg: "成功"};
                    // await utils.querySQLData(dataParameter, ary);
/*                } else {
                    data = data[0].data;
                    data = JSON.parse(data);
                    ctx.body = {code: "0000", data, msg: "成功"};
                }*/
            } catch (e) {
                ctx.body = {code: "0002", msg: "需要您输入产品具体的名字，型号这样才能帮您匹配到需要的东西"}
            }
        } else {
            ctx.body = {code: "0001", msg: "请确定输入"};
        }
    }
};
