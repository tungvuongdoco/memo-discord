import Model from './music.model';

export async function addMusicFavourite(user, data) {
  try {
    let message = ``;

    let arrMusic = await Model.find({user_id: user._id, is_deleted: false}).lean();
    let index = 1;
    if(arrMusic.length && arrMusic.length >= 1){
      index = arrMusic.length + 1;
    }

    let createdMusic = await Model.create({...data, index})

    if(createdMusic){
      message = `Đã thêm bài hát của ${data?.call_me || `bạn`} vào danh sách nhạc yêu thích!!`;
    }

    return message;
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};

export async function removeMusicFavourite(user, data) {
  try {
    let message = ``;

    let deleteMusic = await Model.findOneAndDelete({
      is_deleted: false,
      index: data.index,
      user_id: user._id
    });

    if(deleteMusic){
      let arrMusic = await Model.find({user_id: user._id, is_deleted: false})
        .sort({ created_at: -1 })
        .lean();
      arrMusic?.map(async(item, index) => {
        await Model.findByIdAndUpdate(user._id, {index: index + 1});
      })
    }

    if(createdMusic){
      message = `Đã xóa bài hát trong danh sách nhạc yêu thích của ${data?.call_me || `bạn`}!!`;
    }

    return message;
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};