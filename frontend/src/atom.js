import { atom } from 'recoil';

// 해당 파일은 Recoil-atom을 선언하는 공간이다.

export const authState = atom({
  key: 'authState',
  default: true,
});

export const testState = atom({
  key: 'testState',
  default: 'hi',
});

export const categoryState = atom({
  key: 'categoryState',
  default: '',
});
