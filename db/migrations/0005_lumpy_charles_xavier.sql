ALTER TABLE "category" RENAME COLUMN "updateBy" TO "updatedBy";--> statement-breakpoint
ALTER TABLE "category" DROP CONSTRAINT "category_updateBy_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_updatedBy_user_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
