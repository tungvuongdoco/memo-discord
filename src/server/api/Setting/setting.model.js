import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema(
  {
    group_id: { type: String },
    chanel_welecom: { type: String },
    chanel_goodbye: { type: String },
    content_welecom: { type: String },
    content_goodbye: { type: String },
    chanel_changeName: { type: String },

    chanel_info: { type: String }, // Kênh nhận giới thiệu
    role_info: { type: String }, // Id role khi đã giới thiệu

    informational_facebook_link: { type: String },
    chanel_informational_facebook_link: { type: String },

    is_deleted: { type: Boolean, default: false },
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
export default mongoose.model("Setting", schema, "Setting");
