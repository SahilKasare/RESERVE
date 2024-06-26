const multer = require("multer");
const {v4 : uuidv4} = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./views/Images/Uploads");
    },
    filename: function(req,file,cb){
        const unqiue = uuidv4();
        cb(null , unqiue + path.extname(file.originalname));
    }
})

const upload = multer({storage : storage});
module.exports = upload;
