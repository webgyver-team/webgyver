import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
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
  const [coordinateValue, setCoordinateValue] = useState({ x: null, y: null });
  const [locationValue, setLocationValue] = useRecoilState(locateValueState);

  // 컴포넌트 내 주소 관리 State
  const [addressValue, setAddressValue] = useState({
    address: locationValue.address
      ? locationValue.address
      : '여기를 눌러주세요.',
    detail: locationValue.detail ? locationValue.detail : '',
  });
  // 기본주소 변경 함수
  const setAddress = (ans) => {
    setAddressValue((prevState) => {
      return { ...prevState, address: ans };
    });
  };
  // 상세주소 변경 함수
  const setDetail = (ans) => {
    setAddressValue((prevState) => {
      return { ...prevState, detail: ans };
    });
  };
  // 상세주소 변경 실시간 반영
  const onChnageDetail = (e) => {
    setDetail(e.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handlePostOpen = () => setpostOpen(true);
  // 주소 선택창 닫힐 때 작동
  const onCompletePost = (data) => {
    setpostOpen(false);
    setAddress(data.address);
    // console.log(data.address);
  };

  const handleClose = () => {
    setOpen(false);
    setpostOpen(false);
  };

  // 확인 클릭 시, recoil Location 업데이트
  const updateLocationValueState = () => {
    setLocationValue({
      address: addressValue.address,
      detail: addressValue.detail,
      longitude: coordinateValue.x,
      latitude: coordinateValue.y,
    });
    handleClose();
  };

  // 주소 값 변동 시, 좌표 가져오기
  useEffect(() => {
    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표 검색
    // eslint-disable-next-line func-names
    geocoder.addressSearch(addressValue.address, function (result, status) {
      // 정삭적으로 검색 완료 시
      if (status === kakao.maps.services.Status.OK) {
        // console.log(result[0]);
        setCoordinateValue({ x: result[0].x, y: result[0].y });
      }
    });
  }, [addressValue.address]);

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
                <LocaInput
                  label="주소"
                  variant="outlined"
                  onClick={handlePostOpen}
                  value={addressValue.address}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <NullBox2 />
                <LocaInput
                  label="상세주소"
                  variant="outlined"
                  onChange={onChnageDetail}
                  value={addressValue.detail}
                />
                <NullBox1 />
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

const LocaInput = styled(TextField)`
  width: 100%;
`;

const NullBox1 = styled.div`
  height: 128px;
`;

const NullBox2 = styled.div`
  height: 16px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
