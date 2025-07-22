import {ADD_PACKAGE,REMOVE_PACKAGE} from '../actionsType'
const initialState={
    packagess:[
        {
           
        },
        {
           
        },
        {
           
        },
        {
           
        }
    ],
    selectedPackage:{}
}
const packageReducer=(state=initialState,action)=>{
    switch (action.type){
        case ADD_PACKAGE:
            return { ...state, packagess: [...state.packagess, action.payload] }
        case REMOVE_PACKAGE:
             const thePackage = state.packagess.filter(thePackage => thePackage.id != action.payload);
             return {...state,packagess:thePackage}
        default:
            return state;


        
    }
}
export default packageReducer;