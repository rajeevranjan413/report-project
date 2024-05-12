import { createContext, useReducer, useState } from "react";
import reportReducer from "./reportReducer.jsx"

const reportContext = createContext(null);

const initialState = {
    reportitems: []
}
const ReportProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reportReducer, initialState);

    const addReport = (report) => {
        return dispatch({
            type: 'ADD_REPORT',
            payload: { report }
        });
    };

    const removeReport = (reportId) => {
        return dispatch({
            type: 'REMOVE_PEPORT',
            payload: { reportId }
        });
    };

    const values = {
        ...state,
        addReport,
        removeReport,

    };


    return (
        <reportContext.Provider value={values}>
            {children}
        </reportContext.Provider>
    )
}

export { ReportProvider };
export default reportContext;
