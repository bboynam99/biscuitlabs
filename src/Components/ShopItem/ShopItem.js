import React from 'react';
import { Button, Image, List } from 'semantic-ui-react';
import './ShopItem.css';

const ShopItem = ({ruby, fiat, onClickPurchase}) => (
  <List.Item>
    <List.Content floated='right' className="PurchaseBox">
    <Button color='blue' compact onClick={onClickPurchase}>구매하기</Button>
    </List.Content>
    <Image className="ItemIcon" src={require('../../Images/item1.png')} />
    <List.Content>
      <List className="ItemTitleBox" verticalAlign='middle'>
        <List.Item className="ItemTitle">{ruby.ruby} 루비</List.Item>
        <List.Item><span className="WonPrice">{fiat} 원</span> <span className="KlayPrice">({ruby.klay} KLAY)</span></List.Item>
      </List>
    </List.Content>
  </List.Item>
);

export default ShopItem;