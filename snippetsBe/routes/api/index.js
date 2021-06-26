var express = require("express");
var router = express.Router();

var snippets_routes = require("./snippets/index");
var canciones_routes = require("./canciones/index");

router.use("/snippets", snippets_routes);
router.use("/canciones", canciones_routes);


module.exports = router;
