"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: "public/",
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const baseName = "avatar";
        const dateTime = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `${baseName}_${dateTime}${ext}`;
        cb(null, filename);
    }
});
exports.upload = (0, multer_1.default)({ storage });
