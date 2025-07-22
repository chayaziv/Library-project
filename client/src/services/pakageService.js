import axios from "axios";


// קבלה ערכים מטבלת חבילות 
// export const fetchPackages = () => axios.get(BASE_URL);
// export const purchasePackage = (p) => axios.post(BASE_URL,p,{
//     validateStatus: (status) => {
//         return status < 500;
//     }
// });

export const fetchPackages = async () => {
    try {
       
        
        
        const response = await axios.get(`https://localhost:7130/api/Package/GetAll`,{
            validateStatus: (status) => {
                return status < 500;
            }
        });
console.log("service ",response.data);
      return { data: response.data, status: response.status };
    }
    catch (error) {
        return error;
    }
}
// export const getPackageById = async (packageId) => {
//     try {
//         const response = await axios.get(`https://localhost:7130/api/Package/GetPackageById`,packageId,{
//             validateStatus: (status) => {
//                 return status < 500
//             }
//         })
//         return { data: response.data, status: response.status }

//     } catch (error) {
//         throw error
//     }
// }

