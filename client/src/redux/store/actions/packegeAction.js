import { ADD_PACKAGE, REMOVE_PACKAGE } from "../actionsType";


export const addPackage = (newPackage) => {
    return { type: ADD_PACKAGE, payload: newPackage };
}



export const deletePackage = (packageId) => {
    return { type: REMOVE_PACKAGE ,payload: packageId};
}
