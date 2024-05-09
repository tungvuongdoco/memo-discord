import Model from './queueMusic.model';

export async function addMusicEnterQueue(chanel_id, data) {
	try {
		let arrMusic = await Model.find({chanel_id: chanel_id}).lean();
		let index = 1;
		if(arrMusic.length && arrMusic.length >= 1){
			index = arrMusic.length + 1;
		}

		let createdMusic = await Model.create({...data, index})

		if(createdMusic){
			return [
        { 
          name: `Bài hát ${data.name}`, 
          value: `Đã được thêm vào hàng đợi với thứ tự ${index} 😋`, 
        }
      ]
		} 

		return [
      { 
        name: `Thêm bài hát ${data.name}`, 
        value: `Thất bại 😭`, 
      }
    ];
	} catch (err) {
		console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
		return null;
	}
};


export async function getAllQueueMusic(chanel_id) {
	try {
		let arrMusic = await Model.find({chanel_id: chanel_id}).sort({index: -1}).lean();
	
    if(arrMusic && arrMusic.length > 0){
      const mussic = arrMusic?.map((item, index) => {
        return { 
          name: `️🎶 ${index + 1}: ${item.name}`, 
          value: `- Bài hát được chọn bởi ${item.user_name}`
        }
      })

		  return mussic;
    } 
    return null;
	} catch (err) {
		console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
		return null;
	}
};

export async function remoteQueueMusic(chanel_id, index) {
	try {
		let arrMusic = await Model.deleteOne({chanel_id: chanel_id, index: index - 1});
	
    if(arrMusic && arrMusic.length > 0){
      const mussic = arrMusic?.map((item, index) => {
        return { 
          name: `️🎶 Bài hát ${item.name}`, 
          value: `- Bài hát được chọn bởi ${item.user_name}`
        }
      })

		  return mussic;
    } 
    return null;
	} catch (err) {
		console.log("Tib-chan bị lỗi khi lấy dữ liệu", err);
		return null;
	}
};