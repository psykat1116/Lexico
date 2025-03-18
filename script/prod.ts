import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Spanish", imageSrc: "/image/es.svg" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el hombre",
                  imageSrc: "/image/man.svg",
                  audioSrc: "/sound/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/image/woman.svg",
                  audioSrc: "/sound/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/image/boy.svg",
                  audioSrc: "/sound/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la mujer",
                  imageSrc: "/image/woman.svg",
                  audioSrc: "/sound/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/image/boy.svg",
                  audioSrc: "/sound/es_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/image/man.svg",
                  audioSrc: "/sound/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/image/woman.svg",
                  audioSrc: "/sound/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/image/man.svg",
                  audioSrc: "/sound/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el chico",
                  imageSrc: "/image/boy.svg",
                  audioSrc: "/sound/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audioSrc: "/sound/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el hombre",
                  audioSrc: "/sound/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  audioSrc: "/sound/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/image/man.svg",
                  audioSrc: "/sound/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/image/woman.svg",
                  audioSrc: "/sound/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el zombie",
                  imageSrc: "/image/zombie.svg",
                  audioSrc: "/sound/es_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el robot",
                  imageSrc: "/image/robot.svg",
                  audioSrc: "/sound/es_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el zombie",
                  imageSrc: "/image/zombie.svg",
                  audioSrc: "/sound/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/image/boy.svg",
                  audioSrc: "/sound/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la nina",
                  imageSrc: "/image/girl.svg",
                  audioSrc: "/sound/es_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el zombie",
                  imageSrc: "/image/zombie.svg",
                  audioSrc: "/sound/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/image/man.svg",
                  audioSrc: "/sound/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audioSrc: "/sound/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el zombie",
                  audioSrc: "/sound/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  audioSrc: "/sound/es_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
