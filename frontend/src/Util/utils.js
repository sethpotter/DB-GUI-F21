const isLogin = () => {
    // add functionality to see if logged in TODO
    return true
}

const toQuery = (obj) => {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

export {
    isLogin,
    toQuery
}