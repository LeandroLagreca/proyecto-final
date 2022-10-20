import axios from "axios";
import {
    getAllComments
} from "../reducers/videoGame";

const API = "http://localhost:3001/";



export const getComments = () => {
    try {
        return function (dispatch) {
            dispatch(getAllComments)
        }
    }
    catch (error) {
        console.log(error)
    }
}