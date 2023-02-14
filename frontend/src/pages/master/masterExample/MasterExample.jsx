/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { exampleFormState, userIdx } from '../../../atom';
import Example from './elements/Example';
import Form from './elements/Form';
import Edit from './elements/Edit';
import { master } from '../../../api/masterService';

export default function MasterExample() {
  // 사례 작성 모달창 켜기
  const setexampleFormOpen = useSetRecoilState(exampleFormState);
  const formModalOpen = () => {
    setexampleFormOpen(true);
  };

  // 새 글 작성시 리로드
  const [reload, setReload] = useState(false);

  const NoData = <NoDataBox>아직 사례가 없습니다.</NoDataBox>;

  // 로드데이타
  const [exampleList, setExampleList] = useState([]);
  const userId = useRecoilValue(userIdx);
  useEffect(() => {
    const loadExampleList = async () => {
      const response = await master.get.example(userId);
      setExampleList(response.data.historyList.reverse());
    };
    // 주소 또는 선택 날짜가 바뀌었으면 storeList 갱신해야
    // eslint-disable-next-line
    loadExampleList();
    setReload(false);
  }, [userId, reload]);

  return (
    <Main>
      <Edit setReload={setReload} />
      <Form setReload={setReload} />
      <Titlebox>
        <Text>수리 사례</Text>
        <BtnBox>
          <StateBtn onClick={formModalOpen}>
            <span>작성하기</span>
          </StateBtn>
        </BtnBox>
      </Titlebox>
      <TableBox>
        {!exampleList.length && NoData}
        {exampleList &&
          exampleList.map((el, i) => (
            <Example key={i} example={el} setReload={setReload} />
          ))}
      </TableBox>
    </Main>
  );
}

const Main = styled.div`
  witdh: 100%;
  margin: 16px;
`;

const Titlebox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const TableBox = styled.div`
  width: 100%;
`;

const BtnBox = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: row-reverse;
`;

const StateBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.dafaultBorder};
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  padding: 0 16px 0 16px;
  height: 40px;
  width: 100px;
  box-shadow: 1px 1px 4px 0px ${(props) => props.theme.color.dafaultBorder};
  background-color: ${(props) => props.theme.color.defaultWhite};
  color: ${(props) => props.theme.color.defaultColor};
  cursor: pointer;
`;

const NoDataBox = styled.div`
  text-align: center;
  font-size: 24px;
  min-width: 70vw;
  margin: 16px;
`;
