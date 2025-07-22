import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPackages } from "../services/pakageService";



// export const getPackages = createAsyncThunk(
//     'Package/get',
//     async (_, thunkAPI) => {
//         try {
//             const res = await fetchPackages();// 
//             return res.data;
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response?.data || err.message);
//         }
//     }
// )


export const getPackages = createAsyncThunk(
    'Package/GetAll',
    async () => {
        try {
            const res = await fetchPackages();
           
            console.log("slice",res);
            
           return res.data;
        } catch (err) {
           console.log('error',err)
       }
    }
)

export const buyPackage = createAsyncThunk(
    'packeges/buyPackages',
    async (packageId, thunkAPI) => {
        try {
            const res = await purchasePackage(packageId);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const packageSlice = createSlice({
    name: 'package',

    initialState:{
        packages:[],
        loading:false,
        error:""
    },
    
    reducers: {

    },
    extraReducers: (builder) => {
   
       
        builder.addCase(getPackages.fulfilled, (state, action) => {
            console.log("dsfd");
            state.packages = action.payload;
            state.loading = false;
        })
        builder.addCase(getPackages.pending, (state) => {
            console.log("dsfd");
            state.loading = true;
        })
        builder.addCase(getPackages.rejected, (state, action) => {
              console.log("dsfd");
            state.error = action.error;
            state.loading = false;
        })
       
        builder.addCase(buyPackage.fulfilled, (state, action) => {
            alert("the package purchesd")
        })
        builder.addCase(buyPackage.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(buyPackage.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })
    }
})
export default packageSlice.reducer







































// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// //  import * as packageService from "../services/pakageService";
// //  import { fetchPackages } from "../services/packageService";

// const initialState={

//   package:[],
//   error:null,
//   loading:false
// }

// export const getPackages = createAsyncThunk(
//   "packages/getPackages",//action.type
//   async () => {
//     const res = await packageService.fetchPackages();
//     return res.data;
//   }
//   //     return res.data;
//   // async (_, thunkAPI) => {
//   //   try {
//   //     const res = await packageService.fetchPackages();
//   //     return res.data;
//   //   } catch (err) {
//   //     return thunkAPI.rejectWithValue(err.response?.data || err.message);
//   //   }
//   // }
// );

// // export const buyPackage = createAsyncThunk(
// //   "packages/buyPackage",
// //   async (p) => {
// //    // try {
// //       const res = await packageService.purchasePackage(p);
// //       return res.data;
// //    // } catch (err) {
// //       // return thunkAPI.rejectWithValue(err.response?.data || err.message);
// //    // }
// //   }
// // );


// export const packageListSlice = createSlice({
//   name: "packages",
//   initialState: {
//     // package: [],באמיתי צריך להשאר ריק,
//      package : [
//       // {
//       //     code: 111,
//       //     discription:"aaaaaaaaa",
//       //     points: 100,
//       //     price:90
//       // },
//       // {
//       //   code: 111,
//       //   discription:"aaaaaaaaa",
//       //   points: 200,
//       //   price:175
//       // },
//       // {
//       //   code: 111,
//       //   discription:"aaaaaaaaa",
//       //   points: 250,
//       //   price:225
  
//       // }, {
//       //   code: 111,
//       //   discription:"aaaaaaaaa",
//       //   points: 300,
//       //   price:250
  
//       // }
//   ],
  
//     loading: false,
//     error: null,
//   }, 
//   extraReducers: (builder) => {
//     builder
//     // אמצע פעולה
//       .addCase(getPackages.pending, (state) => {
//         state.loading = true;
//       })
//       // הפעולה הצליחה
//       .addCase(getPackages.fulfilled, (state, action) => {
//         state.loading = false;
//         state.packages = action.payload;// action.payload=res.data
//       })
//       // הפעולה נכשלה
//       .addCase(getPackages.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(buyPackage.fulfilled, (state, action) => {
//         alert("החבילה נרכשה בהצלחה");
//       });
//   }
// })

// export default packageListSlice.reducer;



