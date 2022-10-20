import axios from 'axios';


export const Google = (payload) => {
    return async function(dispatch){
        axios.get('http://localhost:3001/google')
        .then((res)=> {
            dispatch({
                type : Google,
                payload
            })
        })
    }
}
