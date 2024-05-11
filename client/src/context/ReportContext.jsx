import { createContext, useReducer, useState } from "react";

export const ReportContext = createContext(null);

const initialState = {
    id: "",
    Reports: [],
    allReports: []
};
export const ReportProvider = ({ children }) => {
    const [state, dispatch] = useReducer();

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

    const updateReport = () => {

    }

    const changeReportFields = (isComplain) => {
        return dispatch({
            type: 'CHANGE_FIELD',
            payload: { isComplain }
        });
    };
    return (
        <ReportContext.Provider value={{ allReports, setAllReports }}>
            {children}
        </ReportContext.Provider>
    )
}