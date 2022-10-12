import React, {useState} from 'react'
import firebaseApp from '../firebase/credenciales';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(firebaseApp);

    function Login() {
        const [register, setRegister] = useState(false);

        async function registarUsuario(email, password, rol){
            const infoUser = await createUserWithEmailAndPassword(auth, 
                email, 
                password).then((usuarioFirebase)=> {
                    return usuarioFirebase
                })
        }

        function submitHandler(e){
            e.prevetDefault();
            const email = e.target.elements.email.value;
            const password= e.target.elements.password.value;
            const rol = e.target.elements.rol.value;

            if(register){
                registarUsuario(email, password, rol)
            }else {

            }
        }

    return (
        <div>


        <h1> { register ? "registrate" : "iniciar sesion" } </h1>

        <form>
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