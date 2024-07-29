import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../Navbar.css';
import {supabase} from '../supabaseClient';
import {FaUserCircle} from 'react-icons/fa';

function NavBar() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');


    useEffect(() => {
        const session = supabase.auth.getSession();
        if (session && session.user) {
            setUser(session.user);
            setUserName(session.user.user_metadata.fullName || session.user.user_metadata.name);
            setUserPicture(session.user.user_metadata.picture)
        }
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session && session.user) {
                setUser(session.user);
                setUserName(session.user.user_metadata.fullName || session.user.user_metadata.name);
                setUserPicture(session.user.user_metadata.picture);
            } else {
                setUser(null);
                setUserName('');
                setUserPicture('');
            }
        });
    }, []);
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/b-logo.png" alt="Logo"/>
                </Link>
            </div>

            <div className="navbar-buttons">
                {user ? (
                    <>

                        <p>Hello!  {userName} </p>
                        {userPicture && (
                            <img src={userPicture} alt="User" className="w-6 h-6 transition-all duration-300 group-hover:text-brand-600 " />
                        )}
                        <Link to="/dashboard" className="navbar-button"><FaUserCircle
                            className="w-6 h-6 transition-all duration-300 group-hover:text-brand-600 "/></Link>
                        <Link to="/" onClick={() => supabase.auth.signOut()}
                              className="navbar-button">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-button">Login</Link>
                        <Link to="/signup" className="navbar-button">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
