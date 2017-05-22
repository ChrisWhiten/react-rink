import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';

import './Header.css';

class Header extends React.Component {

  render() {
    const {styles} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              showMenuIconButton={false}
              iconElementRight={
                <IconMenu
                  iconButtonElement={<div className='account-circle'><AccountCircle color='white' /></div>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                  <MenuItem 
                    primaryText="Edit Profile" 
                    containerElement={<Link to='/profile' />}
                  />
                  <MenuItem primaryText="Log Out" />
                </IconMenu>
              }
            />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default Header;
