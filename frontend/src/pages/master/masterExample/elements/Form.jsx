import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { exampleFormState } from '../../../../atom';

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

export default function Form() {
  const [modalOpen, setModalOpen] = useRecoilState(exampleFormState);
  const modalClose = () => setModalOpen(false);

  const [formContent, setFormContent] = useState('');
  const [msgForContent, setMsgForContent] = useState('');

  const changeFormContent = (event) => {
    setFormContent(event.target.value);
    if (event.target.value.trim().length === 0) {
      setMsgForContent('내용은 한 글자 이상으로 작성해야 합니다.');
    } else setMsgForContent('');
  };

  const registReview = () => {
    const data = {
      customerIdx: null,
      partenrIdx: null,
      categoryIdx: null,
      content: formContent,
    };
    // eslint-disable-next-line
    console.log(data);
    // data로 axios POST하고
    // 결과로 나온 idx를 가지고
    // 이미지 axios POST해야 함
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
              maxRows={4}
              style={{ maxWidth: '700px' }}
              onChange={changeFormContent}
              value={formContent}
            />
            <Button variant="contained" onClick={registReview}>
              리뷰 등록
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

// const NullBox = styled.div`
//   height: 13.6px;
// `;

// const BtnBox = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 8px;
// `;
