/**
 * Created by dianying on 2017/12/19.
 */
const {search} = require("./component/crawler/index");
const {page404} = require("./component/page")
module.exports = [
    {
        path: "/search",
        methods: ["get", "post"],
        fn: search
    },
    {
        path: "/*",
        methods: ["get", "post"],
        fn: page404
    }
];