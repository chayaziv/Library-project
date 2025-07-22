import axios from "axios";



export const login = async (user) => {
    try {

        const response = await axios.post(`https://localhost:7130/api/Subscriptions/getUser`, user, {
            validateStatus: (status) => {
                return status < 500;
            }
        });
        console.log(response.data);
        return { data: response.data, status: response.status };
    }
    catch (error) {

        return error.response.status;
    }
}

export const signup = async (user) => {
    try {
        console.log(user);
        
        const response = await axios.post(`https://localhost:7130/api/Subscriptions/add`, user, {
            validateStatus: (status) => {
                return status < 500;
            }
        });
        return { data: response.data, status: response.status };
    }
    catch (error) {
        return error.response.status;
    }
}