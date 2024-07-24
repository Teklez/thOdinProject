const { Router } = require("express");
const indexController = require("../controllers/indexControll");

const router = Router();

router.get("/", indexController.name_get);
router.get("/new", indexController.name_form_get);
router.post("/new", indexController.name_form_post);
router.get("/delete", indexController.delete_all_users);

module.exports = router;
