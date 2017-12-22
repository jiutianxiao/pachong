/**
 * Created by dianying on 2017/12/19.
 */
const mime = require("mime")

let {readPathFile} = require("../../common");
module.exports = {
    async page404(ctx){
        let body = {};
        try {
            let path = "." + ctx.path;
            if (path === "./") {
                body = (await readPathFile("./index.html")).toString();
            } else {
                ctx.res.writeHead(200, mime.getType(ctx.path))
                body = await readPathFile(path);
            }
        } catch (e) {
            body = 404;
        }
        ctx.body = body;
    }
}