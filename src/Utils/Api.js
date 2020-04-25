import CONSTANTS from '../constants';
export const putData = (url, body, callback) => {
    fetch(`${CONSTANTS.API_URL}${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
        .then(result => callback(result))
        .catch(err => callback(err))
}


export const postData = (url, body, callback) => {
    fetch(`${CONSTANTS.API_URL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
        .then(result => callback(result))
        .catch(err => callback(err))
}


export const getData = (url, callback) => {
    fetch(`${CONSTANTS.API_URL}${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        }
    }).then(res => res.json())
        .then(result => callback(result))
        .catch(err => callback(err))
}
