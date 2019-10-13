'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

const propTypes = {
  initialTab: PropTypes.string.isRequired
};

const TabRouter = props => {
  const [value, setValue] = React.useState(props.initialTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
        variant="fullWidth"
        onChange={handleChange}
      >
        <Tab label="簡易版" value="App" to="/" component={Link} />
        <Tab
          label="カスタム版"
          value="AdvancedApp"
          to="/advanced"
          component={Link}
        />
      </Tabs>
    </Paper>
  );
};

TabRouter.propTypes = propTypes;

export default TabRouter;
