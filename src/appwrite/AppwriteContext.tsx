import React, { createContext, FC, PropsWithChildren, useState } from 'react';
import Appwrite from './service';

type AppContextType = {
    appwrite: Appwrite;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

export const AppwriteContext = createContext<AppContextType>({
    appwrite: new Appwrite(),
    isLoggedIn: false,
    setIsLoggedIn: () => { }
})

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const defaultValue = {
        appwrite: new Appwrite(),
        isLoggedIn,
        setIsLoggedIn,
    }

    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    )
}

export default AppwriteContext;
