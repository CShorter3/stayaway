import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
// import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { OpenModalButton } from '../OpenModalButton';
import { LoginFormModal } from '../LoginFormModal';
import { SignupFormModal } from '../SignupFormModal';
import './ProfileButton.css';
//import OpenModalMenuItem from './OpenModalMenuItem';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  //const buttonRef = useRef();
  const dropRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (
        // dropRef.current &&
         !dropRef.current.contains(e.target) 
        // && buttonRef.current &&
        // !buttonRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = `profile-dropdown${showMenu ? '' : ' hidden'}`;

  return (
    <div className="profile-button-container">
      <button /*ref={buttonRef}*/ onClick={toggleMenu} className="profile-btn">
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={dropRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button className="auth-btn" onClick={logoutHandler}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton buttonText="Log In"
              className="auth-btn" 
              modalComponent={<LoginFormModal/>}
              />
            </li>
            <li>
            <OpenModalButton 
              buttonText="Sign Up"
              className="auth-btn" 
              modalComponent={<SignupFormModal/>}
              />            
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;

// import { FiMenu } from 'react-icons/fi';

// const ProfileButton = () => {
//   return (
//     <div style={{ color: "orange", fontSize: "100px" }}>
//       <FiMenu />
//     </div>
//   );
// };

// export default ProfileButton;

// To change
// the size or color of the icon, wrap the icon component in a parent element like
// a `div`. Manipulating the `font-size` of the parent element changes the size of
// the icon. The color of the parent element will be the color of the icon. For
// example, to render a big orange carrot icon:

// ```jsx
// import { FaCarrot } from 'react-icons/fa6';

// // ...

// const Carrot = () => {
//   return (
//     <div style={{ color: "orange", fontSize: "100px" }}>
//       <FaCarrot />
//     </div>
//   );
// };