import Award from "../models/AwardCertification.js";
import Awards from "../models/Award.js";

// GET ALL DATA (certifications + images)
export const getAwards = async (req, res) => {
  try {

    const certifications = await Award.find().sort({ createdAt: -1 });

    const imagesData = await Awards.findOne();

    res.json({
      certifications,
      images: imagesData?.images || []
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// CREATE CERTIFICATION
export const createAward = async (req, res) => {
  try {

    const award = await Award.create(req.body);

    res.json(award);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE CERTIFICATION
export const updateAward = async (req, res) => {

  try {

    const award = await Award.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(award);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


// DELETE CERTIFICATION
export const deleteAward = async (req, res) => {

  try {

    await Award.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


// UPLOAD MULTIPLE IMAGES
export const uploadImages = async (req, res) => {

  try {

    const urls = req.files.map((file) => file.path);

    let awards = await Awards.findOne();

    if (!awards) {

      awards = new Awards({ images: urls });

    } else {

      awards.images = urls;

    }

    await awards.save();

    res.json(awards);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// // GET IMAGES
// export const getImages = async (req, res) => {

//   try {

//     const awards = await Awards.findOne();

//     res.json(awards);

//   } catch (error) {

//     res.status(500).json({ message: error.message });

//   }

// };



// ADD MULTIPLE IMAGES
export const addGalleryImages = async (req, res) => {

  try {

    const { images } = req.body;

    const awards = await Awards.findOne();

    if (!awards) {

      const newAwards = await Awards.create({
        images: images
      });

      return res.json(newAwards);
    }

    awards.images.push(...images);

    await awards.save();

    res.json(awards);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};


// DELETE IMAGE

export const deleteGalleryImage = async (req, res) => {

  try {

    const { image } = req.body;

    const awards = await Awards.findOne();

    awards.images = awards.images.filter(
      (img) => img !== image
    );

    await awards.save();

    res.json(awards);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};