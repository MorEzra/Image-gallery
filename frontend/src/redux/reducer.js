import * as actionTypes from './actionTypes';

// I init the state in order to display default data
export const AppState = {
    pageNum: 1,
    category: null,
    isPaginationClickDisabled: false,
    isShowSnackbar: false,
    snackbarMessage: '',
    snackbarSeverity: 'error'
}

const Reduce = (state = AppState, action) => {
    switch (action.type) {
        case actionTypes.INCREASE_PAGE_NUM:
            return { ...state, pageNum: state.pageNum + 1 };

        case actionTypes.DECREASE_PAGE_NUM:
            return { ...state, pageNum: state.pageNum - 1 };

        case actionTypes.SET_CATEGORY:
            return { ...state, category: action.payload, pageNum: 1 };

        case actionTypes.TOGGLE_IS_PAGINATION_BUTTON_DISABLED:
            return { ...state, isPaginationClickDisabled: !state.isPaginationClickDisabled };

        case actionTypes.TOGGLE_IS_SHOW_SNACKBAR:
            return { ...state, isShowSnackbar: !state.isShowSnackbar };

        case actionTypes.SET_SNACKBAR_MESSAGE:
            return { ...state, snackbarMessage: action.payload };

        case actionTypes.SET_SNACKBAR_SEVERITY:
            return { ...state, snackbarSeverity: action.payload };

        default:
            return state;
    }
}

export default Reduce;