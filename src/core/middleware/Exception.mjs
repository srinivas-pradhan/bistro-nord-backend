export function Exception(code, name, message, payload) {
    this.isException = true;
    this.code = code || 500;
    this.message = message || 'Not Defined';
    this.name = name || 'Exception';
    this.payload = payload || { };

    this.message = JSON.stringify({
        error: {
            code: this.code,
            type: this.name,
            message: this.message
        },
        data: payload
    });
    
}
