import * as React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginOpenState, authState, accessToken } from '../../../atom';
import { customer } from '../../../api/accountsApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  height: 380,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const navigate = useNavigate();
  const modalState = useRecoilState(loginOpenState);
  const setLoginState = useSetRecoilState(loginOpenState);
  const setAccessToken = useSetRecoilState(accessToken);
  const setAuthState = useSetRecoilState(authState);
  const closeLogin = () => setLoginState(false);
  const [data, setData] = React.useState({ id: '', password: '' });
  const [errors, setErrors] = React.useState({
    nullIdError: false,
    nullPasswordError: false,
  });
  const onChangeAccount = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // 제출 시 id/pw 빈 칸이 아닌지 검증
  const submit = async () => {
    if (data?.id === '') {
      setErrors({
        nullIdError: true,
        nullPasswordError: false,
      });
    } else if (data?.password === '') {
      setErrors({
        nullIdError: false,
        nullPasswordError: true,
      });
    } else {
      setErrors({
        nullIdError: false,
        nullPasswordError: false,
      });

      const response = await customer.login(data);
      if (response.statusCode === 200) {
        // 리코일persist 상태 변경
        setAuthState('customer');
        setAccessToken(response.data['access-token']);
        setLoginState(false);
      } else {
        setAuthState(null);
        setAccessToken('');
      }
    }
    // console.log(errors);
  };
  // 회원가입 링크
  const routeSignup = () => {
    setLoginState(false);
    navigate('/signup');
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
            <TextField
              id="id"
              name="id"
              label="아이디"
              variant="outlined"
              required
              fullWidth
              inputProps={{ minLength: 6, maxLength: 10 }}
              onChange={onChangeAccount}
            />
            {errors.nullIdError && <ErrDiv>아이디를 입력하세요</ErrDiv>}
            <NullBox />
            <TextField
              id="password"
              name="password"
              type="password"
              label="비밀번호"
              variant="outlined"
              required
              fullWidth
              inputProps={{ minLength: 6, maxLength: 10 }}
              onChange={onChangeAccount}
            />
            {errors.nullPasswordError && <ErrDiv>비밀번호를 입력하세요</ErrDiv>}
            {/* <NullBox /> */}
          </Body>
          {!(errors.nullIdError || errors.nullPasswordError) && <NullBox />}
          <NullBox />
          <Linkdiv onClick={routeSignup}>회원가입</Linkdiv>
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

const NullBox = styled.div`
  height: 13.6px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const ErrDiv = styled.div`
  color: red;
  font-size: 8px;
`;

const Linkdiv = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: gray;
  font-size: 16px;
`;
