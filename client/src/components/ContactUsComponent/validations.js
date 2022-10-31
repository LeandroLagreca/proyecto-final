export default function validation(input) {
	const errors = {
	}

	const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

	const phoneRegEx = /^[0-9]+$/

	if(!input.email) {
		errors.emailRequired = 'El email es requerido'
	}

	if(!emailRegEx.test(input.email)) {
		errors.emailFormat = 'Debe tener formato de email'
	}

	if(!input.fullName){
		errors.name = "debes escribir un nombre"
	}
	if(!phoneRegEx.test(input.phone)){
		errors.phoneFormat = "debes escribir un numero telefonico"
	}

	return errors
}