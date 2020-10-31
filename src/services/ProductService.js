import http from "../http-common";

const getDepartments = () => {
  return http.get("/departmentsData");
};

const getCategories = () => {
  return http.get("/categoriesData");
};

const getProducts = () => {
  return http.get("/productsData");
};

const get = id => {
  return http.get(`/productsData/${id}`);
};

const create = data => {
  return http.post("/productsData", data);
};

const update = (id, data) => {
  return http.put(`/productsData/${id}`, data);
};

const remove = id => {
  return http.delete(`/productsData/${id}`);
};

const removeAll = () => {
  return http.delete("/productsData");
};

const findByName = name => {
  return http.get(`/productsData?name=${name}`);
};

export default {
    getDepartments,
    getCategories,
    getProducts,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};
