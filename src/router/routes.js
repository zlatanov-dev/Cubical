const cubeController = require("../controllers/cubeControler");
const router = require("express").Router();
const homeController = require('../controllers/homeController');


// Routing
router.get("/", homeController.getHomePage);
router.get("/about", homeController.getAboutPage);
router.get("/create", cubeController.getCreateCube);

module.exports = router;
 