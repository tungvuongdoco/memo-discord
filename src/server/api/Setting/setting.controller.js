import Model from './setting.model';

export async function update(group_id, data) {
  try {
    let find = await Model.findOne({ group_id: group_id }).lean();

    if(!find){
      await Model.create({...data, group_id: group_id})
    } else {
      await Model.findByIdAndUpdate(find._id, data, { new: true });
    }

    return "";
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};

export async function getQuery(group_id) {
  try {
    const data = await Model.findOne({group_id: group_id}).lean();

    return data
  } catch (err) {
    console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
    return null;
  }
};