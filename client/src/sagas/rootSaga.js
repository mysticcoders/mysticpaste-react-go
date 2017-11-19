import { sagas as pasteSagas } from './pasteSaga';

export default function* rootSaga() {
    yield pasteSagas;
}
