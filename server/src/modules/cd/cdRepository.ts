import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Cd = {
  id: number;
  band_name: string;
  album_name: string;
  release_year: number;
  cover: string;
};

class CdRepository {
  // CREATE - Ajouter un cd
  async create(cds: Omit<Cds, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO cds (band_name, album_name, release_year, cover) VALUES (?, ?, ?, ?)",
      [cd.band_name, cd.album_name, cd.release_year, cd.cover],
    );
    return result.insertId;
  }

  //READ ALL Récupérer tous les cds
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * from cds");
    return rows as cds[];
  }

  // UPDATE - Modifier un CD existant

  async update(cds: cd) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE cds SET band_name = ?, album_name = ?, release_year = ?, cover = ? WHERE id = ?",
      [
        updatedCds.band_name,
        updatedCds.album_name,
        updatedCds.release_year,
        updatedCds.cover,
        id,
      ],
    );
    return result.affectedRows;
  }

  //DELETE - Supprimer un cd
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM cds WHERE id=?",
      [id],
    );
    return result.affectedRows;
  }
}
export default new CdRepository();
