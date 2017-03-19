import * as types from '../constants/actionTypes';
import moment from 'moment';

export function savePaste(code, language) {
  let paste = {
    code: code,
    language: language,
    created_at: moment().format()
  };

  return { type: types.SAVE_PASTE, paste};
}

export function loadAllPastes() {
  return { type: types.LOAD_ALL_PASTES };
}

export function loadPaste(pasteId) {
  return { type: types.LOAD_PASTE, pasteId };
}

export function deletePaste(pasteId) {
  return { type: types.DELETE_PASTE, pasteId };
}
