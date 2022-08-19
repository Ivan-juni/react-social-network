import axios from "axios";

// ! SAMURAI API QUERIES

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": `${process.env.REACT_APP_API_KEY}`, // ! вставить сюда api key
  },
});

export const usersAPISamurai = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id) {
    return instance.post(`follow/${id}`); //.then((response) => response.data);
  },
  unfollow(id) {
    return instance.delete(`follow/${id}`); //.then((response) => response.data);
  },
};

export const authAPISamurai = {
  getAuth() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete("auth/login");
  },
};
export const securityAPI = {
  getCaptcha() {
    return instance.get("security/get-captcha-url");
  },
};

export const profileAPISamurai = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, { status: status });
  },
  setPhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo/`, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  saveProfile(profile) {
    return instance.put(`profile/`, profile);
  },
};

// ! PLACEHOLDER API QUERIES

const baseUrl = "https://jsonplaceholder.typicode.com/";

export const usersAPIPlaceholder = {
  getUsers(currentPage = 1, pageSize = 5) {
    return axios
      .get(baseUrl + `users?_page=${currentPage}&&_limit=${pageSize}`)
      .then((response) => response.data);
  },
};
