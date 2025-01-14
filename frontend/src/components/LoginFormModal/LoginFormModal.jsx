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

  // **** NOT WORKING CORRECTLY ****
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 
  
    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal(); 
    } catch (error) {
         // Parse the JSON body of the response to see whats going on
        const data = await error.json();
        console.log("Parsed error data:", data); 
  
        if (error.status === 401 && data.message === "Invalid credentials") {
          setErrors({ credential: "The provided credentials were invalid." });
        } else if (error.status === 400 && data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ credential: "An unexpected error occurred. Please try again." });
        }
      }
    };

    const handleDemoLogin = async () => {
      setErrors({});
      try {
        await dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }));
        closeModal(); // Close the modal if login is successful
      } catch (error) {
        console.log("Error caught: ", error);
        setErrors({ credential: "The provided credentials were invalid" });
      }
    };

    /*
    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    
    try {
      await dispatch(sessionActions.login({ credential, password }));
      closeModal(); // Close the modal if login is successful
    } catch (error) {
      console.log("Error caught: ", error);
      // Handle errors
      setErrors({ credential: "The provided credentials were invalid" });
    }
  };
    */
  

  return (
    <>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <a href="#" onClick={handleDemoLogin}>Log in as Demo User</a>
      </div>
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
        >
          Log In
        </button>
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