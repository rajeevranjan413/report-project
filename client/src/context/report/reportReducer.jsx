const reportReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_REPORT':

            return {
                ...state,
                reportItems: [...state.reportItems, action.payload.report]
            };


        case 'REMOVE_REPORT':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.reportId)
            };


        default:
            return state;
    }
};

export default reportReducer;