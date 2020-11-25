/* eslint-disable import/no-anonymous-default-export */
import store from "store"
const USER_ID = "user_id";

export default {
    SetUser(user) { 
        store.set(USER_ID,user)
    },
    GetUser() { 
        return store.get(USER_ID)
    },
    RemoveUser() { 
        return store.remove(USER_ID);
    }
    

}