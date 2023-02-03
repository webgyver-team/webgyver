import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CategoryInputItem from './CategoryInputItem';
import Message from '../../../common/signup/elements/Message';

export default function CategoryInput({ updateData }) {
  const [categoryItemList, setCategoryItemList] = useState([
    {
      index: 0, // categoryItemList에서의 순서(key에 사용)
      category: {
        idx: '', // categoryItem의 idx
        categoryName: '', // categoryItem의 이름
      },
      price: '', // 헤당 카테고리 가격
    }, // 기본 카테고리 리스트
  ]);
  const [categorySelected, setCategorySelected] = useState(
    new Array(10).fill(false), // 카테고리 중복 선택 방지용
  );
  const [msg, setMsg] = useState(''); // 카테고리 경고 메시지
  const addCatogoryInputItem = () => {
    // 카테고리 선택창 하나 추가하는 기능
    if (categoryItemList.length >= 9) {
      setMsg('카테고리는 최대 9개까지 선택 가능합니다.');
      return;
    }
    const newIndex = categoryItemList.slice(-1)[0].index + 1; // index
    setCategoryItemList((original) => [
      ...original,
      {
        index: newIndex,
        category: {
          idx: '',
          categoryName: '',
        },
        price: 0,
      }, // 새로운 객체 추가
    ]);
    setMsg('');
  };

  const changeCategoryItem = (value) => {
    const newList = [...categoryItemList]; // 기존 리스트
    for (let i = 0; i < newList.length; i += 1) {
      // 기존 리스트에 이미 있는 것이라면?
      if (newList[i].index === value.index) {
        newList[i] = value; // 해당 값으로 교체해버려라
        break;
      }
    }
    setCategoryItemList(newList);
    updateData({ categoryList: newList });
  };
  const deleteCategoryItem = (index) => {
    // eslint-disable-next-line operator-linebreak
    if (categoryItemList.length <= 1) {
      setMsg('최소 한 개의 카테고리는 등록해야 합니다.');
      return;
    }
    const updatedSelected = [...categorySelected];
    updatedSelected[categoryItemList[index].category.idx] = false;
    setCategorySelected(updatedSelected);
    // 삭제
    const newList = categoryItemList.filter((item) => item.index !== index);
    setCategoryItemList(newList);
    setMsg('');
  };

  const changeMsg = (value) => {
    setMsg(value);
  };
  return (
    <div>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>카데고리 등록</h2>
      <Message msg={msg} />
      <CategoryItemListDiv>
        {categoryItemList.map((item) => (
          <CategoryInputItem
            changeCategoryItem={changeCategoryItem}
            deleteCategoryItem={deleteCategoryItem}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            changeMsg={changeMsg}
            index={item.index}
            key={item.index}
          />
        ))}
      </CategoryItemListDiv>
      <div style={{ textAlign: 'center' }}>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={addCatogoryInputItem}
        >
          <AddCircleOutlineOutlinedIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

const CategoryItemListDiv = styled.div``;
