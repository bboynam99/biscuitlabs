import React, { Component } from 'react';
import { Icon } from "semantic-ui-react";
import './TopNav.css';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className='TopNavBox'>
          <div className="TopNavL">
            <button onClick={this.props.onClickSidebar} className='ui basic TopNavButton'>
              <Icon name='bars' inverted/>
            </button>
          </div>

          <div className="TopNavC">
            Games
          </div>
          <div className="TopNavR">
          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;