import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  authState,
  accessToken,
  userIdx,
  locateValueState,
} from '../../../atom';
import { master } from '../../../api/accountsApi';
import { master as api } from '../../../api/masterService';
import WebGyver from '../../../assets/image/WebGyver.png';

const style = {
  width: 360,
  height: 380,
  p: 2,
  pt: 5,
};

export default function MasterLogin() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const setAccessToken = useSetRecoilState(accessToken);
  const setUserIdx = useSetRecoilState(userIdx);
  const setLocationValue = useSetRecoilState(locateValueState);
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
      const response = await master.login(data);
      if (response.statusCode === 200) {
        // 리코일persist 상태 변경
        setAccessToken(response.data['access-token']);
        setUserIdx(response.data.sellerIdx);
        setAuth('master');
        navigate('/master/schedule');
      } else {
        // eslint-disable-next-line no-alert
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
      const locate = await api.get.locate(response.data.sellerIdx);
      if (locate.statusCode === 200 && locate.data.sellerAddress !== null) {
        setLocationValue({
          address: locate.data.sellerAddress.address,
          detail: locate.data.sellerAddress.detailAddress,
          longitude: locate.data.sellerAddress.lng,
          latitude: locate.data.sellerAddress.lat,
        });
      }
    }
  };
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };
  const routeSignup = () => {
    navigate('/master/signup');
  };

  return (
    <Main>
      <BoxBox>
        <MainImgBox>
          <MainImg src={WebGyver} alt="" />
        </MainImgBox>
        <Box sx={style}>
          <Header>전문가 로그인</Header>
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
              onKeyPress={handleOnKeyPress}
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
      </BoxBox>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MainImgBox = styled.div`
  margin-bottom: 32px;
`;

const MainImg = styled.img`
  width: 300px;
`;

const BoxBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
