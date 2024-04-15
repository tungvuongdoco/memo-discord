import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://tungvuongdora:Trungiu.96@tib-chan.gwwdmte.mongodb.net/?retryWrites=true&w=majority&appName=Tib-chan";

const config = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Tib-chan đã sẵn sàng truy cập vào cơ sở dữ liệu !!");
  } catch (error) {
    console.error("Tib-chan chưa truy cập vào cơ sở dữ liệu:", error.message);
    process.exit(1);
  }
}

export default config;