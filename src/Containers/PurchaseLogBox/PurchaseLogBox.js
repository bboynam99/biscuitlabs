import React, { Component } from 'react';
import { PostWrapper } from '../../Components';
import { Button, Grid, Modal, Item } from 'semantic-ui-react'
import Config from "../../Config/Config";
import shopService from '../../Services/ShopService';
import './PurchaseLogBox.css';
const moment = require('moment');

class PurchaseLogBox extends Component {
  static instance = null;

  constructor(props) {
    super(props);
    PurchaseLogBox.instance = this;
    this.state = {
      open: false,
      logs: []
    };
  }

  static show() {
    PurchaseLogBox.instance.setOpen(true);
  }

  static hide() {
    PurchaseLogBox.instance.setOpen(false);
  }

  loadLogs = async () => {
    let logs = await shopService.getPurchaseLogs();
    if (logs) {
      this.setState({
        logs:logs
      });
    }
  };

  setOpen = (open) => {
    if (open) {
      this.loadLogs();
    }

    this.setState({
      open: open
    });
  };

  close = () => {
    this.setOpen(false);
  };

  render() {
    const { open, logs } = this.state;
    let logCount = 0;
    if (logs) {
      logCount = logs.length;
    }

    return (
      <PostWrapper>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>출금 기록</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              { logCount > 0 ?
                  <p className='SbCntContent'>최근 20개의 기록이 표시됩니다.</p>
                  :
                  <p className='SbCntContent'>구매 기록이 없습니다.</p>
              }
              <div>

              { logs.map((log, index) => {
                const time = moment.unix(Number(log.trxTime)).format("MM-DD HH:MM")

                const trx = log.trxHash.substr(0, 6) + '...' + log.trxHash.substr(62);
                const trxAddress = Config.explorer + 'tx/' + log.trxHash;
                return (
                  <div key={index} className='WithrawItem'>

                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column width={4}>
                          시간
                        </Grid.Column>
                        <Grid.Column width={6}>
                          {time}
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={2}>
                        <Grid.Column width={4}>
                          루비
                        </Grid.Column>
                        <Grid.Column width={6}>
                          {log.itemAmount}
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={2}>
                        <Grid.Column width={4}>
                          구매 액
                        </Grid.Column>
                        <Grid.Column width={6}>
                          {log.amount} {log.payType}
                        </Grid.Column>
                      </Grid.Row>

                      <Grid.Row columns={2}>
                        <Grid.Column width={4}>
                          트랜잭션
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <a href={trxAddress}>{trx}</a>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                );
              })}
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.setOpen(false)}>
              확인
            </Button>
          </Modal.Actions>
        </Modal>
      </PostWrapper>
    );
  }
}

export default PurchaseLogBox;
