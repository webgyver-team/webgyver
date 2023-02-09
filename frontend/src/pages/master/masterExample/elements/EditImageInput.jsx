/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ImageInput({
  sendImageList,
  awsImages = [],
  setSavedImg = [],
}) {
  const [imageList, setImageList] = useState([]); // 이미지 파일 객체
  const [imagePreviewList, setImagePreviewList] = useState([]); // 이미지 파일 src for 미리보기
  // 이미지 변경 이벤트 함수
  const changeImageList = async (data) => {
    const images = data.target.files; // 입력받은 이미지 파일
    const removeDupl = [...imageList, ...images]; // 이미지 파일 중복 제거용 배열

    // 이미지 파일 정보는 객체 배열이므로 -> 파일 이름 속성으로 객체 중복 제거
    const nonDuplImages = removeDupl.filter((item) => {
      let idx; // 중복되는 객체의 인덱스 정보를 담을 변수

      for (let i = 0; i < removeDupl.length; i += 1) {
        // 반복문을 통해 중복 객체의 인덱스 정보를 찾음
        if (item.name === removeDupl[i].name) {
          idx = i;
          break;
        }
      }
      // 찾은 인덱스(idx)와 일치하는 가장 가까운 이미지 객체들을 필터함수로 배열 형태로 반환
      return idx === removeDupl.indexOf(item);
    });

    // 이미지 파일 개수 유효성 검사 (10개 이하)
    if (nonDuplImages.length > 10) {
      // eslint-disable-next-line
      alert('이미지 등록은 최대 10개까지만 가능합니다.');
      return;
    }

    // 유효성 검사를 통과 시 imageList에 중복제거된 배열 복사
    await setImageList([...nonDuplImages]);
    // 부모로 해당 배열 전송
    await sendImageList([...nonDuplImages]);

    // 이건 Set으로 중복제거해보려 했는데, 객체 배열은 중복제거가 안되더라..
    // await setImageState([...new Set([...imageState, ...images])]);
  };

  //  이미지 미리보기 처리 ( imageState 변경 시 실행 )
  useEffect(() => {
    let imagePreview = []; // 미리보기 데이터 담을 임시 변수

    if (imageList.length === 0) {
      // imageState 길이가 0 이면 previewState를 빈 배열로하고 리턴(삭제 시 마지막 남는 값 제거용)
      setImagePreviewList([]);
      return;
    }

    imageList.forEach((image) => {
      const reader = new FileReader(); // 이미지 파일 읽어줄 친구
      reader.readAsDataURL(image); // 이미지 URL 변환

      // onload : 읽기 성공 시, onloadend : 읽기 성공 실패 여부 상관 없음
      reader.onload = () => {
        imagePreview = [...imagePreview, { image, url: reader.result }]; // 데이터 담아줌
        setImagePreviewList([...imagePreview]); // previewImageState에 넣어줌
      };
    });
  }, [imageList]);

  // 이미지 제거용 함수
  const removeImage = (targetName) => {
    const resultSet = imageList.filter((image) => {
      return image.name !== targetName;
    });

    setImageList([...resultSet]);
    sendImageList([...resultSet]);
  };

  // 기존 이미지 로드
  const [existImg, setExistImg] = useState([]);
  useEffect(() => {
    console.log('기존이미지 url', awsImages);
    if (awsImages.length !== 0) {
      const tmpList = [];
      // eslint-disable-next-line array-callback-return
      awsImages.map((el) => {
        const imgUrl = `https://webgyver.s3.ap-northeast-2.amazonaws.com/${el.saveName}`;
        const image = { url: imgUrl, image: { name: el.originName } };
        tmpList.push(image);
      });
      console.log('기존 이미지 업로드', tmpList);
      setExistImg(tmpList);
      setSavedImg(tmpList);
    }
  }, []);

  // 기존 이미지 제거용 함수
  const removeExistImage = (targetName) => {
    const resultSet = imageList.filter((image) => {
      return image.name !== targetName;
    });

    setImageList([...resultSet]);
    sendImageList([...resultSet]);
  };

  return (
    <div>
      <ImageInputTitle>
        사진 등록
        {imageList.length > 0 ? `(${imageList.length})` : null}
      </ImageInputTitle>
      <ImageInputBox>
        <div>
          <label htmlFor="image-input">
            <ImageBox
              style={{
                width: '80px',
                height: '80px',
                marginTop: '8px',
                border: '1px solid black',
                borderRadius: '10%',
              }}
            >
              <AddPhotoAlternateIcon style={{ fontSize: '48px' }} />
            </ImageBox>
          </label>
          <input
            type="file"
            id="image-input"
            accept="image/*"
            multiple
            onChange={changeImageList}
            style={{ display: 'none' }}
          />
        </div>
        {imagePreviewList.length > 0 || existImg.length > 0 ? (
          <div
            id="img__box"
            style={{
              display: 'flex',
              overflowX: 'scroll',
              overflowY: 'hidden',
              height: '96px',
              minWidth: '120px',
            }}
          >
            {imagePreviewList?.map((data) => {
              const { image } = data;
              const imageUrl = data.url;
              return (
                <ImageBox key={image.name} style={{ position: 'relative' }}>
                  <img
                    src={imageUrl}
                    alt={image.name}
                    width="80px"
                    height="80px"
                    style={{ borderRadius: '10%' }}
                  />
                  <CancelIcon
                    onClick={() => removeImage(image.name)}
                    fontSize="small"
                    style={{
                      position: 'absolute',
                      top: '0px',
                      right: '-8px',
                      color: '#EB4D4D',
                    }}
                    sx={[
                      {
                        '&:hover': {
                          opacity: 0.7,
                          cursor: 'pointer',
                        },
                      },
                    ]}
                  />
                </ImageBox>
              );
            })}
            {existImg?.map((data) => {
              const { image } = data;
              const imageUrl = data.url;
              return (
                <ImageBox key={image.name} style={{ position: 'relative' }}>
                  <img
                    src={imageUrl}
                    alt={image.name}
                    width="80px"
                    height="80px"
                    style={{ borderRadius: '10%' }}
                  />
                  <CancelIcon
                    onClick={() => removeExistImage(image.name)}
                    fontSize="small"
                    style={{
                      position: 'absolute',
                      top: '0px',
                      right: '-8px',
                      color: '#EB4D4D',
                    }}
                    sx={[
                      {
                        '&:hover': {
                          opacity: 0.7,
                          cursor: 'pointer',
                        },
                      },
                    ]}
                  />
                </ImageBox>
              );
            })}
          </div>
        ) : null}
      </ImageInputBox>
    </div>
  );
}

const ImageInputTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const ImageInputBox = styled.div`
  display: flex;
  overflow-x: hidden;
  margin-top: 8px;
  max-width: 400px;
`;

const ImageBox = styled.div`
  height: 96px;
  width: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;
