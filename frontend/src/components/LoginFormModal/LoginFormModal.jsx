// ADD MEMOIZATION ONCE FINISHED

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isDisabled = credential.length < 4 || password.length < 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" 
          disabled={isDisabled}
          className={isDisabled ? "prohibited-cursor" : ""}
        >Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;


// import { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import './LoginForm.css';

// function LoginFormModal() {
//   const dispatch = useDispatch(); // allows component access to dispatch actions
//   const sessionUser = useSelector((state) => state.session.user); // enables direct access to the current user
//   const [credential, setCredential] = useState("");     // implements controlled credential input
//   const [password, setPassword] = useState("");         // implemetes controlled password input 
//   const [errors, setErrors] = useState({});             // implements controlled errors input to support form validation

//   // redirect a logged-in user to home page
//   if (sessionUser) return <Navigate to="/" replace={true} />;

//   // call login thunk on click of login button
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login({ credential, password })).catch(
//       async (response) => {
//         const data = await response.json();
//         if (data?.errors) setErrors(data.errors);
//       }
//     );
//   };

//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username or Email
//           <input
//             type="text"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.credential && <p>{errors.credential}</p>}
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// }

// export default LoginFormModal;