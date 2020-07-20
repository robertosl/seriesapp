import { SET_FIELD, SERIE_SAVED_SUCCESS, SET_WHOLE_SERIE, RESET_FORM } from '../actions';

const INITIAL_STATE = {
    id: null,
    title: '',
    gender: 'Ficção Científica',
    rate: 0,
    img64: '',
    description: ''
}

export default function serieFormReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case SET_FIELD:
            const newState = { ...state };
            newState[action.field] = action.value;
            return newState;
        case SERIE_SAVED_SUCCESS:
        case RESET_FORM:
            return INITIAL_STATE;
        case SET_WHOLE_SERIE:
            return action.serie;
        default:
            return state;
    }
}
