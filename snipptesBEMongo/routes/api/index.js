var express = require("express");
var router = express.Router();

var snippets_routes = require("./snippets/index");
var camisas_routes = require("./camisas/index");
var helpdesk_routes = require("./helpdesk/index");

router.use("/snippets", snippets_routes);
router.use("/camisas", camisas_routes);
router.use("/helpdesk", helpdesk_routes);

module.exports = router;
