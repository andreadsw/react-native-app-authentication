const initialState = {
    email: "",
    password:"",
    user: {},
    error: "",
    loading: false
}

export default (state = initialState, action ) => {
    switch(action.type) {
     case "AUTH_INPUT_CHANGE":
    // copy of initial state and update with the new state
    // newState = { email: 'newValue', password: 'newValue'}
        return { ...state, [action.payload.field]: action.payload.value };
     case "LOGIN_SUCCESS":
       //console.log("success!");
       //console.log(action.payload);
       return {...state, user: action.payload, loading: false};
     
    case "LOADING":
        return {...state, loading: true};
    
    case "LOGIN_FAILURE":
        //console.log("error");
        return { ...state, error: "Authentication failed", password: "", loading: false };

    default:
        return state;
    }

}
