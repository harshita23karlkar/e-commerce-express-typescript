import os from "os";

const PORT = process.env.PORT;
export const BASE_URL = `http://${getLocalIp()}:${PORT}`;

export function getLocalIp(): string {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        if (!iface) continue;
        for (const config of iface) {
            if (config.family === "IPv4" && !config.internal) {
                return config.address;
            }
        }
    }
    return "localhost";
}