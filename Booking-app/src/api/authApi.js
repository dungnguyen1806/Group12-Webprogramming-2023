import { ENDPOINT } from "../utils/constants"
import axiosClient from "./axiosClient"

const authApi = {
    login: (data) => {
        return axiosClient.post(ENDPOINT.authAdmin.login, data);
    },
    register: (data) => {
        return axiosClient.post(ENDPOINT.authAdmin.register, data);
    },
    getAll: () => {
        return axiosClient.get(ENDPOINT.authAdmin.gettAll);
    },
    delete: (id) => {
        return axiosClient.delete(`${ENDPOINT.authAdmin.gettAll}/${id}`);
    },
    getById: (id) => {
        return axiosClient.get(`${ENDPOINT.authAdmin.gettAll}/${id}`);
    },
    update: (id, value) => {
        return axiosClient.patch(`${ENDPOINT.authAdmin.gettAll}/${id}`, value);
    }
}

export default authApi;