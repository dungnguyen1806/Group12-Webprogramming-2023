import { ENDPOINT } from "../utils/constants"
import axiosClient from "./axiosClient"

const destinationApi = {
    create: (data) => {
        return axiosClient.post(ENDPOINT.destinations, data);
    },
    update: (id,data) => {
        return axiosClient.patch(`${ENDPOINT.destinations}/${id}`, data);
    },
    delete: (id) => {
        return axiosClient.delete(`${ENDPOINT.destinations}/${id}`);
    },
    getAll: () => {
        return axiosClient.get(ENDPOINT.destinations);
    }
}

export default destinationApi;