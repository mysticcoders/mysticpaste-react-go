import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
    pastes: {paste: null, error: null, loading: false},
    pasteList: {pastes: null, error: null, loading: false},
    showSpam: false
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
        case types.LOAD_MORE_PASTES:
            return {...state, pasteList: {pastes: state.pasteList.pastes}};
        case types.LOAD_MORE_PASTES_SUCCESS:
            return {...state, pasteList: {pastes: [...state.pasteList.pastes, ...action.payload.results], next: action.payload.next, previous: action.payload.previous, error: null, loading: false}};
        case types.LOAD_PASTES:
            return {...state, pasteList: {pastes: null, error: null, loading: true}};
        case types.LOAD_PASTES_SUCCESS:
            return {...state, pasteList: {pastes: action.payload.results, next: action.payload.next, previous: action.payload.previous, error: null, loading: false}};
        case types.SHOW_SPAM_PASTES:
            return {...state, showSpam: true};
        case types.HIDE_SPAM_PASTES:
            return {...state, showSpam: false};
        case types.CHANGE_PASTE_ABUSE:
            return {...state, pasteAbuseChanged: false};
        case types.CHANGE_PASTE_ABUSE_SUCCESS:
            return {...state, pasteAbuseChanged: true};
        case types.CHANGE_PASTE_ABUSE_CLEAR:
            return {...state, pasteAbuseChanged: null};
        default:
            return state;
    }
}
