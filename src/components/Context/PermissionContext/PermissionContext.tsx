import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookies from "js-cookie";


type Props = {
  children?: ReactNode;
}

type IPermContext = {
    permission: string[];
    setPermission: (newState: any) => void
}

const initialValue = {
    permission: String(Cookies.get('role')).split('|'),
    setPermission: () => {}
}


const PermissionContext = createContext<IPermContext>(initialValue)

const PermissionProvider = ({children}: Props) => {
  const [ permission, setPermission ] = useState(initialValue.permission)


  return (
      <PermissionContext.Provider value={{permission, setPermission}}>
        {children}
      </PermissionContext.Provider>
  )
}

export {  PermissionContext, PermissionProvider }