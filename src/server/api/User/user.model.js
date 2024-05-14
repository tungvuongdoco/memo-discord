import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema(
  {
    call_me: { type: String }, // Tên được bot gọi
    id_city: { type: String }, // Nhận thông báo về thới tiết
    discord_id: { type: String },
    love: { type: Boolean, default: false }, // Bot là bạn gái

    full_name: { type: String }, // Họ tên
    gioi_tinh:  { type: String }, // Giới tính
    tuoi: { type: String }, // Tuổi
    date_of_birth: { type: String }, // Sinh nhật
    city: { type: String }, // Địa chỉ
    game: { type: String }, // Tên game
    character: { type: String }, // Tính cách
    so_thich: { type: String }, // Sở thích
    content: { type: String }, // Thông tin chung

    is_deleted: { type: Boolean, default: false },
    role_admin: { type: Boolean, default: false }, // Check cho sử dụng quyền admin trong 2h
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    collation: { locale: "vi" },
    versionKey: false
  }
);

schema.plugin(mongoosePaginate);
export default mongoose.model("User", schema, "User");
