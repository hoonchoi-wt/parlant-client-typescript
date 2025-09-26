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
exports.makeRequest = void 0;
const makeRequest = (axiosInstance, url, method, headers, requestBody, timeoutMs, abortSignal, withCredentials, duplex, responseType) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        url,
        method,
        headers,
        data: requestBody,
        withCredentials: withCredentials || false,
    };

    // Add timeout if specified
    if (timeoutMs != null) {
        config.timeout = timeoutMs;
    }

    // Add abort signal if provided
    if (abortSignal != null) {
        config.signal = abortSignal;
    }

    // Handle response type based on what's requested
    if (duplex) {
        config.responseType = 'stream';
    } else if (responseType === 'blob') {
        config.responseType = 'blob';
    } else if (responseType === 'arrayBuffer') {
        config.responseType = 'arraybuffer';
    } else if (responseType === 'text') {
        config.responseType = 'text';
    }
    // Default to json which axios handles automatically

    const response = yield axiosInstance.request(config);
    return response;
});
exports.makeRequest = makeRequest;