/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import Info from './elements/Info';
import Review from './elements/Review';
import Example from './elements/Example';
import { masterInfoModalState, masterInfoModalIdxState } from '../../../atom';
import { customer } from '../../../api/customerService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  height: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  pt: 5,
  pb: 3,
};

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

export default function MasterInfo() {
  const [modalState, setmodalState] = useRecoilState(masterInfoModalState);
  const [modalIdxState, setModalIdxState] = useRecoilState(
    masterInfoModalIdxState,
  ); // modal 내 마스터의 idx
  const [value, setValue] = useState(0);

  const closeMasterInfoState = () => {
    setModalIdxState(null);
    setmodalState(false);
    setValue(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [info, setInfo] = useState(null);
  const [review, setReview] = useState(null);
  const [example, setExample] = useState(null);
  useEffect(() => {
    if (modalIdxState === null) return;
    const getMasterInfo = async () => {
      const responseInfo = await customer.get.masterInfo(modalIdxState);
      setInfo(responseInfo.data.profile);

      const responseExample = await customer.get.masterHistory(modalIdxState);
      setExample(responseExample.data.historyList.reverse());

      const responseReview = await customer.get.masterReview(modalIdxState);
      setReview(responseReview.data.reviews.reverse());
    };
    getMasterInfo();
  }, [modalIdxState]);

  return (
    <div>
      <Modal
        open={modalState}
        onClose={closeMasterInfoState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomBox sx={modalStyle}>
          <CloseBtn onClick={closeMasterInfoState} />
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
                    <CustomTab className="classes.tabLabel">정보</CustomTab>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  disableRipple
                  label={
                    <CustomTab className="classes.tabLabel">후기</CustomTab>
                  }
                  {...a11yProps(1)}
                />
                <Tab
                  disableRipple
                  label={
                    <CustomTab className="classes.tabLabel">사례</CustomTab>
                  }
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Info props={info} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Review props={review} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Example props={example} />
            </TabPanel>
          </Box>
        </CustomBox>
      </Modal>
    </div>
  );
}

const CloseBtn = styled(CloseIcon)`
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const CustomBox = styled(Box)`
  max-height: 85vh;

  // 넘치면 스크롤
  overflow-y: scroll;

  // 아래는 스크롤을 없애는 명령어
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const CustomTab = styled.span`
  color: ${(props) => props.theme.color.defaultColor};
  font-size: 20px;
  font-weight: bold;
`;
