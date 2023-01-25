import React from 'react';
import LocateModal from '../../../components/sitepopup/LocateModal';

export default function AddressInput() {
  return (
    <div>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>주소 등록</h2>
      <LocateModal />
    </div>
  );
}
