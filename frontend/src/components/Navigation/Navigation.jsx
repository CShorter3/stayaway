import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      <div className="nav-left">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </div>
      <div className="nav-right">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </nav>
  );
}

export default Navigation;



// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   return (
//     <nav className="navigation-bar">
//       <ul className="nav-links">
//         <li>
//           <NavLink exact="true" to="/">
//             Home
//           </NavLink>
//         </li>
//       </ul>
//       {isLoaded && (
//         <div className="profile-section">
//           <ProfileButton user={sessionUser} />
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navigation;

