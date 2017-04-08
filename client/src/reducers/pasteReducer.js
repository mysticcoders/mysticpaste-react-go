import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
    pastes: {paste: null, error: null, loading: false},
    pasteList: {pastes: null, error: null, loading: false},
};

export default function pasteReducer(state = INITIAL_STATE, action) {
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
        case types.LOAD_ALL_PASTES:
            return {...state, pasteList: {pastes: null, error: null, loading: true}};
        case types.LOAD_ALL_PASTES_SUCCESS:
            return {...state, pasteList: {pastes: action.pastes, error: null, loading: false}};
        case types.LOAD_PASTES:
            return {...state, pasteList: {pastes: null, error: null, loading: true}};
        case types.LOAD_PASTES_SUCCESS:
            return {...state, pasteList: {pastes: action.pastes, error: null, loading: false}};
        default:
            return state;
    }
}
