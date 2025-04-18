// middleware/multer.js
const multer = require("multer");

const storage = multer.memoryStorage(); // use memory, not disk
const upload = multer({ storage: storage });

module.exports = upload;
