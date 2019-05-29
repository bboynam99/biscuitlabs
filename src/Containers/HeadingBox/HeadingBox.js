import React, {Component} from 'react';
import { PostWrapper, AccountBox, GameInfoBox } from '../../Components';
import { DepositBox, WithdrawBox } from '../index';
import Alert from 'react-s-alert';
import accountService from '../../Services/AccountService';

class HeadingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: accountService.account,
      address: accountService.address,
      balance: accountService.balance
    };

    if (accountService.account != null) {
      accountService.fetchAccount(false);
    }

    accountService.ee.on('updated', this.onAccountUpdated);
  }

  onAccountUpdated = () => {
    this.setState({
      account: accountService.account,
      address: accountService.address,
      balance: accountService.balance
    });
  };


  onClickLogin = async() => {
    accountService.kakaoSignup();
  };

  onClickLogout = async() => {
    accountService.clearAuth();
  };

  onClickDeposit = async() => {
    DepositBox.show();
  };

  onClickWithdraw = async() => {
    WithdrawBox.show();
  };

  onClickK2 = async() => {
    this.showMessage("곧 만나실수 있습니다!");
  };

  onClicNewKlaytnAccount = async() => {
    let uid = accountService.account.uid;
    let address = await accountService.issueKlaytnAccount(uid);

    if (address == null) {
      this.showMessage('클레이튼 계정을 만들 수 없습니다.');
      return;
    }

    await accountService.fetchAccount(true);
  };

  showMessage(message) {
    Alert.success(message, {
      position: 'top-right',
      effect: 'slide',
      beep: false,
      timeout: 3000
    });
  }

  render() {
    const {
      balance,
      account,
      address,
    } = this.state;

    let shortAddress = '';
    if (address) {
      shortAddress = address.substr(0, 6) + '...' + address.substr(38);
    }

    return (
      <div>
        <AccountBox
          address = {address}
          shortAddress = {shortAddress}
          account = {account}
          balance = {balance}
          onClicNewKlaytnAccount = {this.onClicNewKlaytnAccount}
          onClickLogin = {this.onClickLogin}
          onClickDeposit = {this.onClickDeposit}
          onClickWithdraw = {this.onClickWithdraw}
        />
        <GameInfoBox
          onClickK2 = {this.onClickK2}
        />
      </div>
    );
  }
}

export default HeadingBox;
