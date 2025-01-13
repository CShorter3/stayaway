import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import { OpenModalButton } from '../OpenModalButton';
// import { LoginFormModal } from '../LoginFormModal';
// import { SignupFormModal } from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  // const sessionLinks = sessionUser ? (
  //   <li>
  //     <ProfileButton user={sessionUser} />
  //   </li>
  // ) : (
  //   <>
  //     <li>
  //       <OpenModalButton
  //         buttonText="Log In"
  //         modalComponent={<LoginFormModal />}
  //       />
  //     </li>
  //     <li>
  //       <OpenModalButton 
  //       buttonText="Sign Up"
  //       modalComponent={<SignupFormModal />}
  //       />
  //     </li>
  //   </>
  // );

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
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

