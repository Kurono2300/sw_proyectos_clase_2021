let emptySign = {
    isloaded: false,
    isVerifying: false,
    hasError: false,
    error:"",
}


export const SIGN_CREATE = "SIGN_CREATE";
export const SIGN_FETCHING = "SIGN_FETCHING";
export const SIGN_ERROR = "SIGN_ERROR";


const dashReducer = (state = emptySign, action = {}) => {
    switch (action.type) {
        case SIGN_CREATE:
            const newSign = {
            ...state,
            isCreated:false,
            isVerifying: true,
            hasError:false,
            error:"",
            user:action.payload
            };
            return newSign;

        case SIGN_FETCHING:
            return { ...state, isVerifying:true};
        
            case SIGN_ERROR:
            return {
            ...state,
            isVerifying: false,
            hasError: true,
            error: action.payload
            };

        default:
            return state;
    }
}
export default dashReducer;
