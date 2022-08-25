import { instance } from "./api.ts";

// securityAPI
type getCaptchaType = {
  url: string
}

export const securityAPI = {
  getCaptcha() {
    return instance.get<getCaptchaType>("security/get-captcha-url");
  },
};