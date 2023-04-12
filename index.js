const express = require('express');
const app = express();
const multer = require("multer");
const path = require("path");

// storage engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    }
})
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('imgpick'), (req, res) => {

    res.json({
        status:"file Uploaded",
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);
const port = process.env.PORT||4000
app.listen(port, () => {
    console.log(`server up and running ${port}`);
})