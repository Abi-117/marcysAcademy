import Book from "../models/Book.js";

/* GET BOOK */
export const getBook = async (req, res) => {
  try {

    const book = await Book.findOne();

    res.json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


/* CREATE OR UPDATE */
export const saveBook = async (req, res) => {

  try {

    const { title, description, image, amazonLink } = req.body;

    let book = await Book.findOne();

    if (!book) {

      book = new Book({
        title,
        description,
        image,
        amazonLink,
      });

    } else {

      book.title = title;
      book.description = description;
      book.image = image;
      book.amazonLink = amazonLink;

    }

    await book.save();

    res.json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};