import {createContext} from 'react'
const AuthContext = createContext({
    isLoggedIn : false,
    toekn:null,
    userInfos : null,
    login : () =>{},
    logout : () =>{}


}

)

export default AuthContext;