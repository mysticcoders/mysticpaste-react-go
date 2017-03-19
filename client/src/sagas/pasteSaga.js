import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
// import pasteApi from '../api/mockPasteApi';
import pasteApi from '../api/pasteApi';

export function* loadAllPastes() {
  try {
    const pastes = yield call(pasteApi.getAllPastes);
    yield put({type: types.LOAD_ALL_PASTES_SUCCESS, pastes});
    // yield put(appActions.showToast('Created Product:', product.name, 'info'));
  } catch(error) {
    yield put({type: types.LOAD_ALL_PASTES_ERROR, message: error});
  }
}

export function* savePaste({paste}) {
  try {
    const savedPaste = yield call(pasteApi.savePaste, paste);
    yield put({ type: types.SAVE_PASTE_SUCCESS, paste: savedPaste });
  } catch(error) {
    yield put({type: types.SAVE_PASTE_ERROR, message: error});
  }
}

export function* loadPaste({pasteId}) {
  try {
    const paste = yield call(pasteApi.getPaste, pasteId);
    yield put({type: types.LOAD_PASTE_SUCCESS, paste});
  } catch(error) {
    yield put({type: types.LOAD_PASTE_ERROR, message: error });
  }
}

export function* deletePaste({pasteId}) {
  try {
    yield call(pasteApi.deletePaste, pasteId);
    yield put({type: types.DELETE_PASTE_SUCCESS, pasteId});
  } catch(error) {
    yield put({type: types.DELETE_PASTE_ERROR, message: error });
  }
}

export function* watchPasteHistory() {
  yield* takeEvery(types.LOAD_ALL_PASTES, loadAllPastes);
}

export function* watchLoadPaste() {
  yield* takeEvery(types.LOAD_PASTE, loadPaste);
}

export function* watchSavePaste() {
  yield* takeEvery(types.SAVE_PASTE, savePaste);
}

export function* watchDeletePaste() {
  yield* takeEvery(types.DELETE_PASTE, deletePaste);
}
