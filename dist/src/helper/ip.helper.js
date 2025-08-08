"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = void 0;
exports.getLocalIp = getLocalIp;
const os_1 = __importDefault(require("os"));
const PORT = process.env.PORT;
exports.BASE_URL = `http://${getLocalIp()}:${PORT}`;
function getLocalIp() {
    const interfaces = os_1.default.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        if (!iface)
            continue;
        for (const config of iface) {
            if (config.family === "IPv4" && !config.internal) {
                return config.address;
            }
        }
    }
    return "localhost";
}
