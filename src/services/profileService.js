import axios from "axios"
import { toast } from "react-hot-toast"
import { getToken } from "../helpers/getToken"


export const updateProfile = async (data) => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_URL}/api/users/updateProfile`, data , {
            headers: {
                'access_token': getToken(),
            }
        })
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }

}

export const getUsers = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/users/getUsers`,{
            headers: {
                "access_token": getToken()
            }
        });
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_URL}/api/users/deleteUser/${id}`,{
            headers: {
                "access_token": getToken()
            }
        });
        return res;
    } catch (error) {
        toast.error(error.response.data.message);
    }
}