import { location, currentVendor } from "../actions";

const initialState = {
  location: {
    coordinates: {
      lat: 0.0,
      lng: 0.0,
    },
    name: "",
  },
  vendorDetail: {},
};
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "LOCATION":
      return {
        location: state.location,
        ...action.payload,
      };
    case "CURRENT_VENDOR":
      return {
        vendor: state.vendorDetail,
        ...action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
