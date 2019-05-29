import Config from "../Config/Config";
import www from "../Utils/www.js";
import Alert from "react-s-alert";
import util from "../Utils/util";

var EventEmitter = require('events')

class AccountService {
  ee = new EventEmitter();

  constructor() {
    this.balance = "0";
    this.address = "";
    this.kakao = window.kakao;
    this.account = JSON.parse(localStorage.getItem('account'));
    window.kakao = null;
    this.cacheAuth();
  }

  cacheAuth() {
    if (this.account) {
      www.uid = this.account.uid;
      www.accessToken = this.account.token;
    }
  }

  clearAuth() {
    localStorage.removeItem('account');
    this.auth = null;
    this.account = null;
    this.balance = "0";
    this.ee.emit('updated')
  }

  kakaoSignup = async() => {
    this.kakao.Auth.login({
      success: (authObj) => {
        this.fetch(authObj.access_token);
      },
      fail: (err) => {
        console.error(err);
        this.showError('카카오 로그인에 실패했습니다:' + JSON.stringify(err));
      }
    });
  };

  showError(message) {
    Alert.error(message, {
      position: 'top-right',
      effect: 'slide',
      beep: false,
      timeout: 3000
    });
  }

  fetch = async (accessToken) => {
    let account = await this.signup(accessToken);
    if (account) {
      await this.fetchAccount(true);
    }
  };

  fetchAccount = async(showError) => {
    await util.sleep(1);

    this.balance = "0";
    this.address = "";
    if (this.account != null) {
      this.account = await this.signin();
    }

    if (!this.account) {
      this.clearAuth();
      if (showError) {
        this.showError('로그인에 실패했습니다.');
      }
    } else {
      this.address = await this.getKlayAddress();
      if (this.address) {
        let res = await this.getKlaybalance();
        if (!res) {
          this.showError('잔고를 읽어올 수 없습니다.');
        } else {
          this.balance = res.klay;
        }
      }
    }

    this.ee.emit('updated')
  };

  signin = async () => {
    const path = 'v1/account/signin';
    this.account = await www.post(Config.amApi + path, {}, true);
    if (this.account) {
      localStorage.setItem('account', JSON.stringify(this.account));
    }

    this.cacheAuth();
    this.ee.emit('updated')
    return this.account;
  };

  signup = async (accessToken) => {
    const path = 'v1/account/signup/kakao';
    this.account = await www.post(Config.amApi + path, {
      accessToken:accessToken
    }, true);

    if (this.account) {
      localStorage.setItem('account', JSON.stringify(this.account));

    }

    this.cacheAuth();
    this.ee.emit('updated')
    return this.account;
  };

  getKlayAddress = async () => {
    const path = 'v1/account/klaytn';
    let res = await www.get(Config.amApi + path, {}, true);

    if (res) {
      this.address = res.address;
      return this.address;
    }

    this.ee.emit('updated')
    return "";
  };

  issueKlaytnAccount = async uid => {
    const path = 'v1/account/issue/klaytn';
    const res = await www.post(Config.amApi + path, {}, true);
    this.ee.emit('updated')
    return res;
  };

  getKlaybalance = async () => {
    const path = `v1/klay/balance`;
    let balance = await www.get(Config.amApi + path, true);
    if (balance) {
      this.balance = balance.klay;
      this.ee.emit('updated')
      return balance;
    }

    return this.balance;
  };

  withdraw = async (to, amount, oauthToken) => {
    const path = 'v1/account/withdraw';
    let res = await www.post(Config.amApi + path, {
      to: to,
      amount: amount,
      oauthToken: oauthToken
    }, true);

    this.ee.emit('updated')
    return res;
  };

  getWithdrawLogs = async () => {
    const path = 'v1/account/withdraw/logs/20';
    return await www.get(Config.amApi + path, true);
  };
}

export default new AccountService();
