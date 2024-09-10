class JsonifyError extends Error {
    constructor(message: string = "Jsonify Error") {
        super(message);
    }
}

export default JsonifyError;