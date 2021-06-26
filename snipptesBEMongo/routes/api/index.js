var express = require("express");
var router = express.Router();

var snippets_routes = require("./snippets/index");
var camisas_routes = require("./camisas/index");

router.use("/snippets", snippets_routes);
router.use("/camisas", camisas_routes);


module.exports = router;
