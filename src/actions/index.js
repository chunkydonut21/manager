import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export const EMAIL_CHANGED = 'email_changed'
export const PASSWORD_CHANGED = 'password_changed'
export const LOGIN_USER_SUCCESS = 'login_user_success'
export const LOGIN_USER_FAIL = 'login_user_fail'
export const LOGIN_USER = 'login_user'
export const EMPLOYEE_UPDATE = 'employee_update'
export const EMPLOYEE_CREATED = 'employee_created'
export const EMPLOYE_SAVED = 'employee_saved'
export const EMPLOYEES_FETCH_SUCCESS = 'employee_fetch_success'

export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => async dispatch => {
    dispatch({ type: LOGIN_USER })
    try {
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
        Actions.employeeList()
    } catch (error) {
        try {
            const user = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
            dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
            Actions.employeeList()
        } catch (error) {
            dispatch({ type: LOGIN_USER_FAIL })
        }
    }
}

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    }
}

//creating a record in database
export const employeeCreate = ({ name, phone, shift }) =>
    (async = dispatch => {
        const { currentUser } = firebase.auth()

        firebase
            .database()
            .ref(`/users/${currentUser.uid}/employees`)
            .push({ name, phone, shift })
        dispatch({ type: EMPLOYEE_CREATED })
        Actions.employeeList()
    })

//fetching all records in database
export const employeesFetch = () =>
    (async = dispatch => {
        const { currentUser } = firebase.auth()
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({
                    type: EMPLOYEES_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            })
    })

//updating records in database
export const employeeSave = ({ name, phone, shift, uid }) =>
    (async = dispatch => {
        const { currentUser } = firebase.auth()

        firebase
            .database()
            .ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })

        dispatch({ type: EMPLOYE_SAVED })
        Actions.employeeList()
    })

//deleting record from database
export const employeeDelete = ({ uid }) =>
    (async = dispatch => {
        const { currentUser } = firebase.auth()

        firebase
            .database()
            .ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()

        Actions.employeeList({ type: 'reset' })
    })
