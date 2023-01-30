import React from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

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
    <div style={{ borderBottom: '1px solid black' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Picture src={picture} alt="" />
        <div style={{ borderLeft: '1px solid black' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {storeName}
          </span>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {personName}
          </span>
          <p style={{ fontSize: '16px' }}>
            {`${address} ${detailAddress}(${distance}km)`}
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="half-rating-read"
              value={star}
              precision={0.1}
              readOnly
            />
            <span style={{ fontSize: '16px' }}>{star}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'inline-flex',
          width: '100vw',
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
      {/* <Button variant="outlined" key={time} style={{ margin: '0px 8px' }}>
        {time}
      </Button> */}
    </div>
  );
}

const Picture = styled.img`
  width: 96px;
  height: 96px;
`;
