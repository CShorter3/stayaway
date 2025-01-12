import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(); // reference to the profile button 
  const dropRef = useRef(); // reference to the dropdown menu

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  // close drop down off click
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  // log out user on button click event handler
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  // comment out secondary drop down log for now
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button-container">
      <button ref={buttonRef} onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={dropRef}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
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