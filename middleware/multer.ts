import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "public/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = "avatar";
        const dateTime = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `${baseName}_${dateTime}${ext}`;
        cb(null, filename);
    }
});
export const upload = multer({ storage });