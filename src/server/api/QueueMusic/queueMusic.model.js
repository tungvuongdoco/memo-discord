import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema(
  {
    chanel_id: { type: String },
    url: { type: String },
    name: { type: String },
    user_name: { type: String },
    index: { type: String }, // Số thứ tự bài hát
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
export default mongoose.model("Music", schema, "Music");
