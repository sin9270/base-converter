/* eslint @typescript-eslint/no-explicit-any: 0 */
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  initialTab: string;
}

const TabRouter: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<string>(props.initialTab);

  const handleChange = (_: any, newValue: string) => {
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

export default TabRouter;