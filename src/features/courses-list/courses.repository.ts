import { db } from "@/shared/lib/db";
import { eq } from "drizzle-orm";
import { CourseTable } from "@/../db/schema";
import { cache } from "react";

class CoursesRepository {
  getCoursesList = cache(async (): Promise<CourseListElement[]> => {
    return db.query.CourseTable.findMany();
  });

  createCourseElement = async (
    command: CreateCourseListElementCommand,
  ): Promise<void> => {
    await db
      .insert(CourseTable)
      .values({
        ...command,
      })
      .returning({
        id: CourseTable.id,
        name: CourseTable.name,
        description: CourseTable.description,
      });
  };

  deleteCourseElement = async (
    command: DeleteCourseListElementCommand,
  ): Promise<void> => {
    await db.delete(CourseTable).where(eq(CourseTable.id, command.id));
  };
}

export const coursesRepository = new CoursesRepository();
