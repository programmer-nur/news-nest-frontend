import { jwtHelpers } from "@/helpers/jwtHelper";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utils/set.local.storage";
import { Secret } from "jsonwebtoken";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage("authToken", accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("authToken");
  // console.log(authToken);
  if (authToken) {
    const decodedData = jwtHelpers.verifyToken(
      authToken,
      process.env.JWT_SECRET as Secret
    );
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("authToken");
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

// export const getNewAccessToken = async () => {
//   return await axiosInstance({
//     url: `${getBaseUrl()}/auth/refresh-token`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     withCredentials: true,
//   });
// };
