// src/routes/memberRoutes.js
import { Router } from "express";
import {
  listMembers,
  getMember,
  createMemberHandler,
  updateMemberHandler,
  deleteMemberHandler,
} from "../controllers/memberController.js";

const router = Router();

router.get("/members", listMembers);
router.get("/members/:id", getMember);
router.post("/members", createMemberHandler);
router.put("/members/:id", updateMemberHandler);
router.delete("/members/:id", deleteMemberHandler);

export default router;
