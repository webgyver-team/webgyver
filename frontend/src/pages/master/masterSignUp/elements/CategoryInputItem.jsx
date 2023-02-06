import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

export default function CategoryInput({
  changeCategoryItem, // 카테고리 리스트 안의 item을 변경하는 함수
  deleteCategoryItem, // "를 삭제하는 함수
  categorySelected, // 카테고리 visited 배열
  setCategorySelected, // 카테고리 visited 설정하는 함수
  changeMsg, // input 변화 감지해서 category 통합 오류 메시지에 보내는 함수
  index, // 내가 지금 카테고리 리스트의 몇 번째에 있는지
}) {
  const [category, setCategory] = useState(''); // 카테고리
  const [price, setPrice] = useState(0); // 가격
  const categoryList = [
    // 카테고리 리스트 목록(select에 map으로 뿌려주기 위함)
    // eslint-disable-next-line
    { idx: 1, categoryName: '욕실' },
    { idx: 2, categoryName: '주방 ' },
    { idx: 3, categoryName: '전기/조명' },
    { idx: 4, categoryName: '가전' },
    { idx: 5, categoryName: '보일러' },
    { idx: 6, categoryName: '가구' },
    { idx: 7, categoryName: '도어/창문' },
    { idx: 8, categoryName: '벽지/바닥' },
    { idx: 9, categoryName: '디지털/IT' },
  ];

  const handleChangeCategory = (event) => {
    const categoryInfo = JSON.parse(event.target.value); // stringify한거 다시 object로 변환
    const updatedSelected = [...categorySelected]; // 기존 visited
    if (category !== '') {
      // 이전에 None이 아닌 어떤 카테고리를 선택했다면
      const originalCategory = JSON.parse(category);
      // 다음에 선택할 수 있게 visited를 풀어줌
      updatedSelected[originalCategory.idx] = false;
    }
    setCategory(event.target.value); // stringfigy한 category로 넣어줌
    // => 이렇게 한 이유: MUI는 select의 value를 object로 인정하지 않아서 stringify해야 함
    updatedSelected[categoryInfo.idx] = true; // 지금 선택한건 visited 처리
    setCategorySelected(updatedSelected); // 바뀐 visited 배열로 update
    changeCategoryItem({
      index,
      category: {
        idx: categoryInfo.idx,
        categoryName: categoryInfo.categoryName,
      },
      price,
    }); // 해당 객체를 category 리스트에 반영하라고 부모에게 보냄
  };

  const onlyNumber = (input) => {
    if (Number.isNaN(Number(input))) {
      changeMsg('상담가격은 숫자만 입력할 수 있습니다.');
      return false;
    }
    changeMsg(() => '');
    return true;
  };
  const changePrice = (event) => {
    let value = event.target.value.replaceAll(',', ''); // 쉼표 해제
    if (!onlyNumber(value)) {
      // 숫자 아니면 안받아줌
      return;
    }
    value = Number(value);
    if (value >= 100000) {
      // 숫자로 변환한게 10만원 이상이면 안받아줌
      changeMsg('상담가격은 10만원 미만으로 설정할 수 있습니다.');
      return;
    }
    const onlyNumberValue = value;
    value = `${value.toLocaleString('ko-KR')}`; // 보기 좋게 변환
    setPrice(value); // 변환값으로 설정(input에 띄워줌)
    changeCategoryItem({ index, category, price: onlyNumberValue }); // 부모에게 보낼때는 쉼표 제거한 value
  };

  return (
    <div>
      <CategoryForm>
        <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
          {/* 카테고리 선택창 */}
          <InputLabel id="demo-select-small">카테고리</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={category}
            label="Category"
            onChange={handleChangeCategory}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categoryList.map((each) => (
              <MenuItem
                key={each.idx}
                disabled={categorySelected[each.idx]}
                value={JSON.stringify(each)}
              >
                {each.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* 상담비용 number input */}
        <TextField
          label="상담 비용"
          variant="outlined"
          size="small"
          value={price}
          onChange={changePrice}
        />
        {/* 삭제 버튼 */}
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => deleteCategoryItem(index)}
        >
          <RemoveCircleOutlineRoundedIcon />
        </IconButton>
      </CategoryForm>
    </div>
  );
}

const CategoryForm = styled.div`
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;
