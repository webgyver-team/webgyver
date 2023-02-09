import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// import LocateModal from '../../../../components/common/sitepopup/LocateModal';
import { TextField } from '@mui/material';
import { locateModalState, locateValueState } from '../../../../atom';

export default function AddressInput({ updateData }) {
  const setLocateModalOpen = useSetRecoilState(locateModalState);
  const location = useRecoilValue(locateValueState);
  const openLocateModal = () => setLocateModalOpen(true);
  return (
    <div>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>주소 등록</h2>
      <TextField
        label="주소"
        variant="outlined"
        required
        margin="normal"
        fullWidth
        value={location.address}
        onClick={openLocateModal}
        updateData={updateData}
        disabled
      />
      <TextField
        label="상세 주소"
        variant="outlined"
        required
        margin="normal"
        fullWidth
        onClick={openLocateModal}
        updateData={updateData}
        disabled
        value={location.detail}
      />
    </div>
  );
}
