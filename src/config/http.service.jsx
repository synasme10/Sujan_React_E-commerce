import axiosInstance from "./axios.config"

//get() , post(), put(), patch (),delete() method 
//post put patch le form ko throw data line ho 
//get delete le data url ko through linxa 
//repo repogitory pattern
class HttpService {
    //varaibles
    #headers;

    getHeaders = (config) => {
        if (config && config.auth) {

            //todo: login token
            let token = null;
            this.#headers = {
                ...this.#headers,
                "Authorization": "Bearer" + token
            }
        }

        if (config && config.file) {
            this.#headers = {
                ...this.#headers,
                "Content-Type": "multipart/form-data"
            }
        }
    }

    getRequest = async (url, config = null) => {
        try {
            this.getHeaders(config)
            const response = await axiosInstance.get(url, {
                headers: {
                    ...this.#headers
                }
            })
            return response;
        }
        catch (exception) {
            throw exception
        }
    }

    postRequest = async (url, data = null, config = null) => {

        try {

            //axios ko through post request banako url data header are parameters
            this.getHeaders(config)
            const response = await axiosInstance.post(url, data, {
                headers: {
                    // "Content-Type":"application/x-www-form-urlencoded"
                    ...this.#headers
                }
            })

            // console.log({response})

            return response;
        }

        //TODO: cleanup

        catch (exception) {
            throw exception
        }
    }

    putRequest = async (url, data = null, config = null) => {

    }

    deleteRequest = async (url, confil = null) => {

    }


}


export default HttpService;