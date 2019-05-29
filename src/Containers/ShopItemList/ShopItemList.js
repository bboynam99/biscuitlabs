import React, { Component } from 'react';
import { PostWrapper, ShopItem } from '../../Components';
import { AlertBox } from '../index';
import { List } from "semantic-ui-react";
import accountService from '../../Services/AccountService';
import shopService from '../../Services/ShopService';
import util from '../../Utils/util';
import Alert from "react-s-alert";

class ShopItemList extends Component {
  constructor(props) {
    super();
    this.state = {
      rubies: []
    };

    this.loadRubies();
  }

  loadRubies = async() => {
    let rubies = await shopService.getRubies();
    if (rubies) {
      this.setState({
        rubies:rubies
      });
    }
  };

  onClickPurchase = async(ruby) => {
    if (!accountService.account) {
      Alert.error('먼저 로그인 하세요', this.defaultAlertOption());
      return;
    }

    if (!accountService.address) {
      Alert.error('계정을 먼저 만드세요.', this.defaultAlertOption());
      return;
    }

    const result = await AlertBox.display("구매 하시겠습니까?");
    if (result) {
      const result = await shopService.purchaseRuby(ruby.id);
      if (result) {
        Alert.success('구매 성공!', this.defaultAlertOption());
      } else {
        Alert.error('구매 실패', this.defaultAlertOption());
      }
    }
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
    const {
      rubies,
    } = this.state;

    return (
      <PostWrapper>
        <List verticalAlign='middle' className="ShopItem">
          { rubies.map((ruby, index) => {
            return (
              <ShopItem
                  key={index}
                  ruby={ruby}
                  fiat={util.comma(ruby.fiat)}
                  onClickPurchase={()=>this.onClickPurchase(ruby)}/>
            );
          })}
        </List>
      </PostWrapper>
    );
  }
}

export default ShopItemList;
