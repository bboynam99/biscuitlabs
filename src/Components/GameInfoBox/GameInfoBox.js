import React from 'react';
import { Button, Image, Icon } from 'semantic-ui-react';
import Config from '../../Config/Config';
import './GameInfoBox.css';

const GameInfoBox = ({state, onClickK2}) => (
  <div className="GameInfoBox">
    <div>
      <h1>GAMES</h1>
      <div>
        <Image.Group>        
          <a href="https://eosknights.io"><Image src={require('../../Images/EKicon.png')} className='AppIcon'/></a> 
          <a onClick={onClickK2}><Image src={require('../../Images/KKicon.png')} className='AppIcon'/> </a>
        </Image.Group>
      </div>
    </div>
  </div>
);

export default GameInfoBox;