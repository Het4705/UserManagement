const jwt=require('jsonwebtoken')

const secretKey="UserManagement@1233342##"

function setUser(user){
    return jwt.sign({
        email:user.email,
        role:user.role
    },secretKey)
}

function getUser(token)
{
    if(!token) return null
    return jwt.verify(token,secretKey)
}

module.exports={
    setUser,getUser
}