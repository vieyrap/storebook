import { Schema,model } from "mongoose";
import bcrypt from 'bcrypt-nodejs'
import '../config/passport.js'

let userScheme=new Schema({
    name:String,
    email:String,
    password:String
})

userScheme.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userScheme.methods.comparePassword= function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default model('User', userScheme)