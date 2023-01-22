import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged  } from "@firebase/auth"
import { auth, getUserInfo, registerNewUser, userExists } from "../firebase/firebase"


export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }) {


    const navigate = useNavigate();
   
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {

            if(!user) return onUserNotLoggedIn();
            const isRegistered = await userExists(user.uid);
            if(!isRegistered) {
                await registerNewUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    profilePicture: '',
                    userName: '',
                    processCompleted: false,
                })
                return onUserNotRegistered(user);
            }
            const userInfo = await getUserInfo(user.uid)
            if(userInfo.processCompleted) {
                onUserLoggedIn(userInfo);
            } else {
                onUserNotRegistered(userInfo)
            }
 
        })
    }, [navigate])

    return <div>{children}</div>
}