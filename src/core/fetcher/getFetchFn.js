"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFetchFn = getFetchFn;
const axios_1 = __importDefault(require("axios"));
/**
 * Returns an axios instance
 * Axios works isomorphically in both browser and Node.js environments
 */
function getFetchFn() {
    return axios_1.default.create();
}