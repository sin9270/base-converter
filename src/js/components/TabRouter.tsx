import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {
  initialTab: string;
}

const TabRouter: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<string>(props.initialTab);

  const handleChange = (_: React.SyntheticEvent<Element, Event>, newValue: string) => {
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
        <Tab
          label={<FormattedMessage id="simple" />}
          value="App"
          to="/simple"
          component={Link}
        />
        <Tab
          label={<FormattedMessage id="custom" />}
          value="AdvancedApp"
          to="/custom"
          component={Link}
        />
      </Tabs>
    </Paper>
  );
};

export default TabRouter;
