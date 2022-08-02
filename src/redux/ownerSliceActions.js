import axios from 'axios';
import { getOwners } from './ownerSlice'

export function getOwner(){
    return async function(dispatch){
    const owners = await axios.get('https://api-rest-server-padel.herokuapp.com/owners');
    return dispatch({getOwners(owners.data)})
    }
}
export function getRecipe(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipe",{
        });
        return dispatch({
            type: "GET_RECIPE",
            payload: json.data
        })
    }
}