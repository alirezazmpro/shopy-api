
import Transform from "../transform.js";

export default class courseTransform extends Transform{


  transform(item){
    return {
      id:item.id,
      title:item.title,
      body:item.body,
      type:item.type,
      price:item.price,
      images:item.images,
      thumb:item.thumb,
      time:item.time,
      viewCount:item.viewCount,
      commentCount:item.commentCount,
      createdAt:item.createdAt,
      updateAt:item.updateAt,

    }
  }
  
}