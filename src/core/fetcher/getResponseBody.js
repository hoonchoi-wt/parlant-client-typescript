"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseBody = getResponseBody;
const chooseStreamWrapper_1 = require("./stream-wrappers/chooseStreamWrapper");
function getResponseBody(response, responseType) {
    return __awaiter(this, void 0, void 0, function* () {
        // Axios response has data property that contains the response body
        const data = response.data;

        if (responseType === "blob") {
            // For blob response type, axios should be configured with responseType: 'blob'
            // If it's not a Blob, convert it
            if (data instanceof Blob) {
                return data;
            }
            return new Blob([data]);
        }
        else if (responseType === "arrayBuffer") {
            // For arrayBuffer response type, axios should be configured with responseType: 'arraybuffer'
            if (data instanceof ArrayBuffer) {
                return data;
            }
            // Convert if needed
            if (typeof data === 'string') {
                const encoder = new TextEncoder();
                return encoder.encode(data).buffer;
            }
            return data;
        }
        else if (responseType === "sse") {
            // For SSE, return the data stream
            return data;
        }
        else if (responseType === "streaming") {
            // For streaming responses
            if (data && typeof data.pipe === 'function') {
                return (0, chooseStreamWrapper_1.chooseStreamWrapper)(data);
            }
            return data;
        }
        else if (responseType === "text") {
            // Return text data
            if (typeof data === 'string') {
                return data;
            }
            return JSON.stringify(data);
        }
        else {
            // Default to JSON
            if (typeof data === 'string') {
                if (data.length > 0) {
                    try {
                        let responseBody = JSON.parse(data);
                        return responseBody;
                    }
                    catch (err) {
                        return {
                            ok: false,
                            error: {
                                reason: "non-json",
                                statusCode: response.status,
                                rawBody: data,
                            },
                        };
                    }
                }
                else {
                    return undefined;
                }
            }
            // If data is already an object, return it directly
            return data;
        }
    });
}