import fs from "fs/promises";
import fsexist from "fs";
import path from "path";

export const deleteImageFromPublicFolder = async (fullPath: string): Promise<void> => {
    try {
        await fs.unlink(fullPath);
        console.log("File deleted:", fullPath);
    } catch (err: any) {
        console.error("Error deleting file:", err.message);
    }
};

export const deleteProfileIfExist = async (imageBase: string) => {
    const fullPath = path.join(__dirname, "..", "..", imageBase);
    let exist = fsexist.existsSync(fullPath);
    console.log("fullpath odfhfksdfh ", fullPath)
    if (exist) {
        console.log("pohoch gaya delete tak")
        await deleteImageFromPublicFolder(fullPath);
    }
}