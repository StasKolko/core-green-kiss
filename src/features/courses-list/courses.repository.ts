import { db } from "@/shared/lib/db";
import { CourseTable } from "@/../db/schema";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

class CoursesRepository {
  getCoursesList = cache(async (): Promise<CourseListElement[]> => {
    return db.query.CourseTable.findMany();
  });

  createCourseElement = async (
    command: CreateCourseListElementCommand,
  ): Promise<void> => {
    await db.insert(CourseTable).values({
      id: createId(),
      name: command.name,
      description: command.description,
    });
  };

  deleteCourseElement = async (
    command: DeleteCourseListElementCommand,
  ): Promise<void> => {
    await db.delete(CourseTable).where(eq(CourseTable.id, command.id));
  };
}

export const coursesRepository = new CoursesRepository();
