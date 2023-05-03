const router = require("express").Router();

const cubeController = require("../controllers/cubeControler");
const homeController = require("../controllers/homeController");

// Routing
router.get("/", homeController.getHomePage);
router.get("/about", homeController.getAboutPage);
router.get("/404", homeController.getErrorPage);

router.get("/create", cubeController.getCreateCube);
router.post("/create", cubeController.postCreateCube);
router.get("/details/:cubeId", cubeController.getDetails);

module.exports = router;

 