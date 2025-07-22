import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import * as purchaseService from "../services/purchaseService";
 import { fetchpurchases } from "../services/purchaseService";
 
// import { useSelector } from "react-redux";
//  const user=useSelector((state)=>state.user.user)
export const getPurchases = createAsyncThunk(
  "purchases/getPurchases",//action.type
  async () => {
    const res = await purchaseService.fetchpurchases(user.id);
    return res.data;
  } 
);

// export const buyPackage = createAsyncThunk(
//   "packages/buyPackage",
//   async (packageId, thunkAPI) => {
//     try {
//       const res = await packageService.purchasePackage(packageId);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


export const MyPurchaseSlice = createSlice({
  name: "purchases",
  initialState: {
    purchases: [],
    //,באמיתי צריך להשאר ריק,
    // purchases : [
    // {
    //     code: 111,
    //     discription:"aaaaaaaaa",
    //     pointsBalance: 100,
    //     date: new Date(2025, 11, 11)
    // },
    // {
    //     code: 112,
    //     discription:"aaaaaaaaa",
    //     pointsBalance: 200,
    //     date: new Date(2015, 5, 12)
    // },
    // {
    //     code: 113,
    //     discription:"aaaaaaaaa",
    //     pointsBalance: 300,
    //     date: new Date(2000, 6, 14)

    // }, {
    //     code: 114,
    //     discription:"aaaaaaaaa",
    //     pointsBalance: 400,
    //     date: new Date(2004, 12, 5)

    // }
   
// ],
    loading: false,
    error: null,
  },
 
  extraReducers: (builder) => {
    builder
    // אמצע פעולה
      .addCase(getPurchases.pending, (state) => {
        state.loading = true;
      })
      // הפעולה הצליחה
      .addCase(getPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload;// action.payload=res.data
      })
      // הפעולה נכשלה
      .addCase(getPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(getPurchases.fulfilled, (state, action) => {
      //   alert("החבילות שלך התקבלו בהצלחה");
      // });
  },
});

export default MyPurchaseSlice.reducer;


