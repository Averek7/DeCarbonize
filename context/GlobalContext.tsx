import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";


interface GlobalContextProps {
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}


export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{ sidebar, setSidebar, isModalOpen, setModalOpen  }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
