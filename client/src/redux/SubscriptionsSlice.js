import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as SubscriptionsServic from "../services/SubscriptionsServic"
import { login, signup } from "../services/SubscriptionsServic";




 

export const fetchLogin = createAsyncThunk(
    'users/fetchLogin',
    async (user) => {
       
        
        const users = await login(user);
        
        return users;
    }
);

export const fetchSignup = createAsyncThunk(
    'users/fetchSignup',
    async (user) => {
        const x = await signup(user);
        return x;
    }
)
 export const userSlice = createSlice({
    name: 'user',
    initialState :{
        user: {},
        error: "",
        loading: false
    },
    reducers: {
        logOutU(state) {
            state.user = { ...initialState.user };
            state.error = '';
            localStorage.removeItem("root");
        }
    },
    extraReducers: (builder) => {
     //אמצע
        builder.addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      //הצליחה
        
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.user = action.payload.data
        })
        
        //נכשלה
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.error.message || 'wrong';
        });

        //אמצע
        builder.addCase(fetchSignup.pending, (state) => {
            state.loading = true;
          })   


        //הצליחה
        builder.addCase(fetchSignup.fulfilled, (state, action) => {
            state.user = action.payload.data
        })
        
        
        //נכשלה
        builder.addCase(fetchSignup.rejected, (state, action) => {
            state.error = action.error.message || 'wrong';
        });
        

    }
})