import React, { Component } from 'react';
import { PostWrapper } from '../../Components';
import { Button, Input, Modal, Icon } from 'semantic-ui-react'
import accountService from '../../Services/AccountService';
import './WithdrawBox.css';
import Alert from "react-s-alert";

class WithdrawBox extends Component {
  static instance = null;

  to = React.createRef();
  amount = React.createRef();

  constructor(props) {
    super(props);
    WithdrawBox.instance = this;
    this.state = {
      open: false
    };
  }

  static show() {
    WithdrawBox.instance.setOpen(true);
  }

  static hide() {
    WithdrawBox.instance.setOpen(false);
  }

  setOpen = (open) => {
    this.setState({
      open: open
    });
  };

  close = () => {
    this.setOpen(false);
  };

  onClickWithdraw = () => {
    accountService.kakao.Auth.login({
      success: this.kakaoLoginSuccess,
      fail: this.kakaoLoginFailed
    });
  };

  kakaoLoginSuccess = (authObj) => {
    this.doWithdraw(authObj.access_token);
  };

  kakaoLoginFailed = err => {
    console.error(err);
    Alert.error('카카오 로그인에 실패했습니다.', this.defaultAlertOption());
  };

  doWithdraw = async (oauthToken) => {
    let to = this.to.current.inputRef.current.value;
    let amount = this.amount.current.inputRef.current.value;
    let result = await accountService.withdraw(to, amount, oauthToken);
    await accountService.getKlaybalance();
    if (result && result.transactionHash) {
      Alert.success('전송 성공!', this.defaultAlertOption());
      this.setOpen(false);
    } else {
      Alert.error('출금 실패', this.defaultAlertOption());
    }

    console.error(result);
  };

  defaultAlertOption() {
    return {
      position: 'top-right',
      effect: 'slide',
      beep: false,
      timeout: 3000
    };
  }

  render() {
    const { open } = this.state;

    return (
      <PostWrapper>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>출금</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h4 className='SbCntHeading'>받을 주소</h4>
              <Input
                  fluid
                  placeholder='Address'
                  value='0x86d204cf251302040f4524c02ff1842ebcec3729'
                  ref={this.to}
              />
            </Modal.Description>
            <Modal.Description>
              <h4 className='SbCntHeading'>출금 액</h4>
              <p className='SbCntContent'>잔고 이내의 액수를 적어주세요. 출금 수수료가 발생하기 때문에 수수료 만큼을 제외하고 적어주세요.</p>
              <Input
                  label={{ content: 'KLAY' }}
                  labelPosition='right'
                  placeholder='0.000000'
                  fluid
                  ref={this.amount}
              />
            </Modal.Description>
            <Modal.Description>
              <h4 className='SbCntHeading'>최대 수수료</h4>
              <p className='SbCntContent'>클레이튼 네트웍을 이용하는데 필요한 수수료가 발생합니다. 수수료는 네트웍 상황에 따라 변동될 수 있습니다.</p>
              <Input
                  label={{ content: 'KLAY' }}
                  labelPosition='right'
                  value='0.000625'
                  fluid
                  readOnly={true}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.setOpen(false)}>
              취소
            </Button>
            <Button primary onClick={this.onClickWithdraw}>
              전송 <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
      </PostWrapper>
    );
  }
}

export default WithdrawBox;
