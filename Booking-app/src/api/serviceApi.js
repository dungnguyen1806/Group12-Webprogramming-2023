import { ENDPOINT } from "../utils/constants"
import axiosClient from "./axiosClient"

const serviceApi = {
    create: (data) => {
        return axiosClient.post(ENDPOINT.services, data);
    },
    update: (id, data) => {
        return axiosClient.patch(`${ENDPOINT.services}/${id}`, data);
    },
    delete: (id) => {
        return axiosClient.delete(`${ENDPOINT.services}/${id}`);
    },
    getServiceByRoom: (id_room) => {
        return axiosClient.get(`${ENDPOINT.services}/${id_room}`);
    },
    getAll: () => {
        return axiosClient.get(ENDPOINT.services);
    },
    getById: (id) => {
        return axiosClient.get(`${ENDPOINT.services}/item/${id}`);
    }
}

export default serviceApi;