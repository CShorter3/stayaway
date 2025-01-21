// frontend/src/components/loginFormPage

// loginFormPage is default exported to must re-export
// import LoginFormPage from './LoginFormPage';
// export { LoginFormPage };

// valid one liner
export { default as LoginFormModal } from './LoginFormModal';


// invalid named export would be exported as | also named import in app would then need to be wrapped in curly braces
// export { LoginFormPage } from './LoginFormPage';
