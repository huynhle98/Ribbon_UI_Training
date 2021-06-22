class Response {

    constructor(status, data) {
        this.status = status;
        this.data = data;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getName() {
        return this.data;
    }
    setName(data) {
        this.data = data
    }
}

module.exports.ResponseModel = Response;