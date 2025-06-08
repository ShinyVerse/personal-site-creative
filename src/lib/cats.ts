import { z } from "zod";

export const CatSchema = z.object({
  breed: z.string(),
  country: z.string(),
  origin: z.string(),
  coat: z.string(),
  pattern: z.string(),
});

export const BreedCollectionSchema = z.array(CatSchema);
