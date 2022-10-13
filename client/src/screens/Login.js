import React, {useState} from 'react'
import firebaseApp from '../firebase/credenciales';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(firebaseApp);

function Login() {
        const firestore = getFirestore(firebaseApp);
        const [register, setRegister] = useState(false);

        async function registarUsuario(email, password, rol){
            const infoUser = await createUserWithEmailAndPassword(auth, 
                email, 
                password).then((usuarioFirebase)=> {
                    return usuarioFirebase
                })
                const docuRef = doc(firestore, `usuarios/${infoUser.user.uid}`)
                setDoc(docuRef, {correo: email, rol: rol})
        }

        function submitHandler(e){
            e.prevetDefault();
            const email = e.target.elements.email.value;
            const password= e.target.elements.password.value;
            const rol = e.target.elements.rol.value;

            if(register){
                registarUsuario(email, password, rol)
            }else {
                signInWithEmailAndPassword(auth, email, password);
            }
        }

    return (
        <div>


        <h1> { register ? "registrate" : "iniciar sesion" } </h1>

        <form onSubmit={submitHandler}>
            <label>
                correo electronico:
                <input type= "email" id = 'email' />
            </label>
            <label>
                contraseña:
                <input type= "password" id = 'password'/>
            </label>
            <label>
                Rol:
                <select  id = 'rol'>
                    <option value = 'admin'>Administrador</option>
                    <option value = 'user'>usuario</option>
                </select>
            </label>
            <input type= 'submit'
            value = {register ? "registrate" : "iniciar sesion"} />
        </form>
        <button  onClick={()=> setRegister(!register)}>
        {register ? 'ya tengo una cuenta' : "quiero registrarme"}
        </button>
        </div>
    )
    }

export default Login