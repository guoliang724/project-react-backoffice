import ajax from "./ajax"
import jsonp from "jsonp"
import { message } from "antd"


const base = '';

/* get the login information */
export function reqLogin(username,password) {
      return   ajax(base+"/login", {username,password},"POST")
}
/*request to add an user */
export function  reqAdduser(user) { 
        return ajax(base+"/manage/user/add",user,"POST")
    }
/*fetch weather information */
export function reqWeather(city) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=31b67d550e93316925f5913b31894f17`
      return new Promise((resolve, reject) => { 
            jsonp(url, {}, (err, data) => { 
                  if (!err && data.cod === 200) {
                        resolve(data);
                  }
                  else { 
                        message.warning("cannot fetch the weather information")
                  }
            })
      })
}
/*get time in a proper format */
export function reqTime(time) { 
      const date = new Date(time);
      return (`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)  
}
/*request catefory information */
export function reqCategorys(parentId) { 
      return ajax(base+"/manage/category/list", {parentId})
}
export function reqAddCategory({parentId,categoryName}) { 
      return ajax(base+"/manage/category/add", {parentId,categoryName},"POST")
}
export function reqUpdateCategory({categoryId , categoryName}) { 
      return ajax(base+"/manage/category/update", {categoryId,categoryName},"POST")
}