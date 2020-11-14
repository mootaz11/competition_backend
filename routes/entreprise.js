const router = require("express").Router();
const {create,getEntreprises} = require("../controllers/EntrepriseControlller");
const uploadImage = require("../config/multer");


router.post("/",uploadImage.single('image'),create);
router.get("/",getEntreprises);



module.exports= router;