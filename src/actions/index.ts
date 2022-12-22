import { BASE_URL, ME } from "../constants/user";
import { FETCH } from "../constants/vendor";
import {
  authHeaders,
  refreshAuth,
  methodProps,
  guestHeaders,
} from "../constants/apis";

export const vendorList = async (payload: any) => {
  let vendorData = {};
  const response = {
    type: "LOCATION",
    search: payload.search,
    location: payload.location,
    list: vendorData,
  };

  return await fetch(BASE_URL + FETCH, {
    ...methodProps("POST", payload.search),
    ...guestHeaders,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return { ...response, list: data };
    });
};

export const currentVendor = (payload: any) => {
  return {
    type: "CURRENT_VENDOR",
    payload,
  };
};

export const userProfile: any = async (
  retry: boolean = true,
  idToken: string = ""
) => {
  let userData = {};
  const response = { type: "USER_PROFILE_FETCH", userData };

  return await fetch(BASE_URL + ME, {
    ...authHeaders(idToken),
    ...methodProps("GET"),
  })
    .then((res: any) => {
      return res.json();
    })
    .then((data: any) => {
      return { ...response, userData: data };
    })
    .catch(async (err: any) => {
      /** Retry Authentication */
      if (retry) {
        const user = await refreshAuth();
        return await userProfile(false, user?.getIdToken()?.getJwtToken());
      }
      console.log("User Login Err", err);
    });
};
