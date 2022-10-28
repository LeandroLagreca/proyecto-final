const cloudinary = require('../cloudinary/config')

const upLoadDicountsBanner = async (req, res) => {
  const file = req.files.image
  try {
    const upload = await cloudinary.v2.uploader.upload(file.tempFilePath,
  { 
    public_id: "discounts_banner",
    folder: 'gamescript'
   })

   if(upload.secure_url) {
     res.send(upload.secure_url)
   } else {
    res.status(404).send('No hay ningun banner subido')
   }
   
  } catch (error) {
      console.log(error)
      res.status(400).send(error.message)
  }
	
};

const getDiscountsBanner = async (req, res) => {
  try {
    const banner = await Image.findAll();
    if (!banner.length)
      return res.status(404).send("You don't has uploaded this file yet");
    res.json(banner[0]);
  } catch (error) {
	res.status(500).send(error.message)
  }
};

const deleteDiscountsBanner = async (req, res) => {
  try {
    const banner = await Image.findAll();
    if (!banner.length)
      return res.status(404).send("You don't has uploaded ani file yet");
    await banner[0].destroy()
    res.send('Banner deleted successfully');
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  upLoadDicountsBanner,
  getDiscountsBanner,
  deleteDiscountsBanner
};
