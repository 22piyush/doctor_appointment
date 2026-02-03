import { createContext } from "react";
import App from "../App";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const value = {

    }

    return (
        <AppContext.Provider>
            {props.children}
        </AppContext.Provider>
    )

}