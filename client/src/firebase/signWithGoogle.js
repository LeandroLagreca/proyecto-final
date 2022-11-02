import axios from 'axios'

export default async function signWithGoogle(user) {
  const { email, displayName, uid, photoURL, emailVerified  } = user
  console.log(user)
  await axios.post('http://localhost:3001/login?google=true', {
      id: uid,
      email,
      name: displayName,
      image: photoURL,
      emailVerified,
      password: Math.random() * 1209847 + 'secretoGameScript'
  })
}
