import moment from 'moment';

// ACTION TYPES
export const types = {
    SAVE_PASTE: 'SAVE_PASTE',
    SAVE_PASTE_SUCCESS: 'SAVE_PASTE_SUCCESS',
    SAVE_PASTE_ERROR: 'SAVE_PASTE_ERROR',
    LOAD_PASTE: 'LOAD_PASTE',
    LOAD_PASTE_SUCCESS: 'LOAD_PASTE_SUCCESS',
    DELETE_PASTE: 'DELETE_PASTE',
    DELETE_PASTE_SUCCESS: 'DELETE_PASTE_SUCCESS',
    DELETE_PASTE_ERROR: 'DELETE_PASTE_ERROR',
    LOAD_PASTE_ERROR: 'LOAD_PASTE_ERROR',
    LOAD_ALL_PASTES: 'LOAD_ALL_PASTES',
    LOAD_ALL_PASTES_SUCCESS: 'LOAD_ALL_PASTES_SUCCESS',
    LOAD_ALL_PASTES_ERROR: 'LOAD_ALL_PASTES_ERROR',
    LOAD_MORE_PASTES: 'LOAD_MORE_PASTES',
    LOAD_MORE_PASTES_SUCCESS: 'LOAD_MORE_PASTES_SUCCESS',
    LOAD_MORE_PASTES_ERROR: 'LOAD_MORE_PASTES_ERROR',
    LOAD_PASTES: 'LOAD_PASTES',
    LOAD_PASTES_SUCCESS: 'LOAD_PASTES_SUCCESS',
    LOAD_PASTES_ERROR: 'LOAD_PASTES_ERROR',
};

// REDUCERS

const initialState = {
    pastes: {paste: null, error: null, loading: false},
    pasteList: {pastes: null, error: null, loading: false},
    showSpam: false,
    admin: localStorage.getItem("admin") === 'true'
};

export default function pasteReducer(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_PASTE:
            return {...state, pastes: {paste: null, error: null, saving: true, saved: false}};
        case types.SAVE_PASTE_SUCCESS:
            return {...state, pastes: {paste: action.paste, error: null, saving: false, saved: true}};
        case types.LOAD_PASTE:
            return {...state, pastes: {paste: null, error: null, loading: true}};
        case types.LOAD_PASTE_SUCCESS:
            return {...state, pastes: {paste: action.paste, error: null, loading: false}};
        case types.LOAD_PASTE_ERROR:
            return {...state, pastes: {paste: null, error: action.message, loading: false}};
        case types.DELETE_PASTE:
            return {...state, pastes: {paste: null, error: null, deleting: true, deleted: false}};
        case types.DELETE_PASTE_SUCCESS:
            return {...state, pastes: {paste: null, error: null, deleting: false, deleted: true}};
        case types.DELETE_PASTE_ERROR:
            return {...state, pastes: {paste: null, error: action.message, deleting: false, deleted: false}};
        case types.LOAD_MORE_PASTES:
            return {...state, pasteList: {pastes: state.pasteList.pastes}};
        case types.LOAD_MORE_PASTES_SUCCESS:
            return {...state, pasteList: {pastes: [...state.pasteList.pastes, ...action.payload.results], next: action.payload.next, previous: action.payload.previous, error: null, loading: false}};
        case types.LOAD_PASTES:
            return {...state, pasteList: {pastes: null, error: null, loading: true}};
        case types.LOAD_PASTES_SUCCESS:
            return {...state, pasteList: {pastes: action.payload.results, next: action.payload.next, previous: action.payload.previous, error: null, loading: false}};
        default:
            return state;
    }
}

// ACTION CREATORS
export const actions = {
    savePaste: (code, language) => ({ type: types.SAVE_PASTE, paste: {code: code, language: language, created_at: moment().format()} }),
    loadPastes: (abuse, offset) => ({ type: types.LOAD_PASTES, abuse, offset }),
    loadMorePastes: (abuse, offset) => ({ type: types.LOAD_MORE_PASTES, abuse, offset }),
    loadPaste: (pasteId) => ({ type: types.LOAD_PASTE, pasteId }),
    deletePaste: (pasteId) => ({ type: types.DELETE_PASTE, pasteId }),
};
