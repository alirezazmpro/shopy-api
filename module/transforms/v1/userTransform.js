import Transform from "../transform.js";
import jwt from 'jsonwebtoken';

export default class userTransform extends Transform {

  transform(item,createStatusToken=false){
    this.createStatusToken=createStatusToken;
    return {
      id:item._id,
      name:item.name,
      email:item.email,
      admin:item.admin,
      ...this.withToken(item)
    }
  }

  withToken(item){

    if(item.token) return {token:item.token};

    if(this.createStatusToken){
      let token=jwt.sign({user_id:item._id,},process.env.JWT_KEY,{
        expiresIn:'10 days'
      });

      return {
        token
      }

    }
    return {};

  }
}