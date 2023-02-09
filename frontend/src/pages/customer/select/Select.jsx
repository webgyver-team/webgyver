/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Reserve from './elements/Reserve';
import Direct from './elements/Direct';

function TabPanel(props) {
  // eslint-disable-next-line object-curly-newline
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Main>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: 'black' } }}
          >
            <Tab
              disableRipple
              label={
                <CustomTab className="classes.tabLabel">예약상담</CustomTab>
              }
              {...a11yProps(0)}
            />
            <Tab
              disableRipple
              label={
                <CustomTab className="classes.tabLabel">바로상담</CustomTab>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Reserve />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Direct />
        </TabPanel>
      </Box>
    </Main>
  );
}
const Main = styled.div`
  // 스크롤바를 제외한 너비만 계산
  width: calc(100vw - (100vw - 100%));
  .MuiBox-root {
    padding: 0;
  }
`;

const CustomTab = styled.span`
  color: ${(props) => props.theme.color.defaultColor};
  font-size: 20px;
  font-weight: bold;
`;
