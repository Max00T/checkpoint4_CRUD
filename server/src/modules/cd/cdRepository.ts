import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Cd = {
  id: number | null;
  band_name: string;
  album_name: string;
  release_year: number;
  cover?: string;
};

class CdRepository {
  async create(cd: Omit<Cd, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO cds (band_name, album_name, release_year, cover) VALUES (?, ?, ?, ?)",
      [cd.band_name, cd.album_name, cd.release_year, cd.cover || null],
    );
    return result.insertId;
  }

  //READ ALL Récupérer tous les cds
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      // "SELECT * from cds ORDER BY band_name ASC, release_year ASC;",
      "SELECT * FROM cds LEFT JOIN reviews ON cds.id = reviews.cd_id ORDER BY band_name ASC, release_year ASC",
    );
    // return rows as cds[];
    return rows as Cd[];
  }

  //lecture d’un CD par son ID
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM cds WHERE id = ?",
      [id]
    );
    return rows[0] as Cd | undefined;
  }

  // UPDATE - Modifier un CD existant
    async update(id: number, updatedCd: Cd){
    const [result] = await databaseClient.query<Result>(
      "UPDATE cds SET band_name = ?, album_name = ?, release_year = ?, cover = ? WHERE id = ?",
      [
        updatedCd.band_name,
        updatedCd.album_name,
        updatedCd.release_year,
        updatedCd.cover,
        id,
      ],
    );
    return result.affectedRows;
  }

  //DELETE - Supprimer un cd
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM cds WHERE id=?;",

      [id],
    );
    return result.affectedRows;
  }
  async addReview(cdId: number, rating: number, review_text: string) {
    await databaseClient.query(
      "INSERT INTO reviews (cd_id, rating, review_text) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating), review_text = VALUES(review_text)",
      [cdId, rating, review_text],
    );
  }

  async updateReview(cdId: number, rating: number, review_text: string) {
    await databaseClient.query(
      "UPDATE reviews SET rating = ?, review_text = ? WHERE cd_id = ?",
      [rating, review_text, cdId],
    );
  }
}

export default new CdRepository();
