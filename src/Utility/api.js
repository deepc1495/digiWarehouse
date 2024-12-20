import request from "./request";

export const getTab = () => request.get(`/`);
export const getExplore = () => request.get(`/explore`);
export const getWareHouseList = (url) => request.get(`/warehouse${url}`);
// export const AddToDonate = (e) => request.post('kiosk/add-to-cart-new' + e);