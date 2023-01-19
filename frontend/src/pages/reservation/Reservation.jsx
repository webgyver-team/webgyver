/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Reserve from './elements/Reserve';

function TabPanel(props) {
  // eslint-disable-next-line object-curly-newline
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab
              label={
                <CustomTab className="classes.tabLabel">예약상담</CustomTab>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <CustomTab className="classes.tabLabel">바로상담</CustomTab>
              }
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Reserve />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Reserve />
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
  font-size: 24px;
  font-weight: bold;
`;
