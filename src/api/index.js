import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";

const base = "";
export var universalUrl = base;
/* get the login information */
export function reqLogin(username, password) {
  return ajax(base + "/login", { username, password }, "POST");
}

/*fetch weather information */
export function reqWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=31b67d550e93316925f5913b31894f17`;
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (!err && data.cod === 200) {
        resolve(data);
      } else {
        message.warning("cannot fetch the weather information");
      }
    });
  });
}
/*get time in a proper format */
export function reqTime(time) {
  const date = new Date(time);
  return `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
/******************Category***************/
/*request categories information */
export function reqCategorys(parentId) {
  return ajax(base + "/manage/category/list", { parentId });
}
//get a category name by ID
export function reqCategoryName(categoryId) {
  return ajax(base + "/manage/category/info", { categoryId });
}
//request to add category
export function reqAddCategory({ parentId, categoryName }) {
  return ajax(
    base + "/manage/category/add",
    { parentId, categoryName },
    "POST"
  );
}
//request to update category
export function reqUpdateCategory({ categoryId, categoryName }) {
  return ajax(
    base + "/manage/category/update",
    { categoryId, categoryName },
    "POST"
  );
}
/*************Product*********************** */
//request to prodcut inforamtion
export function reqProducts(pageNum, pageSize) {
  return ajax(base + "/manage/product/list", { pageNum, pageSize });
}
//request to product information by pageNumber, pageSize, productName or producDesc
export function reqSearchProducts(
  pageNum,
  pageSize,
  searchContent,
  searchType
) {
  return ajax(base + "manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchContent,
  });
}

//update the product status(on shelves/off shelves)
export function reqUpdateStatus(productId, status) {
  return ajax(
    base + "/manage/product/updateStatus",
    { productId, status },
    "POST"
  );
}
//add or update a product
export function reqAddOrUpdateProduct(product) {
  if (product._id) {
    return ajax(base + "/manage/product/update", product, "POST");
  } else {
    return ajax(base + "/manage/product/add", product, "POST");
  }
}
//delete pictures
export function reqDeletePictures(name) {
  return ajax(base + "/manage/img/delete", { name }, "POST");
}
/***********Roles***************** */
//request all roles
export const reqRoles = () => {
  return ajax(base + "/manage/role/list");
};

//add a role
export function reqAddRole(roleName) {
  return ajax(base + "/manage/role/add", { roleName }, "POST");
}

//update a role
export function reqUpdateRole(role) {
  return ajax(base + "manage/role/update", role, "POST");
}

/************Users******************/
//request to user lists
export function reqUsers() {
  return ajax(base + "/manage/user/list");
}
//request to delete user
export function reqDeleteUsers(userId) {
  return ajax(base + "/manage/user/delete", { userId }, "POST");
}

/*request to add an user */
export function reqAdduser(user) {
  return ajax(base + "/manage/user/add", user, "POST");
}

//request to update an user
export function reqUpdateUser(user) {
  return ajax(base + "/manage/user/update", user, "POST");
}
