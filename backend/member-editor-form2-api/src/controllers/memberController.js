// src/controllers/memberController.js
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from "../services/memberService.js";

// GET /api/members
export async function listMembers(req, res) {
  try {
    const members = await getAllMembers();
    res.send(members);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

// GET /api/members/:id
export async function getMember(req, res) {
  try {
    const id = Number(req.params.id);
    const member = await getMemberById(id);

    if (!member) {
      return res.status(404).send("Member not found");
    }

    res.send(member);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

// POST /api/members
export async function createMemberHandler(req, res) {
  try {
    const { name, company } = req.body;

    if (!name || name.length < 3) {
      return res
        .status(400)
        .send("Name is required and must be at least 3 characters");
    }
    if (!company || !company.name) {
      return res.status(400).send("Company name is required");
    }

    const newMember = await createMember({
      name,
      companyName: company.name,
    });

    res.status(201).send(newMember);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

// PUT /api/members/:id
export async function updateMemberHandler(req, res) {
  try {
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

    const updated = await updateMember(id, {
      name,
      companyName: company.name,
    });

    if (!updated) {
      return res.status(404).send("Member not found");
    }

    res.send(updated);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

// DELETE /api/members/:id
export async function deleteMemberHandler(req, res) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteMember(id);

    if (!deleted) {
      return res.status(404).send("Member not found");
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
