import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../Context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  
  const formFilled = email && username && firstName
                           && lastName && password
                           && confirmPassword;
  const passwordConfrimed = password === confirmPassword;
  const fieldLengsValid =  password.length >= 6 && username.length >= 4; 
  const invalidAttempt = (!formFilled || !passwordConfrimed || !fieldLengsValid);
  const isDisabled = invalidAttempt;

  useEffect(() => {
    if(password && confirmPassword && !passwordConfrimed){
      setErrors((prevErrors) => ({
        ...prevErrors, confirmPassword: "Confirm Password must be the same as Password"
      }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors; // extract confirmPassword key from errors object
        console.log(confirmPassword); // delete
        return rest;
      })
    }
  }, [password, confirmPassword, passwordConfrimed])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!invalidAttempt) {
      setErrors({});
      return dispatch(
        sessionActions.signup({ email, username, firstName, lastName, password, confirmPassword
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='error'>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='error'>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='error'>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='error'>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='error'>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className='error'>{errors.confirmPassword}</p>
        )}
        <button type="submit"
          disabled={isDisabled}
          className={isDisabled ? "prohibited-cursor" : ""}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;


// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

// function SignupFormPage() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector((state) => state.session.user);
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [errors, setErrors] = useState({});
  
//     if (sessionUser) return <Navigate to="/" replace={true} />;
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (password === confirmPassword) {
//         setErrors({});
//         return dispatch(
//           sessionActions.signup({
//             email,
//             username,
//             firstName,
//             lastName,
//             password
//           })
//         ).catch(async (res) => {
//           const data = await res.json();
//           if (data?.errors) {
//             setErrors(data.errors);
//           }
//         });
//       }
//       return setErrors({
//         confirmPassword: "Confirm Password field must be the same as the Password field"
//       });
//     };
  
//     return (
//       <>
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Email
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </label>
//           {errors.email && <p>{errors.email}</p>}
//           <label>
//             Username
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </label>
//           {errors.username && <p>{errors.username}</p>}
//           <label>
//             First Name
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//             />
//           </label>
//           {errors.firstName && <p>{errors.firstName}</p>}
//           <label>
//             Last Name
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//             />
//           </label>
//           {errors.lastName && <p>{errors.lastName}</p>}
//           <label>
//             Password
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </label>
//           {errors.password && <p>{errors.password}</p>}
//           <label>
//             Confirm Password
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </label>
//           {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
//           <button type="submit">Sign Up</button>
//         </form>
//       </>
//     );
//   }
  
//   export default SignupFormPage;
