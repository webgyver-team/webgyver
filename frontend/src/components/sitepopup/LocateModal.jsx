import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import DaumPostcode from 'react-daum-postcode';
import { useRecoilState } from 'recoil';
import { locateValueState } from '../../atom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pt: 5,
};

const postCodeStyle = {
  width: 310,
  height: 500,
};

// kakao 가져오기
const { kakao } = window;

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [postOpen, setpostOpen] = useState(false);
  // eslint-disable-next-line prettier/prettier
  const [inputAddressValue, setInputAddressValue] = useState('여기를 눌러주세요.');
  const [inputAddDetailValue, setInputAddDetailValue] = useState('');
  const [coordinateValue, setCoordinateValue] = useState({ x: null, y: null });
  const [locationValue, setLocationValue] = useRecoilState(locateValueState);

  const handleOpen = () => setOpen(true);
  const handlePostOpen = () => setpostOpen(true);
  const onCompletePost = (data) => {
    setpostOpen(false);
    setInputAddressValue(data.address);
    // console.log(data.address);
  };

  const handleClose = () => {
    setOpen(false);
    setpostOpen(false);
  };

  const updateLocationValueState = () => {
    setLocationValue({
      address: inputAddressValue,
      detail: inputAddDetailValue,
      longitude: coordinateValue.x,
      latitude: coordinateValue.y,
    });
    handleClose();
  };

  useEffect(() => {
    setInputAddDetailValue(locationValue?.detail);
  }, [locationValue?.detail]);

  const onChnageDetail = (e) => {
    setInputAddDetailValue(e.target.value);
  };

  // 주소 값 변동 시, 좌표 가져오기
  useEffect(() => {
    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표 검색
    // eslint-disable-next-line func-names
    geocoder.addressSearch(inputAddressValue, function (result, status) {
      // 정삭적으로 검색 완료 시
      if (status === kakao.maps.services.Status.OK) {
        // console.log(result[0]);
        setCoordinateValue({ x: result[0].x, y: result[0].y });
      }
    });
  }, [inputAddressValue]);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <CloseBtn onClick={handleClose} />
          {!postOpen && (
            <>
              <Header>주소설정</Header>
              <Body>
                <p>주소</p>
                <LocaBoxClick onClick={handlePostOpen}>
                  {locationValue?.address
                    ? locationValue.address
                    : inputAddressValue}
                </LocaBoxClick>
                <p>상세주소</p>
                <LocaInput
                  onChange={onChnageDetail}
                  value={inputAddDetailValue}
                />
                <NullBox />
                <p>이 주소가 맞나요?</p>
              </Body>
              <BtnBox>
                <Button variant="contained" onClick={updateLocationValueState}>
                  확인
                </Button>
              </BtnBox>
            </>
          )}
          {postOpen && (
            <div>
              <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />
            </div>
          )}
        </Box>
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

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Body = styled.div`
  padding: 16px;

  p {
    font-size: 16px;
    font-weight: bold;
    padding-top: 8px;
  }

  p:last-child {
    text-align: center;
  }
`;

const LocaBoxClick = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.color.defaultColor};
  cursor: pointer;
`;

const LocaInput = styled(TextField)`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 8px;
`;

const NullBox = styled.div`
  height: 128px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
