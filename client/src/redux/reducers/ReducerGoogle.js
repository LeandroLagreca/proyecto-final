import { Google } from "../actions/Actiongoogle";

const initialState = {
    user : []
};

const rootReducer = (state = initialState, action)=>{
    switch(action.type){
        case Google: {
            return{
                ...state,
                user: action.payload,
            }
        }
        default:
            return state;
    }
}

export default rootReducer;