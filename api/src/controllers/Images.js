const upLoadDicountsBanner = async (req, res) => {
	const { image } = req.body
  // try {
  //   Image.create({
  //     image
  //   })
  //   res.status(201).send('Banner has been uploaded successfully')
  // } catch (error) {
  //     res.status(500).send(error.message)
  // }
	
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
