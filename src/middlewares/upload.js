import multer from 'multer'
import __dirname from '../utils.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/uploads')
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
    cb(null, null)
  }
})

const upload = multer({ storage })

export default upload
