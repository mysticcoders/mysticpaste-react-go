import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
    admin: localStorage.getItem("admin") === 'true'
};

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
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
