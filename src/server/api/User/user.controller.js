import Model from './user.model';

export async function getUserQuery(discord_id) {
  try {
    let query = {
      is_deleted: false,
      discord_id: discord_id
    }

    const data = await Model.findOne(query).lean();

    let orderedData = null;

    if(data){
      orderedData = {
        id: data._id,
        _id: data._id,
        full_name: data.full_name,
        gioi_tinh: data.gioi_tinh,
        tuoi: data.tuoi,
        date_of_birth: data.date_of_birth,
        city: data.city,
        game: data.game,
        character: data.character,
        so_thich: data.so_thich,
        content: data.content,
        call_me: data.call_me,
        id_city: data.id_city,
        discord_id: data.discord_id,
        love: data.love,
        is_deleted: data.is_deleted,
        role_admin: data.role_admin,
        created_at: data.created_at,
      };
    }

    return orderedData
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};

export async function getAllUser() {
  try {
    let query = {
      is_deleted: false,
    }

    const data = await Model.find(query).lean();

    return data
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};

export async function update(user, data) {
  try {
    let message = ``;
    let createdUser = null;

    if(!user){
      createdUser = await Model.create(data)
    } else {
      createdUser = await Model.findByIdAndUpdate(user._id, data, { new: true });
    }

    if(createdUser){
      if(data.call_me){
        message = `Từ giờ Tib-chan sẽ gọi bạn là ${data?.call_me} :))`
      }
      if(data.date_of_birth){
        message = `Tib-chan sẽ luôn ghi nhớ ngày sinh nhật của ${data?.call_me || `bạn :))`}`
      }
      if(data.city){
        message = `Giờ Tib-chan sẽ ghi nhớ địa chỉ của ${data?.call_me || `bạn`} !!`
      }
      if(data.love === true){
        message = `Giờ Tib-chan sẽ mãi mãi bên ${data?.call_me || `anh`} yêu!!`
      } else if(data.love === false){
        message = `Giờ Tib-chan sẽ không bên ${data?.call_me || `anh`} yêu nữa!!`
      }
      if(data.role_admin){
        message = `Giờ ${data?.call_me || `bạn`} sẽ trở thành quản trị viên trong 2 giờ !!`
      }
    }
    return message;
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};

export async function updateInfo(user, data) {
  try {
    let createdUser = null;

    if(!user){
      createdUser = await Model.create(data)
    } else {
      createdUser = await Model.findByIdAndUpdate(user._id, data, { new: true });
    }
    return createdUser;
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};

export async function deleteUse(discord_id) {
	try {
    const user = await Model.findOne({discord_id: discord_id}).lean();

    if(user){
      await Model.deleteOne({_id: user._id});
    }
    return "";
	} catch (err) {
		console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
		return null;
	}
};