import React from 'react';
import { Button } from 'semantic-ui-react';
import { PostWrapper } from '../index';
import Config from "../../Config/Config";
import './AccountBox.css';

const AccountBox = ({
  balance,
  account,
  address,
  shortAddress,
  onClicNewKlaytnAccount,
  onClickLogin, 
  onClickDeposit,
  onClickWithdraw}) => (

  <div className="AccountBox">
    <div>
      <PostWrapper>
        <div>
          <div>
              <img className="KlayIcon" src={require('../../Images/biscuit_04.png')} alt='Klaytn'/>
              <div className='LogoDesc'>We build blockchain games</div>
          </div>
        </div>
      </PostWrapper>
    </div>
  </div>
);

export default AccountBox;