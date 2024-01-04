import multer from 'fastify-multer'

export function uploadImages() {
  const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'))
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const fileExt = file.originalname.split('.').pop() // Obtém a extensão do arquivo
      const filename = `${file.fieldname}-${uniqueSuffix}.${fileExt}`
      cb(null, filename)
    },
  })

  return multer({ storage })
}
