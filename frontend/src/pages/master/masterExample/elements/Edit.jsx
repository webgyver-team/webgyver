/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
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
import { exampleEditState, userIdx, exampleDataState } from '../../../../atom';
import ImageInput from '../../../customer/reviewfrom/elements/ImageInput';
import { master } from '../../../../api/masterService';

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

export default function Edit({ setReload }) {
  // 폼 모달 ON/OFF 함수
  const [modalOpen, setModalOpen] = useRecoilState(exampleEditState);
  const modalClose = () => setModalOpen(false);

  // 내용 관련 데이터
  const [formContent, setFormContent] = useState('');
  const [msgForContent, setMsgForContent] = useState('');

  // 이미지 변수
  const [imageList, setImageList] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [imageListFromReview, setImageListFromReview] = useState([]);

  // 기존 데이터
  const exampleData = useRecoilValue(exampleDataState);

  // 유저 아이디
  const useId = useRecoilValue(userIdx);

  useEffect(() => {
    setFormContent(exampleData.content);
    setImageListFromReview(exampleData.images);
  }, [exampleData.articleIdx]);

  // 내용 검증 함수
  const changeFormContent = (event) => {
    setFormContent(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
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
      // console.log(`${imageList[i].name} 업로드 시도 중..`);
      const originName = imageList[i].name;
      const date = new Date();
      const extensionName = `.${originName.split('.').pop()}`;
      const hashImageName = sha256(
        `${date.toString()}${useId}${imageList[i].name}`,
      ); // [날짜 객체 + 회원 idx + 기존 파일명]을 조합하여 해시 처리
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: hashImageName + extensionName, // 고유한 파일명(현재 날짜 + 유저아이디 + 파일명을 합쳐 해시값 생성)
          Body: imageList[i], // 파일 객체 자체를 보냄
        },
      });
      const promise = upload.promise();
      promise.then((res) => {
        // eslint-disable-next-line
        console.log(res.Location + '에 ' + imageList[i] + '를 저장 완료');
      });
      // .catch((err) => {
      //   // eslint-disable-next-line
      //   console.log(err)
      // });
      const newData = {
        saveName: hashImageName + extensionName,
        originName: imageList[i].name,
      };
      imageData.push(newData);
      // setImageData((originalData) => [...originalData, newData]);
    }
  };

  const registReview = () => {
    const data = {
      content: formContent,
      type: useId,
      images: [], // 이미지 파일의 hash 이름, 원래 이름
    };

    if (imageListFromReview.length > 0) {
      data.images = [...data.images, ...imageListFromReview]; // 이미지 데이터에 기존 이미지 추가
    }

    if (data.content.trim().length === 0) {
      // 내용 입력 유효하지 않음
      // eslint-disable-next-line
      alert('내용을 한 글자 이상 입력해야 합니다.');
      return;
    }

    // 이미지 전송 후 받은 url을 picture에 넣고 보낸 후에
    // 잘 보내졌으면 data를 POST
    sendImageListToS3().then(async () => {
      // eslint-disable-next-line
      console.log('보내기 전 데이터', data); // POST로 수정 예정
      const { articleIdx } = exampleData;
      // post 로직
      const response = await master.put.example(data, articleIdx);
      // eslint-disable-next-line
      if (response.statusCode === 200) {
        setReload(true);
        // eslint-disable-next-line
        alert('사례가 수정되었습니다.');
        modalClose();
        setFormContent('');
      } else {
        // eslint-disable-next-line
        console.log(response);
        // eslint-disable-next-line no-alert
        alert('내용을 다시 확인바랍니다.');
      }
      // imageData reset
      setImageData([]);
      // setSavedImg([]);
      // setExistImg([]);
      // setTotalImg([]);
    });
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
          <Header>사례 수정</Header>
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
            <ImageInput
              sendImageList={setImageList}
              existImages={imageListFromReview}
              sendExistImages={setImageListFromReview}
            />
            <NullBox />
            <Button variant="contained" onClick={registReview}>
              사례 수정
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
