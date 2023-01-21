import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup  } from "@firebase/auth"
import { useState } from "react";
import { auth, userExists } from "../firebase/firebase"
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

export default function LoginView() {

    const navigate = useNavigate();
    //const [ currentUser, setCurrentUser ] = useState(null);
    const [ state, setCurrentState ] = useState(0);

    /* state: 
    0: inicializado
    1: loading
    2: login completo
    3: login pero sin registro
    4: no hay nadie logeado
    5: ya existe el nombre de usuario/solicitar otro
    6: nuevo username click para continuar
    */

    const handleClick = async () => {
        const googleProvider = new GoogleAuthProvider();

        const signInWithGoogle = async (googleProvider) => {
            try {
                const res = await signInWithPopup(auth, googleProvider);
                console.log(res)
            } catch(error) {
                console.error(error)
            }
        }

        await signInWithGoogle(googleProvider)
    }

    const handleUserLoggedIn = () => {
        navigate('/dashboard')
    }

    const handleUserNotRegistered = () => {
        navigate('/choose-username')
    }

    const handleUserNotLoggedIn = () => {
        setCurrentState(4)
    }


    if(state === 4) {
        return (<div>
            <button onClick={handleClick}>Login with google</button>
        </div>)
    }


    return <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
    >
        <div>Loading...</div>
    </AuthProvider>
    

    
   
}