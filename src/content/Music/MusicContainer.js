import React, { useState, useEffect } from 'react';

export default async function MusicContainer() {
  const [listMusic, setListMusic] = React.useState({});

  React.useEffect(() => {
    console.log("aaaâ", message);
  }, [newMusic])
  
  return {
    listMusic: listMusic
  }
}

