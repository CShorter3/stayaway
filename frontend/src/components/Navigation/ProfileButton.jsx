import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef();
  const dropRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = `profile-dropdown${showMenu ? '' : ' hidden'}`;

  return (
    <div className="profile-button-container">
      <button ref={buttonRef} onClick={toggleMenu} className="profile-btn">
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
              <NavLink to="/login" className="auth-btn">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="auth-btn">Sign Up</NavLink>
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