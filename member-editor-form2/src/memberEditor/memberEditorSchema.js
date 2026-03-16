import { z } from "zod";

export const memberEditorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .nonempty({ message: "Name is required" }),
  job: z.string().nonempty({ message: "Job is required" }),
});
