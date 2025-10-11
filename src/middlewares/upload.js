const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const fileName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + ext
        cb(null, fileName)
    },
})

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg']
    if (!allowed.includes(file.mimetype)) {
        return cb(new Error('Only JPEG/PNG images are allowed'), false)
    }
    cb(null, true)
}

const upload = multer({ storage, fileFilter })

module.exports = upload
