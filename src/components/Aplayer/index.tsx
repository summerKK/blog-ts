import React from 'react';
// @ts-ignore
import ReactAplayer from 'react-aplayer';

const Aplayer = () => {
  const props = {
    theme: '#F57F17',
    lrcType: 3,
    fixed: true,
    mini: true,
    audio: [
      {
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
        theme: '#ebd0c2',
      },
      {
        name: 'トリカゴ',
        artist: 'XX:me',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
        theme: '#46718b',
      },
      {
        name: '前前前世',
        artist: 'RADWIMPS',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
        theme: '#505d6b',
      },
    ],
  };

  return (
    <div id="reactAplayer">
      <ReactAplayer {...props} />
    </div>
  );
};

export default Aplayer;
