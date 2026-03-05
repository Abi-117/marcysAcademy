export const getAll = (Model) => async (req, res) => {
  const data = await Model.find().sort({ createdAt: -1 });
  res.json(data);
};

export const createOne = (Model) => async (req, res) => {
  const data = await Model.create(req.body);
  res.json(data);
};

export const updateOne = (Model) => async (req, res) => {
  const data = await Model.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  res.json(data);
};

export const deleteOne = (Model) => async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
export const getOne = (Model) => async (req, res) => {
  const data = await Model.findById(req.params.id);
  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(data);
};
export const getAllResults = async (req, res) => {
  try {
    const data = await req.Model.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOneResult = (Model) => async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Result not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createResult = (Model) => async (req, res) => {
  try {
    const data = await Model.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateResult = (Model) => async (req, res) => {
  try {
    const data = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!data) return res.status(404).json({ message: "Result not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteResult = (Model) => async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
