const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

// Storage configuration
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, `user-${Date.now()}-${file.originalname}`);
  },
});

// File type checking
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const photoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Image resizing
const resizeImages = async (req, res, next) => {
  if (!req.files || !req.files.length) return next();

  req.files = await Promise.all(
    req.files.map(async (file) => {
      const filename = `user-${Date.now()}-${file.originalname}`;
      const filepath = path.join(__dirname, `../public/images/${filename}`);
      await sharp(file.path)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filepath);
      return {
        ...file,
        path: filepath,
        filename,
      };
    })
  );

  next();
};

module.exports = { photoUpload, resizeImages };
