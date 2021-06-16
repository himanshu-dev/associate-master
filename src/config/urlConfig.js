import {Config} from "./config";

export const baseUrl = Config.API_URL

export const urls = {
    list: baseUrl + '',
    add: baseUrl + '',
    update: baseUrl + '',
    delete: baseUrl + '/delete/',
    details: baseUrl + '/details/',
};
