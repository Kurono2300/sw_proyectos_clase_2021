var express = require("express");
var router = express.Router();
const passport = require('passport');

const passportJWT = require('passport-jwt');
const extractJWT = passportJWT.ExtractJwt;
const strategyJWT = passportJWT.Strategy;

passport.use(
    new strategyJWT(
        {
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET
        },
        (payload, next) =>{
            console.log(payload);
            return next(null,payload);
        }
    )
)

const jwtMiddleWare = passport.authenticate('jwt',{session:false});

const security_routes = require("./security/index");
var snippets_routes = require("./snippets/index");

router.use("/security", security_routes);
router.use("/snippets", jwtMiddleWare, snippets_routes);
//router.use("/snippets", snippets_routes);




var camisas_routes = require("./camisas/index");
var helpdesk_routes = require("./helpdesk/index");
router.use("/camisas", camisas_routes);
router.use("/helpdesk", helpdesk_routes);






module.exports = router;
