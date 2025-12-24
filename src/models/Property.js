const mongoose = require("mongoose");

const legalSchema = new mongoose.Schema(
  {
    investorName: String, // Tên chủ đầu tư
    licenseNumber: String, // Số giấy phép
    completionYear: Number, // Năm hoàn thành
    status: String, // Sẵn sàng bàn giao...
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên BĐS
    mainImage: { type: String, required: true }, // Ảnh chính
    subImages: [{ type: String }], // 3 ảnh phụ

    address: { type: String, required: true },
    status: { type: String }, // new, hot,...

    price: { type: Number, required: true },
    bedrooms: Number,
    bathrooms: Number,
    area: Number, // m2

    description: String,

    features: [{ type: String }], // Đặc điểm
    amenities: [{ type: String }], // Tiện ích

    legal: legalSchema, // Pháp lý

    type: {
      type: String,
      enum: [
        "Căn hộ chung cư",
        "Biệt thự",
        "Nhà phố liền kề",
        "Đất nền",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
