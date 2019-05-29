import React, { Component } from "react";
import { Footer, SimpleLoader } from "./Components";
import Alert from 'react-s-alert';
import Sidenav from 'sidenavjs'
import {
  HeadingBox,
  ShopItemList,
  DepositBox,
  WithdrawBox,
  WithdrawLogBox,
  PurchaseLogBox,
  TopNav,
  LeftNav,
  AlertBox } from "./Containers";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
    };
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  };

  render() {
    return (
      <div>
        <HeadingBox/>
        <Footer/>
        <AlertBox/>
        <Alert stack={{limit: 3}} />
        <SimpleLoader />
      </div>
    );
  }
}

export default App;
