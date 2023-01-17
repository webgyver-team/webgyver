import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import ChooseModal from './elements/ChooseModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [child, setChild] = React.useState(false);
  const childOpen = () => setChild(true);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseBtn onClick={handleClose} />
          <Header>주소설정</Header>
          <Body>
            <p>주소</p>
            <LocaBoxClick onClick={childOpen}>주소가 막 적혀 있어</LocaBoxClick>
            <p>상세주소</p>
            <LocaInput />
            <NullBox />
            <p>이 주소가 맞나요?</p>
          </Body>
          <BtnBox>
            <Button variant="contained">확인</Button>
          </BtnBox>
        </Box>
      </Modal>
      <ChooseModal child={child} setChild={setChild} />
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
  border: 3px solid ${(props) => props.theme.color.defaultColor};
  cursor: pointer;
`;

const LocaInput = styled.input`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 8px;
  border: 3px solid ${(props) => props.theme.color.defaultColor};
`;

const NullBox = styled.div`
  height: 128px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
