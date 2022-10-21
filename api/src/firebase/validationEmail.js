const { isSignInWithEmailLink, signInWithEmailLink } =require ("firebase/auth");
const { getAuth, sendSignInLinkToEmail } =require ("firebase/auth");
const actionCodeSettings = {
    url: 'https://http://localhost:3000/',
    handleCodeInApp: true,
        dynamicLinkDomain: 'example.page.link'
    };
    const userValidate = async() =>{
        const auth = getAuth();
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
    })
   /* .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    }); */
if (isSignInWithEmailLink(auth, window.location.href)) {
let email = window.localStorage.getItem('emailForSignIn');
if (!email) {
    email = window.prompt('Please provide your email for confirmation');
}
signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
    window.localStorage.removeItem('emailForSignIn');
    })
    .catch((error) => {
        console.log(error)
    });
}
}
module.export = {
    actionCodeSettings,
    userValidate
}