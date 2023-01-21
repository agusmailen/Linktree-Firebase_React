import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { existsUserName, updateUser } from "../firebase/firebase";


export default function ChooseUsernameView() {
    const navigate = useNavigate();
    
    const [ state, setCurrentState ] = useState(0);
    const [ currentUser, setCurrentUser ] = useState({});
    const [ userName,  setUserName ] = useState('')

    
    const handleUserLoggedIn = () => {
        navigate('/dashboard')
    }

    const handleUserNotRegistered = (user) => {
        setCurrentUser(user)
        setCurrentState(3)
    }

    const handleUserNotLoggedIn = () => {
        navigate('/login')
    }

    const handleInputUsername = (event) => {
        setUserName(event.target.value)
    }

    const handleContinue = async () => {
        if(userName != '') {
            const exists = await existsUserName(userName)
            if(exists) {
                setCurrentState(5)
            } else {
                const tmp = {...currentUser};
                tmp.userName = userName;
                tmp.processCompleted = true;
                await updateUser(tmp)
                setCurrentState(6)
            }
        }
    }

    if(state === 3 || state===5) {
        return<div>
            <h1>Bienvenido {currentUser.displayName}</h1>
            <p>Para terminar el proceso elige un nombre de usuario</p>
            {
                state===5 ? <p>El nombre de usuario ya existe, por favor elige otro</p> : null
            }
            <div>
                <input type="text" onChange={handleInputUsername}></input>
            </div>

            <div>
                <button onClick={handleContinue}>Continue</button>
            </div>
        </div>
    }

    if(state === 6) {
        return(
            <>
                <h1>Bienvenido! Ya puedes comenzar a crear tus links!</h1>
                <Link to='/dashboard'>Continuar</Link>
            </>
        )
    }

    return <AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
}