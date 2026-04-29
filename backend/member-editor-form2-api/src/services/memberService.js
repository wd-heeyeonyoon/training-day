// src/services/memberService.js
import pool from "../../db.js";

export async function getAllMembers() {
  const result = await pool.query(
    "SELECT id, name, company_name AS companyName FROM members ORDER BY id",
  );
  return result.rows;
}

export async function getMemberById(id) {
  const result = await pool.query(
    "SELECT id, name, company_name AS companyName FROM members WHERE id = $1",
    [id],
  );
  return result.rows[0] || null;
}

export async function createMember({ name, companyName }) {
  const result = await pool.query(
    `INSERT INTO members (name, company_name)
     VALUES ($1, $2)
     RETURNING id, name, company_name AS companyName`,
    [name, companyName],
  );
  return result.rows[0];
}

export async function updateMember(id, { name, companyName }) {
  const result = await pool.query(
    `UPDATE members
     SET name = $1, company_name = $2
     WHERE id = $3
     RETURNING id, name, company_name AS companyName`,
    [name, companyName, id],
  );
  return result.rows[0] || null;
}

export async function deleteMember(id) {
  const result = await pool.query("DELETE FROM members WHERE id = $1", [id]);
  return result.rowCount > 0;
}
