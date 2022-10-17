export default function validation(input) {
	const errors = {
	}

	const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

	const passRegEx = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,14}$/

	if(!input.email) {
		errors.emailRequired = 'El email es requerido'
	}

	if(!emailRegEx.test(input.email)) {
		errors.emailFormat = 'Debe tener formato de email'
	}

	if(!input.password) {
		errors.passRequired = 'La contraseña es requerida'
	}

	if(!passRegEx.test(input.password)) {
		errors.passFormat = 'La contraseña debe tener entre 6 y 14 caracteres, al menos un digito, una minuscula y una mayuscula'
	}

	return errors
}