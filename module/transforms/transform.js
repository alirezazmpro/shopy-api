import autoBind from "auto-bind";

export default class Transform {
  constructor(){
    autoBind(this);
  }
  transformCollection(items){
    return items.map(item=>this.transform(item));
  }
}