import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router';
import locale from '../localization/locale';
import Tabs from './tabs/Tabs';

import './styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.locale = locale.getLocale();
  }

  render() {
    return (
      <div className='app-header'>
        <div className='header-title'>
          <h1>The Place</h1>
        </div>
        <div className='header-balance'>
        </div>
        <Tabs location={this.props.location} />
        <IconMenu
          className='logout-icon-menu'
          iconButtonElement={<IconButton><div className='account-circle'><AccountCircle color='black' /></div></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
          <MenuItem 
            primaryText={`${this.locale.general.editProfile}`}
            containerElement={<Link to='/profile' />}
          />
          <MenuItem primaryText={`${this.locale.general.logout}`} />
        </IconMenu>
      </div>
    )
  }
  render2() {
    const {styles} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
    };

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              showMenuIconButton={false}
              title={
                <h2 style={{marginLeft: '1em', marginTop: '0em'}}>{this.locale.general.title}</h2>
              }
              iconElementRight={
                <IconMenu
                  iconButtonElement={<IconButton><div className='account-circle'><AccountCircle color='white' /></div></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                  <MenuItem 
                    primaryText={`${this.locale.general.editProfile}`}
                    containerElement={<Link to='/profile' />}
                  />
                  <MenuItem primaryText={`${this.locale.general.logout}`} />
                </IconMenu>
              }
            />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
};

export default Header;
