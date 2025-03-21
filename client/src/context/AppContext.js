import React from "react";

const AppContext = React.createContext(undefined);

const initialState = {
  auth: null,
  checkingStatus: true,
  profile: null,
};

export function AppWrapper({ children }) {
  const [state, setState] = React.useState(initialState);

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContext Provider");
  }
  return context;
}
