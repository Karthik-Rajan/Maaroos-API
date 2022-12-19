import { vendorList, currentVendor } from "../actions";

const commonState = {
  location: {
    coordinates: {
      lat: 0,
      lng: 0,
    },
    name: "",
  },
  search: {
    lat: 0,
    lng: 0,
    avg_rating: 0,
    distance: 5,
    is_veg: "NO",
  },
  list: [],
  vendorDetail: {},
};
const initialState = new Promise((resolve, reject) => {
  resolve({
    location: commonState.location,
    list: commonState.list,
    search: commonState.search,
  });
});

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "LOCATION":
      return vendorList({ ...commonState.search, ...action.payload }).then(
        (res: any) => {
          return res;
        }
      );
    case "CURRENT_VENDOR":
      return {
        vendor: state,
        ...action.payload,
      };
    default:
      return state;
  }
}
export default reducer;
