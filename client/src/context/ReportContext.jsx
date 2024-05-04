import { createContext, useState } from "react";

export const ReportContext = createContext(null);


export const ReportProvider = ({ children }) => {
    const [allReports, setAllReports] = useState([

    ]);
    return (
        <ReportContext.Provider value={{ allReports, setAllReports }}>
            {children}
        </ReportContext.Provider>
    )
}