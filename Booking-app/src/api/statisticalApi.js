import { ENDPOINT } from "../utils/constants"
import axiosClient from "./axiosClient"

const statisticalApi = {
    create: (data) => {
        return axiosClient.post(ENDPOINT.statistical, data);
    },
    delete: (id) => {
        return axiosClient.delete(`${ENDPOINT.statistical}/${id}`);
    },
    update: (id, value) => {
        return axiosClient.patch(`${ENDPOINT.statistical}/${id}`, value);
    },
    getStatisticalByRoom: (id_room) => {
        return axiosClient.get(`${ENDPOINT.statistical}/${id_room}`);
    },
    getAll: () => {
        return axiosClient.get(ENDPOINT.statistical);
    },
    confirmOtp: (statis_id, otp) => {
        return axiosClient.patch(`${ENDPOINT.statistical}/confirm/${statis_id}/${otp}`);
    }
}

export default statisticalApi;