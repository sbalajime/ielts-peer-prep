import CONSTANTS from '../constants';
export const putData = (url, body, callback) => {
    fetch(`${CONSTANTS.API_URL}${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
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
            "authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
        .then(result => callback(result))
        .catch(err => callback(err))
}