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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileIfExist = exports.deleteImageFromPublicFolder = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteImageFromPublicFolder = (fullPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises_1.default.unlink(fullPath);
        console.log("File deleted:", fullPath);
    }
    catch (err) {
        console.error("Error deleting file:", err.message);
    }
});
exports.deleteImageFromPublicFolder = deleteImageFromPublicFolder;
const deleteProfileIfExist = (imageBase) => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = path_1.default.join(__dirname, "..", "..", imageBase);
    let exist = fs_1.default.existsSync(fullPath);
    console.log("fullpath odfhfksdfh ", fullPath);
    if (exist) {
        console.log("pohoch gaya delete tak");
        yield (0, exports.deleteImageFromPublicFolder)(fullPath);
    }
});
exports.deleteProfileIfExist = deleteProfileIfExist;
