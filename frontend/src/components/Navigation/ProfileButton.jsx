import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
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