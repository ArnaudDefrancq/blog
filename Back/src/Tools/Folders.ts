import path from "path";
import * as fs from "fs/promises"

export class Folders {
    private static async folderExists(folderPath: string): Promise<boolean> {
        try {
            await fs.access(folderPath);
            return true;
        } catch {
            return false;
        }
    }

    public static async createFolder(id: string) {
        try {
            const postFolder = path.join(__dirname, '../../Images/imgPost', id);
            if (!(await Folders.folderExists(postFolder))) {
                await fs.mkdir(postFolder, { recursive: true });
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public static async deleteAllFolders(id: string): Promise<boolean> {
        try {
            const postFolder = path.join(__dirname, '../../Images/imgPost', id);

            if ((await Folders.folderExists(postFolder))) {
                await fs.rm(postFolder, { recursive: true })
            }
            return true;

        } catch (error) {
            console.error('Erreur lors de la suppression des dossiers | ' + error);
            return false;
        }
    }

    public static async deleteFolder(id: string, nameFile: string): Promise<boolean> {
        try {
            const postFolder = path.join(__dirname, '../../Images/imgPost', id, nameFile);

            if (await Folders.folderExists(postFolder)) {
                await fs.rm(postFolder, { recursive: true });
            }
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression des dossiers | ' + error);
            return false;
        }
    }
}