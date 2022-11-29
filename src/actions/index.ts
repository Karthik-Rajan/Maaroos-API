export const location = (payload: any) => {
  return {
    type: "LOCATION",
    payload,
  };
};
export const currentVendor = (payload: any) => {
  return {
    type: "CURRENT_VENDOR",
    payload,
  };
};
