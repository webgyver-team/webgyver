import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AWS from 'aws-sdk';
import { sha256 } from 'js-sha256';
import { exampleFormState, userIdx } from '../../../../atom';
import { master } from '../../../../api/masterService';
import ImageInput from '../../../customer/reservation/elements/ImageInput';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  // height: 430,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Form({ setReload }) {
  // 폼 모달 ON/OFF 함수
  const [modalOpen, setModalOpen] = useRecoilState(exampleFormState);
  const modalClose = () => setModalOpen(false);

  // 내용 관련 데이터
  const [formContent, setFormContent] = useState('');
  const [msgForContent, setMsgForContent] = useState('');

  // 이미지 변수
  const [imageList, setImageList] = useState([]);
  const [imageData, setImageData] = useState([]);

  // 유저 아이디
  const useId = useRecoilValue(userIdx);

  // 모달 상태 변화에 따른 imageList 비우기
  useEffect(() => {
    setImageList([]);
  }, [modalOpen]);

  // 내용 검증 함수
  const changeFormContent = (event) => {
    if (event.target.value.trim().length > 250) {
      setMsgForContent('최대 250자까지 입력 가능합니다.');
      return;
    }
    setFormContent(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
    } else if (event.target.value.trim().length > 250) {
      setMsgForContent('최대 250자까지 입력 가능합니다.');
    } else setMsgForContent('');
  };

  // 이미지 S3 전송 함수
  const sendImageListToS3 = async () => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    for (let i = 0; i < imageList.length; i += 1) {
      const originName = imageList[i].name;
      const extensionName = `.${originName.split('.').pop()}`;
      const hashImageName = sha256(
        `${new Date().toString()}${useId}${originName}`,
      ); // [날짜 객체 + 회원 idx + 기존 파일명]을 조합하여 해시 처리
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: hashImageName + extensionName, // 고유한 파일명(현재 날짜 + 유저아이디 + 파일명을 합쳐 해시값 생성)
          Body: imageList[i], // 파일 객체 자체를 보냄
        },
      });
      const promise = upload.promise();
      promise.catch((err) => {
        // eslint-disable-next-line
        alert(err);
      });
      const newData = {
        saveName: hashImageName + extensionName,
        originName,
      };
      imageData.push(newData);
      // setImageData((originalData) => [...originalData, newData]);
    }
  };

  const registExample = () => {
    const data = {
      content: formContent,
      type: useId,
      images: imageData, // 이미지 파일의 hash 이름, 원래 이름(배열 얕은 복사)
    };
    // 이미지 업로드한거 있으면
    // AWS S3에 보내고 저장한 경로명을 data에 담아라
    // data로 axios POST하고
    // 결과로 나온 idx를 가지고
    // 이미지 axios POST해야 함
    if (data.content.trim().length === 0) {
      // 내용 입력 유효하지 않음
      // eslint-disable-next-line
      alert('내용을 한 글자 이상 입력해야 합니다.');
      return;
    }

    // 이미지 전송 후 받은 url을 picture에 넣고 보낸 후에
    // 잘 보내졌으면 data를 POST
    sendImageListToS3().then(async () => {
      // post 로직
      const response = await master.post.example(data);
      // eslint-disable-next-line
      if (response.statusCode === 200) {
        setReload(true);
        // eslint-disable-next-line
        alert('사례가 등록되었습니다.');
        modalClose();
        setFormContent('');
      } else {
        // eslint-disable-next-line no-alert
        alert('다시 시도하십시오.');
      }
    });
    setImageData([]); // imageData reset
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseBtn onClick={modalClose} />
          <Header>사례 작성</Header>
          <Body>
            <TextField
              label="내용"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              style={{ maxWidth: '700px' }}
              onChange={changeFormContent}
              value={formContent}
            />
            <NullBox />
            <ImageInput sendImageList={setImageList} />
            <NullBox />
            <Button variant="contained" onClick={registExample}>
              사례 등록
            </Button>
            <ErrorMessage>{msgForContent}</ErrorMessage>
          </Body>
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
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 16px;
    font-weight: bold;
    padding-top: 8px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 8px;
  line-height: 100%;
  min-height: 16px;
  display: flex;
  align-items: center;
  margin: 4px 0px;
`;

const NullBox = styled.div`
  height: 16px;
`;
