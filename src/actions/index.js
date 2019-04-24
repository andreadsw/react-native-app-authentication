import firebase from "firebase";

// object destructing. Do not forget ({})
export const authInputChange = ({ field, value }) => {
    return {
        type: 'AUTH_INPUT_CHANGE',
        // This the field: 'email', 'text': 'test@test.com'
        payload: { field, value }
    }
}

export const login = ({ email, password }) => {
    // callback dispatch the call when it is success
    return (dispatch) => {
        dispatch({type: "LOADING"});
        // firebase promise
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({type: "LOGIN_SUCCESS", payload: user});
            })
            // works when you have an error callback
            .catch(function(error) {
                //send a dispatch of type
                dispatch({type: "LOGIN_FAILURE"});
            });
    }
}
