import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema(
  {
    call_me: { type: String }, // Tên được bot gọi
    date_of_birth: { type: String }, // Đến ngày sinh nhật đc bot chúc Sinh Nhật
    city: { type: String }, // Nhận thông báo về thới tiết
    id_city: { type: String }, // Nhận thông báo về thới tiết
    discord_id: { type: String },
    love: { type: Boolean, default: false }, // Bot là bạn gái
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
