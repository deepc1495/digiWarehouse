import request from "./request";

export const loginApi =(data)=> request.loginReq('https://ime.dubaicustoms.network/api/mobile-login/',data)

export const getTab = () => request.get(`/`);
export const getExplore = () => request.get(`/explore`);
export const getWareHouseList = (url) => request.get(`/warehouse${url}`);
export const getWareHouseDetails = (id) => request.get(`/warehouse-details/${id}`);

// export const AddToDonate = (e) => request.post('kiosk/add-to-cart-new' + e);