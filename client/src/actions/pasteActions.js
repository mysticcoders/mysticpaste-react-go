import * as types from '../constants/actionTypes';
import moment from 'moment';

export function savePaste(code, language) {
    let paste = {
        code: code,
        language: language,
        created_at: moment().format()
    };

    return {type: types.SAVE_PASTE, paste};
}

export function loadAllPastes() {
    return {type: types.LOAD_ALL_PASTES};
}

export function loadPastes(abuse, offset) {
    return {type: types.LOAD_PASTES, abuse, offset};
}

export function loadPaste(pasteId) {
    return {type: types.LOAD_PASTE, pasteId};
}

export function deletePaste(pasteId) {
    return {type: types.DELETE_PASTE, pasteId};
}

export function checkAdmin(adminKey) {
    return {type: types.CHECK_ADMIN, adminKey};
}

export function logoutAdmin() {
    return {type: types.LOGOUT_ADMIN};
}

export function markPasteSpam(pasteId) {
    return {type: types.MARK_PASTE_SPAM, pasteId};
}