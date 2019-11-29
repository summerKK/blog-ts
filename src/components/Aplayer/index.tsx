import React, { useEffect } from 'react';
// @ts-ignore
import ReactAplayer from 'react-aplayer';
import request from 'umi-request';

const Aplayer = () => {
  let aplayerRef: any;

  useEffect(() => {
    const fetchData = async () => {
      await request
        .get('https://api.i-meto.com/meting/api?server=netease&type=playlist&id=35798529')
        .then(response => {
          aplayerRef.list.add(response);
        });
    };
    fetchData();
  }, []);

  const props = {
    theme: '#F57F17',
    lrcType: 3,
    fixed: true,
    mini: true,
    audio: [],
  };

  const onInit = (ap: any) => {
    aplayerRef = ap;
  };

  return (
    <div id="reactAplayer">
      <ReactAplayer {...props} onInit={onInit} />
    </div>
  );
};

export default Aplayer;
