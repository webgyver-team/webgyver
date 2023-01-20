import * as React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { loginOpenState } from '../../atom';

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

export default function LoginModal() {
  const modalState = useRecoilState(loginOpenState);
  const setLoginState = useSetRecoilState(loginOpenState);
  const closeLogin = () => setLoginState(false);
  const [payload, setPayload] = React.useState({ id: '', password: '' });
  const [errors, setErrors] = React.useState({
    nullIdError: false,
    nullPasswordError: false,
  });
  const onChangeAccount = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const submit = () => {
    if (payload?.id === '') {
      const newErrors = errors;
      newErrors.nullIdError = true;
      setErrors(errors);
      setTimeout(() => {
        newErrors.nullIdError = false;
        setErrors(newErrors);
      }, 2000);
    } else if (payload?.password === '') {
      const newErrors = errors;
      newErrors.nullPasswordError = true;
      setErrors(newErrors);
      setTimeout(() => {
        newErrors.nullPasswordError = false;
        setErrors(newErrors);
      }, 2000);
    }
    console.log(errors);
  };

  return (
    <div>
      <Modal
        open={modalState[0]}
        onClose={closeLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseBtn onClick={closeLogin} />
          <Header>로그인</Header>
          <Body>
            <p>아이디</p>
            <LocaInput id="id" name="id" onChange={onChangeAccount} />
            <p>비밀번호</p>
            <LocaInput
              id="password"
              name="password"
              type="password"
              onChange={onChangeAccount}
            />
            <NullBox />
          </Body>
          <BtnBox>
            <Button variant="contained" onClick={submit}>
              로그인
            </Button>
          </BtnBox>
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

const LocaInput = styled.input`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.color.defaultColor};
`;

const NullBox = styled.div`
  height: 72px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
