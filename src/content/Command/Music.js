import React from 'react';
import ytdl from 'ytdl-core';

function useMusic(message, newMusic) {
  const [listMusic, setListMusic] = React.useState({});

  React.useEffect(() => {
    console.log("aaaâ", message);
  }, [newMusic])

  // Trả về bất kỳ giá trị nào bạn cần sử dụng sau này
  return { listMusic, setListMusic };
}

export default async function Music(message, args, dataUser) {
  const text = args.join(' ');
  const newMusic = text;

  const { listMusic, setListMusic } = useMusic(message, newMusic);

  return null
}