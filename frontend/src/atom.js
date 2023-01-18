import { atom } from 'recoil';

// 해당 파일은 Recoil-atom을 선언하는 공간이다.

// 로그인 판단용 State, true-> login / false -> logout
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
  default: 'true',
});

export const categoryState = atom({
  key: 'categoryState',
  default: '',
});

export const loginOpenState = atom({
  key: 'loginOpenState',
  default: 'flase',
});
