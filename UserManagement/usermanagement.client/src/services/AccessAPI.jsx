import { BASE_URL } from "../App";




export function getData(endPoint) {

    let token = localStorage.getItem('auth');

    let payload = {
        method: 'GET',
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(BASE_URL + endPoint, payload)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}

export function postDataForLogin(type, userData) {
    //let BaseURL = "https://localhost:7142/";
    let payload = {
        method: 'POST',
        headers: {
            "access-control-allow-origin": "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)

    }
    return fetch(BASE_URL + type, payload)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}

export function postData(endPoint, inputObj) {
    let token = localStorage.getItem('auth');
    let payload = {
        method: 'POST',
        headers: {
            "access-control-allow-origin": "*",
             'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(inputObj)

    }
    return fetch(BASE_URL + endPoint, payload)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}
export function postDataForAttachment(endPoint, inputObj) {
    let token = localStorage.getItem('auth');
    let payload = {
        method: 'POST',
        headers: {
            "access-control-allow-origin": "*",
            'Authorization': 'Bearer ' + token
        },
        body: inputObj

    }
    return fetch(BASE_URL + endPoint, payload)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}
export function deleteData(endPoint) {
    let token = localStorage.getItem('auth');
    let payload = {
        method: 'DELETE',
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    return fetch(BASE_URL + endPoint, payload)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}

export function putData(endPoint, obj) {
    let token = localStorage.getItem('auth');
    let payload = {
        method: 'PUT',
        headers: {
            "access-control-allow-origin": "*",
            'Authorization': 'Bearer ' + token
        },
        body: obj

    }
    return fetch(BASE_URL + endPoint, payload)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}
export function putDataJson(endPoint, updateObj) {
    let token = localStorage.getItem('auth');
    let payload = {
        method: 'PUT',
        headers: {
            "access-control-allow-origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(updateObj)

    }
    return fetch(BASE_URL + endPoint, payload)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
            return result;
        }).catch(function (error) {
            console.log(error);
        });
}