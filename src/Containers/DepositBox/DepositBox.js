import React, { Component } from 'react';
import { PostWrapper } from '../../Components';
import { Button, Input, Modal } from 'semantic-ui-react'
import accountService from '../../Services/AccountService';
import copy from 'copy-to-clipboard';
import './DepositBox.css';
import Alert from "react-s-alert";

class DepositBox extends Component {
  static instance = null;

  constructor(props) {
    super(props);
    DepositBox.instance = this;
    this.state = {
      open: false
    };
  }

  setOpen = (open) => {
    this.setState({
      open: open
    });
  };

  close = () => {
    this.setOpen(false);
  };

  onClickCopy = () => {
    copy(accountService.address);
    Alert.success('복사 완료', this.defaultAlertOption());
  };

  defaultAlertOption() {
    return {
      position: 'top-right',
      effect: 'slide',
      beep: false,
      timeout: 3000
    };
  }

  static show() {
    DepositBox.instance.setOpen(true);
  }

  static hide() {
    DepositBox.instance.setOpen(false);
  }

  render() {
    const { open } = this.state;
    let address = "";
    if (accountService.address != null) {
      address = accountService.address;
    }

    return (
      <PostWrapper>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>입금</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h4 className='SbCntHeading'>보낼 주소</h4>
              <p className='SbCntContent'>복사 버튼을 눌러 주소를 복사하세요. 보내시기전 주소를 한번더 확인해주세요. 잘못된 주소로 보내면 돌려 받을 수 없습니다.</p>
              <Input
                  action={{ icon: 'copy', onClick: () => this.onClickCopy() }}
                  fluid
                  placeholder='Address'
                  readOnly
                  value={address}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={()=>this.setOpen(false)}>
              닫기
            </Button>
          </Modal.Actions>
        </Modal>
      </PostWrapper>
    );
  }
}

export default DepositBox;
