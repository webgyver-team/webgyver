import { atom } from 'recoil';

// 해당 파일은 Recoil-atom을 선언하는 공간이다.

// // 기본형
// const textState = atom({
//   key: 'textState', // unique ID (with respect to other atoms/selectors)
//   default: '', // default value (aka initial value)
// });

const authState = atom({
  key: 'authState',
  default: true,
});

export default authState;
