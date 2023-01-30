import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CategoryInputItem from './CategoryInputItem';
import Message from './Message';

export default function CategoryInput({ updateData }) {
  const [categoryItemList, setCategoryItemList] = useState([
    { index: 1, category: '', cost: '' },
  ]);
  const [msg, setMsg] = useState('');
  const addCatogoryInputItem = () => {
    if (categoryItemList.length >= 9) {
      setMsg('카테고리는 최대 9개까지 선택 가능합니다.');
      return;
    }
    const list = [...categoryItemList];
    const newIndex = list.slice(-1)[0].index + 1; // index
    setCategoryItemList((original) => [
      ...original,
      { index: newIndex, category: '', cost: '' },
    ]);
    setMsg('');
  };

  const changeCategoryItem = (value) => {
    const newList = [...categoryItemList];
    for (let i = 0; i < newList.length; i += 1) {
      if (newList[i].index === value.index) {
        newList[i] = value;
        break;
      }
    }
    setCategoryItemList(() => newList);
    updateData({ categoryList: categoryItemList });
  };

  const deleteCategoryItem = (index) => {
    // eslint-disable-next-line operator-linebreak
    if (categoryItemList.length <= 1) {
      setMsg('최소 한 개의 카테고리는 등록해야 합니다.');
      return;
    }
    const list = categoryItemList.filter((item) => item.index !== index);
    setCategoryItemList(list);
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
