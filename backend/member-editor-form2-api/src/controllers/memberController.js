// src/controllers/memberController.js
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from "../services/memberService.js";

export function listMembers(req, res) {
  const members = getAllMembers();
  res.send(members);
}

export function getMember(req, res) {
  const id = Number(req.params.id);
  const member = getMemberById(id);
  if (!member) {
    return res.status(404).send("Member not found");
  }
  res.send(member);
}

export function createMemberHandler(req, res) {
  const { name, company } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .send("Name is required and must be at least 3 characters");
  }
  if (!company || !company.name) {
    return res.status(400).send("Company name is required");
  }

  const newMember = createMember({ name, companyName: company.name });
  res.status(201).send(newMember);
}

export function updateMemberHandler(req, res) {
  const id = Number(req.params.id);
  const { name, company } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .send("Name is required and must be at least 3 characters");
  }
  if (!company || !company.name) {
    return res.status(400).send("Company name is required");
  }

  const updated = updateMember(id, { name, companyName: company.name });
  if (!updated) {
    return res.status(404).send("Member not found");
  }
  res.send(updated);
}

export function deleteMemberHandler(req, res) {
  const id = Number(req.params.id);
  const deleted = deleteMember(id);
  if (!deleted) {
    return res.status(404).send("Member not found");
  }
  res.status(204).send();
}
