import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
// 해당 파일은 Recoil-atom을 선언하는 공간이다.

// 로그인 판단용 State, null, master, customer
const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
});
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

// 상담예약에서 선택한 날짜
const today = new Date();
export const reservationDate = atom({
  key: 'reservationDate',
  default: `${today.getFullYear()}-${
    (today.getMonth() + 1).toString().length < 2
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
  }-${
    today.getDate().toString().length < 2
      ? `0${today.getDate()}`
      : today.getDate()
  }`,
});

// 상담예약에서 선택한 파트너 idx, 가게 이름, 시간
// 폼에 더 편하게 등록해 줄 수 있는 요소 있으면 같이 담아 놓을 것
export const chosenReservation = atom({
  key: 'chosenReservation',
  default: {
    idx: null,
    storeName: null,
    date: null,
    time: null,
  },
  effects_UNSTABLE: [persistAtom],
});
