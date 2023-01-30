import { atom } from 'recoil';

// 해당 파일은 Recoil-atom을 선언하는 공간이다.

// 로그인 판단용 State, null, master, customer
export const authState = atom({
  key: 'authState',
  default: true,
});

// 테스트용
export const testState = atom({
  key: 'testState',
  default: 'hi',
});

// 위치설정 모달 on/off
export const locateModalState = atom({
  key: 'locateModalState',
  default: true,
});

// 주소 저장
export const locateValueState = atom({
  key: 'locateValueState',
  default: {
    address: '대전 유성구 덕명동 124',
    detail: 'B102호',
    longitude: 127.298666015874,
    latitude: 36.3551691100904,
  },
});

// 선택된 카테고리
export const categoryState = atom({
  key: 'categoryState',
  default: '',
});

export const loginOpenState = atom({
  key: 'loginOpenState',
  default: false,
});
