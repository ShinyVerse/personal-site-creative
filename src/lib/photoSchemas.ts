import { z } from "zod";

// from contentful

export const AssetSchema = z.object({
  fields: z.object({
    file: z.object({
      url: z.string(),
    }),
  }),
});

export const PhotoEntrySchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  fields: z.object({
    title: z.string(),
    image: AssetSchema,
    description: z.object({
      content: z.array(
        z.object({
          content: z.array(
            z.object({
              value: z.string().optional(),
            }),
          ),
        }),
      ),
    }),
    altText: z.string(),
  }),
});

export type PhotoEntry = z.infer<typeof PhotoEntrySchema>;

export const PhotoEntriesSchema = z.array(PhotoEntrySchema);

// C TS types here:

// export type ImageFields = z.infer<typeof ImageFieldsSchema>;
export type Asset = z.infer<typeof AssetSchema>;
// export type PhotoEntry = z.infer<typeof PhotoEntrySchema>;
export type PhotoEntries = z.infer<typeof PhotoEntriesSchema>;
