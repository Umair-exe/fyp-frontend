import { toast } from "react-hot-toast";
import axios from "axios";
import { stop } from "../features/appSlice";

export const resetPassword = async (email,dispatch) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/users/find/${email}`);
        return res;
    } catch (error) {
        throw error;
    }
}

export const passwordReset = async (data, id, dispatch) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_URL}/api/users/updatePassword/`,{
            data,
            id,
        });
        return res;
    } catch (error) {
        throw error;
    }
}