import axios from "axios";

const BASE_URL = "http://localhost:/api/purchase";

export const  fetchPackages= (purchase)=>
    axios.prototype(`${BASE_URL}/purchase`,purchase);
    