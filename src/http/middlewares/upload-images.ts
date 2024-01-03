import multer from 'fastify-multer'

export function uploadImages() {
  const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'))
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    },
  })

  return multer({ storage })
}
