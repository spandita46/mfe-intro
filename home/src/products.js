const API_SERVER = "http://localhost:8080";

export const getProducts = () => {
  return fetch(`${API_SERVER}/products`).then((res) => res.json());
};

export const getProductsById = (id) => {
  return fetch(`${API_SERVER}/products/${id}`).then((res) => res.json());
};

export const currency = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});
