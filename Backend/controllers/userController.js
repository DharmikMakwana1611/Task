const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    
    let dateValue = null;

    if (req.body.Date || req.body.date) {
      const parsed = new Date(req.body.Date || req.body.date);
      if (!isNaN(parsed)) dateValue = parsed;
    }

    
    const last = await User.findOne().sort({ srNo: -1 });

    const nextSrNo = last && !isNaN(last.srNo)
      ? Number(last.srNo) + 1
      : 1;

    const user = await User.create({
      srNo: nextSrNo,
      Categoty: req.body.Categoty,
      Amount: req.body.Amount,
      Date: dateValue
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserBySr = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { srNo: req.params.srNo },
      req.body,
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUserBySr = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ srNo: req.params.srNo });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



