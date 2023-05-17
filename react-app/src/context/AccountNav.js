import { createContext, useContext, useState } from 'react';

export const AccountNavSelectContext = createContext()

export const useAccountNavSelect = () => useContext(AccountNavSelectContext)

export default function AccountNavProvider(props) {
    const [selectedNav, setSelectedNav] = useState()

    return (
        <AccountNavSelectContext.Provider
        value={{
            selectedNav,
            setSelectedNav
        }}
        >
            {props.children}
        </AccountNavSelectContext.Provider>
    )
}
