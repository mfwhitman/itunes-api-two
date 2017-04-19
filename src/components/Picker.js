import React, { PropTypes } from 'react'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Picker extends React.Component {
  render = () => {
    const { value, onClick, options } = this.props
    return (
      <span>
            <Toolbar style={{'background-color': '#BBDEFB'}}>
              <ToolbarGroup firstChild={true}>
                <DropDownMenu value={value}
                style={{
                        'text-transform': 'capitalize'
                      }}>
                  {options.map(option =>
                    <MenuItem
                      value={option}
                      key={option}
                      primaryText={option}
                      onTouchTap={e => onClick(option)}
                      style={{
                        'text-transform': 'capitalize'
                      }}
                      >
                    </MenuItem>)
                  }
                </DropDownMenu>
              </ToolbarGroup>
            </Toolbar>
      </span>
    )
  }
  
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Picker
