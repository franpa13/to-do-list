import { DB } from "../db/db";
import { formatDateToSQLite } from "../utils/formatData";

export const deleteTask = async (id: string): Promise<boolean> => {
    const now = formatDateToSQLite(new Date());

    return new Promise((resolve, reject) => {
        DB.run(
            `UPDATE tasks SET deletedAt = ?, updatedAt = ? WHERE id = ? AND deletedAt IS NULL`,
            [now, now, id],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
};