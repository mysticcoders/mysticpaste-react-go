// ACTION TYPES
export const types = {
    CHECK_ADMIN: 'CHECK_ADMIN',
    CHECK_ADMIN_SUCCESS: 'CHECK_ADMIN_SUCCESS',
    CHECK_ADMIN_ERROR: 'CHECK_ADMIN_ERROR',
    CHECK_ADMIN_FAILURE: 'CHECK_ADMIN_FAILURE',
    CHANGE_PASTE_ABUSE: 'CHANGE_PASTE_ABUSE',
    CHANGE_PASTE_ABUSE_SUCCESS: 'CHANGE_PASTE_ABUSE_SUCCESS',
    CHANGE_PASTE_ABUSE_ERROR: 'CHANGE_PASTE_ABUSE_ERROR',
    CHANGE_PASTE_ABUSE_CLEAR: 'CHANGE_PASTE_ABUSE_CLEAR',
    LOGOUT_ADMIN: 'LOGOUT_ADMIN',
    SHOW_SPAM_PASTES: 'SHOW_SPAM_PASTES',
    HIDE_SPAM_PASTES: 'HIDE_SPAM_PASTES',
};

// REDUCERS

const initialState = {
    showSpam: false,
    admin: localStorage.getItem("admin") === 'true'
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
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
        case types.CHECK_ADMIN:
        case types.CHECK_ADMIN_FAILURE:
        case types.CHECK_ADMIN_ERROR:
        case types.LOGOUT_ADMIN:
            return {...state, admin: false};
        case types.CHECK_ADMIN_SUCCESS:
            return {...state, admin: true};
        default:
            return state;
    }
}

// ACTION CREATORS
export const actions = {
    deletePaste: (pasteId) => ({ type: types.DELETE_PASTE, pasteId }),
    checkAdmin: (adminKey) => ({ type: types.CHECK_ADMIN, adminKey }),
    logoutAdmin: (pasteId) => ({ type: types.LOGOUT_ADMIN, pasteId }),
    changePasteAbuse: (pasteId, abuse) => ({ type: types.CHANGE_PASTE_ABUSE, pasteId, abuse }),
    clearChangePasteAbuse: () => ({ type: types.CHANGE_PASTE_ABUSE_CLEAR }),
    showSpamPastes: () => ({ type: types.SHOW_SPAM_PASTES }),
    hideSpamPastes: () => ({ type: types.HIDE_SPAM_PASTES }),
};
