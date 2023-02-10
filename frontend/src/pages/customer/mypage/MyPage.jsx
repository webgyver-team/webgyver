/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MyInfo from './element/MyInfo';
import ReviewHistory from './element/ReviewHistory';

function TabPanel(props) {
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
        <Box sx={{ p: 0 }}>
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
      <Header>마이페이지</Header>
      <Body>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <Tab
            disableRipple
            label={
              <CustomTab
                style={value === 0 ? { fontWeight: 'bold' } : {}}
                className="classes.tabLabel"
              >
                내 정보
              </CustomTab>
            }
            {...a11yProps(0)}
          />
          <BarBox>
            <VerticalBar />
          </BarBox>
          <Tab
            disableRipple
            label={
              <CustomTab
                style={value === 2 ? { fontWeight: 'bold' } : {}}
                className="classes.tabLabel"
              >
                내 리뷰
              </CustomTab>
            }
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <MyInfo />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ReviewHistory />
        </TabPanel>
      </Body>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  margin: 16px;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Body = styled.div`
  margin-top: 0px;
`;

const BarBox = styled.div`
  display: flex;
  align-items: center;
`;

const VerticalBar = styled.div`
  width: 1px;
  height: 32px;
  background-color: ${(props) => props.theme.color.dafaultBorder};
`;

const CustomTab = styled.span`
  color: ${(props) => props.theme.color.defaultColor};
  font-size: 16px;
`;
