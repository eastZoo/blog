import { all } from 'redux-saga/effects';

// *표는 일반함수는 값을 하나만 반환할 수 있지만 반환을 여러개 할 수 있게 도와주는 최신문법
export default function* rootSaga() {
  yield all([ // all은 동시에 실행할 수 있게 도와줌

  ]);
}