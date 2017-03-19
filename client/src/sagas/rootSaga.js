import {
  watchPasteHistory,
  watchLoadPaste,
  watchSavePaste,
  watchDeletePaste
} from './pasteSaga';

export default function* rootSaga() {
  yield [
    watchPasteHistory(),
    watchLoadPaste(),
    watchSavePaste(),
    watchDeletePaste()
  ];
}
