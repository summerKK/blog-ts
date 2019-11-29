import React, { useEffect, useState } from 'react';
// @ts-ignore
import ReactAplayer from 'react-aplayer';
import request from 'umi-request';

const Aplayer = () => {
  const [aplayerComponent, setAplayerComponent] = useState<React.FC>();

  const props = {
    theme: '#F57F17',
    lrcType: 3,
    fixed: true,
    mini: true,
    audio: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      await request
        .get('https://api.i-meto.com/meting/api?server=netease&type=playlist&id=35798529')
        .then(response => {
          props.audio = response;
          const reactDom = ((<ReactAplayer {...props} />) as any) as React.FC;
          setAplayerComponent(reactDom);
        });
    };
    fetchData();
  }, []);

  return <div id="reactAplayer">{aplayerComponent}</div>;
};

export default Aplayer;
