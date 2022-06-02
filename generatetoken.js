const generateToken = () => {

     var token = Math.random().toString(32).replace('0.','')
    return token
}

export default generateToken