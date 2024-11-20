import http from "../http-common.js";

class HttpService{
    get(fileName,path=""){
        return http.get(`${path}/${fileName}`);
    }
}

export default new HttpService();