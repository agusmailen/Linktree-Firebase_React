import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import {v4 as uuidv4} from 'uuid';
import { getLinks, insertNewLink, updateLink, deleteLink } from "../firebase/firebase";
import Link from "../components/link";



export default function DashboardView() {
    
    const navigate = useNavigate();

    const [ currentUser, setCurrentUser ] = useState({});
    const [ state, setCurrentState ] = useState(0);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('')
    const [links, setLinks] = useState([])

    const handleUserLoggedIn = async (user) => {
       setCurrentUser(user)
       setCurrentState(2)
       const resLinks = await getLinks(user.uid);
       setLinks([...resLinks])
    }

    const handleUserNotRegistered = () => {
        navigate('/login')
    }

    const handleUserNotLoggedIn = () => {
        navigate('/login')
    }

    const handleOnSubmit = (event) => {
        console.log(links)
        console.log(title, url)
        event.preventDefault();
        addLink();
    }

    const addLink = async() => {
        if(title != '' && url != '') {
            const newLink = {
                id: uuidv4(),
                title: title,
                url: url,
                uid: currentUser.uid,
            }
            const res = await insertNewLink(newLink)
            newLink.docId = res.id;
            setTitle('');
            setUrl('');
            setLinks([...links, newLink]);
        }
    }

    const handleOnChange = (event) => {
        let value = event.target.value;
        if(event.target.name === 'title') {
            setTitle(value)
        }
        if(event.target.name === 'url') {
            setUrl(value)
        }
    }

    const handleDeleteLink = async (docId) => {
        deleteLink(docId);
        const tmp = links.filter(link => link.docId != docId)
        setLinks(tmp);
    }

    const handleUpdateLink = async (docId, title, url) => {
        const link = links.find(item => item.docId === docId);
        link.title = title;
        link.url = url;
        await updateLink(docId, link)
    }

    if(state === 0) {
        return <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>Loading....</div>
        </AuthProvider>
    }

    return (
        <DashboardWrapper>
            <div>
                <h1>Dashboard</h1>

                <form action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="title">title</label>
                    <input type="text" name="title" id="" onChange={handleOnChange} />

                    <label htmlFor="url">Url</label>
                    <input type="text" name="url" id="" onChange={handleOnChange}/>

                    <input type="submit"  value="Create new link"/>
                </form>

                <div>
                    {
                        links.map( link => {
                           return <Link 
                                key={link.docId}
                                docId={link.docId}
                                url={link.url}
                                title={link.title}
                                onDelete={handleDeleteLink}
                                OnUpdate={handleUpdateLink}
                            />
                        })
                    }
                </div>
            </div>
        </DashboardWrapper>
    )
    
    
}