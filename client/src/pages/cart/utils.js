import axios from 'axios'

export async function saveOrder() {
    
}

export async function makeEmail(to, name, order) {
	const games = order.games.map(game => (
		`<li>
			<span>Nombre: ${game.name} X${game.cant}</span> <br>
			<span>Precio: ${game.price}</span>
		</li>`
	))
    axios.post('http://localhost:3001/sendMail', {
        to,
        subject: 'Compra Realizada con exito!',
        html: `
        <h1>Hola ${name}, gracias por su compra en GameScript</h1>
				<span><b>Identificador de orden:</b> ${order.id}</span> <br>
				<span><b>Fecha:</b>  ${order.date}</span> <br>
				<span><b>Monto Final</b> : $${order.totalprice}<span>
				<h5>Juegos obtenidos</h5>
        <ul>
					${games}
        </ul>
        `
    })
}