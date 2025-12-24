const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

// GET danh sách BĐS (load thêm)
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const properties = await Property.find()
      .select(
        "name mainImage address status price bedrooms bathrooms area"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Property.countDocuments();

    res.json({
      data: properties,
      pagination: {
        page,
        limit,
        total,
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Không tìm thấy BĐS" });
    }

    res.json(property);
  } catch (error) {
    res.status(400).json({ message: "ID không hợp lệ" });
  }
});
router.post("/", async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/search", async (req, res) => {
  try {
    const { address, type, minPrice, maxPrice } = req.body;

    const query = {};

    if (address) {
      query.address = { $regex: address, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const properties = await Property.find(query).select(
      "name mainImage address status price bedrooms bathrooms area"
    );

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
