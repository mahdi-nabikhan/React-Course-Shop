import {createContext} from 'react'

export default  AuthContext = createContext({
    isLoggedIn : false,
    toekn:null,
    userInfos : null,
    login : () =>{},
    logout : () =>{}


}

)