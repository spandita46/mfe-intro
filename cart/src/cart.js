import { BehaviorSubject } from "rxjs";
import React, { useEffect, useState } from "react";

const API_SERVER = "http://localhost:8080";

export const JWT = new BehaviorSubject(null);
export const CART = new BehaviorSubject(null);

export const getCart = () =>
  fetch(`${API_SERVER}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT.value}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      CART.next(res);
      return res;
    });

export const addToCart = (id) =>
  fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT.value}`,
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

export const clearCart = () =>
  fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT.value}`,
    },
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

export const login = (username, password) => {
  fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      JWT.next(data.access_token);
      getCart();
      return data.access_token;
    });
};

export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(!!JWT.value);
  useEffect(() => {
    setLoggedIn(!!JWT.value);
    return JWT.subscribe((c) => {
      setLoggedIn(!!JWT.value);
    });
  }, []);
  return loggedIn;
}
