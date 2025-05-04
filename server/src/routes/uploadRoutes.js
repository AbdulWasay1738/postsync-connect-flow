// server/src/routes/uploadRoutes.js
const express   = require('express');
const multer    = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { Readable } = require('stream');

const router = express.Router();

// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer memory storage
const storage = multer.memoryStorage();
const upload  = multer({ storage });

// POST /api/uploadImage
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // upload buffer to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'postsync' }, // optional: a folder in your Cloudinary account
      (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        // result.secure_url is a public HTTPS link
        res.json({ url: result.secure_url });
      }
    );

    // convert buffer to stream and pipe into Cloudinary
    Readable.from(req.file.buffer).pipe(stream);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Cloudinary upload failed' });
  }
});

module.exports = router;
