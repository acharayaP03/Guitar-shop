import {
    AUTH_USER,
    CHANGE_USER_EMAIL,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_ADD_TO_CART,
} from '../types'

let DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        firstname: null,
        lastname: null,
        history: [],
        varified: null,
    },
    auth: null,
    cart: [],
}

export default function usersReducer(state = DEFAULT_USER_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                data: { ...state.data, ...action.payload.data },
                auth: action.payload.auth,
            }
        case SIGN_OUT:
            return {
                ...state,
                data: { ...DEFAULT_USER_STATE.data },
                auth: false,
            }
        case UPDATE_USER_PROFILE:
            return { ...state, data: { ...action.payload } }
        case CHANGE_USER_EMAIL:
            return { ...state, data: { ...state.data, email: action.payload } }
        case USER_ADD_TO_CART:
            return { ...state, cart: action.payload }
        default:
            return state
    }
}
