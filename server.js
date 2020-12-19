// NPM packages required and other files
const express = require('express');
const handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const db = require('./models');
const fileUpload = require('express-fileupload');
const session = require("express-session");
const passport = require("./config/passport");

// Port set
const PORT = process.env.PORT || 8080;

// Create instance of express
const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

// handlebars middleware
app.engine("handlebars", exphbs({defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(handlebars)}));
app.set("view engine", "handlebars");

// Routes
const dogsController = require('./controllers/dogsController.js');
app.use(dogsController);

const volunteersController = require('./controllers/volunteersController.js');
app.use(volunteersController);

const dashboardController = require('./controllers/dashboardController.js');
app.use(dashboardController);

const loginController = require('./controllers/loginController.js');
app.use(loginController);

// Syncing sequelize models and then starting express app
// db.sequelize.sync({force: true}).then(() => {
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on http://localhost:" + PORT);
    })
})
