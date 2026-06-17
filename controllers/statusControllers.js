import Status from "../models/StatusModel.js";

export const createStatus = async (req, res) => {
  try {
    const { text, image } = req.body;

    const status = await Status.create({
      userId: req.user._id,
      text,
      image,
    });

    res.status(201).json(status);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllStatus = async (req, res) => {
  try {
    const yesterday = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    );

    const statuses = await Status.find({
      createdAt: { $gte: yesterday },
    })
      .populate("userId", "fullname profilePic")
      .sort({ createdAt: -1 });

    res.json(statuses);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const viewStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const status = await Status.findById(id);

    if (!status) {
      return res.status(404).json({
        message: "Status not found",
      });
    }

    if (
      !status.viewedBy.includes(req.user._id)
    ) {
      status.viewedBy.push(req.user._id);
      await status.save();
    }

    res.json(status);
  } catch (error) {
    res.status(500).json(error);
  }
};