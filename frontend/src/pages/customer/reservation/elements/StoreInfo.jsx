import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { masterInfoModalState } from '../../../../atom';

export default function StoreInfo({
  idx,
  storeName,
  personName,
  address,
  detailAddress,
  distance,
  star,
  picture,
  allTime,
  noTime,
  handleClickedTimeButton,
}) {
  const setMasterInfoModal = useSetRecoilState(masterInfoModalState);
  const openMasterInfoModal = () => {
    setMasterInfoModal(true);
  };
  const chooseTimeButton = (event) => {
    const data = {
      idx,
      storeName,
      date: null,
      time: event.target.innerText,
    };
    handleClickedTimeButton(event, data);
  };
  return (
    <Main>
      <div
        style={{
          display: 'flex',
          paddingRight: '8px',
        }}
        onClick={openMasterInfoModal}
      >
        <div style={{ marginRight: '4px' }}>
          <Picture src={picture} alt="" />
        </div>
        <div>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {storeName}
          </span>
          <span
            style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}
          >
            {personName}
          </span>
          <p style={{ fontSize: '12px' }}>
            {`${address} ${detailAddress} (${distance}km)`}
          </p>
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}
          >
            <Rating
              name="half-rating-read"
              value={star}
              precision={0.1}
              readOnly
            />
            <span style={{ fontSize: '12px' }}>{star}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'inline-flex',
          width: '100%',
          overflowX: 'scroll',
          paddingBottom: '12px',
        }}
      >
        {allTime.map((time) => {
          if (!noTime.includes(time)) {
            return (
              <Button
                variant="outlined"
                onClick={chooseTimeButton}
                key={time}
                style={{
                  margin: '0px 8px',
                  color: '#1976D2',
                  borderColor: '#1976D2',
                }}
              >
                {time}
              </Button>
            );
          }
          return (
            <Button
              variant="outlined"
              disabled
              key={time}
              style={{ margin: '0px 8px' }}
            >
              {time}
            </Button>
          );
        })}
      </div>
    </Main>
  );
}

const Main = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.dafaultBorder};
  padding: 8px 0 8px 8px;
`;

const Picture = styled.img`
  height: 96px;
  width: 96px;
  object-fit: cover;
  padding: 4px;
`;
