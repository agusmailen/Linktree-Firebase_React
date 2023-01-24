import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { existsUserName, getProfilePhotoUrl, getUserProfileInfo } from "../firebase/firebase";
import PublicLink from '../components/publicLink';

export default function PublicProfileView() {
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState('');
    const [state, setState] = useState(0);


    const getUserInfo = async () => {
        const username = params.username;
            try{
                const userUid = await existsUserName(username);
                if(!userUid) return setState(7)
                const userInfo = await getUserProfileInfo(userUid);
                setProfile(userInfo)
                const urlUser = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture)
                setUrl(urlUser);
            } catch(error){
                console.log(error);
            }
    }

    useEffect(() => {
           getUserInfo();
    }, [params])


    if(state===7) {
        return (
            <div>
                <h1>No existe el nombre de usuario</h1>
            </div>
        )
    }
    
    return (
        <div>
            <div><img src={url} alt="" /></div> 
            <h2>{profile?.profileInfo.userName}</h2>
            <h2>{profile?.profileInfo.displayName}</h2>
            <div>
                {
                    profile?.linksInfo.map(link => {
                        return(
                            <PublicLink key={link.docId} url={link.url} title={link.title}></PublicLink>
                        )
                    })
                }
            </div>
        </div>
    
    )   
    
}