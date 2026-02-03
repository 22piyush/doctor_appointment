import AdminContextProvider from "./AdminContext.jsx";
import DoctorContextProvider from "./DoctorContext.jsx";
import AppContextProvider from "./AppContext.jsx";

const AppProviders = ({ children }) => {
  
  return (
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  );
};

export default AppProviders;
