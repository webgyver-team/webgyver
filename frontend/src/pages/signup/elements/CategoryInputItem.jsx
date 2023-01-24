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
  changeCategoryItem,
  deleteCategoryItem,
  changeMsg,
  index,
}) {
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState(0);

  const onlyNumber = (input) => {
    if (Number.isNaN(Number(input))) {
      changeMsg('상담가격은 숫자만 입력할 수 있습니다.');
      return false;
    }
    changeMsg(() => '');
    return true;
  };
  const changeCost = (event) => {
    // 넘버로
    let value = event.target.value.replaceAll(',', '');
    if (!onlyNumber(value)) {
      return;
    }
    value = Number(value);
    if (value >= 100000) {
      changeMsg('상담가격은 10만원 미만으로 설정할 수 있습니다.');
      return;
    }
    value = `${value.toLocaleString('ko-KR')}`;
    setCost(value);
    changeCategoryItem({ index, category, cost: value });
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
    changeCategoryItem({ index, category: event.target.value, cost });
  };

  return (
    <div>
      {index}
      <CategoryForm>
        <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
          <InputLabel id="demo-select-small">카테고리</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="욕실">욕실</MenuItem>
            <MenuItem value="주방">주방</MenuItem>
            <MenuItem value="전기/조명">전기/조명</MenuItem>
            <MenuItem value="가전">가전</MenuItem>
            <MenuItem value="보일러">보일러</MenuItem>
            <MenuItem value="가구">가구</MenuItem>
            <MenuItem value="도어/창문">도어/창문</MenuItem>
            <MenuItem value="벽지/바닥">벽지/바닥</MenuItem>
            <MenuItem value="디지털/IT">디지털/IT</MenuItem>
          </Select>
        </FormControl>
        {/* 상담비용 number input */}
        <TextField
          id="outlined-basic"
          label="상담 비용"
          variant="outlined"
          size="small"
          value={cost}
          onChange={changeCost}
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
  justify-content: space-around;
  align-items: center;
`;
