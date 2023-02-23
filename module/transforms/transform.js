

export default class Transform {

  transformCollection(items){
    return items.map(item=>this.transform(item));
  }
}