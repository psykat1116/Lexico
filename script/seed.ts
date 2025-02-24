import "dotenv/config";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/image/es.svg",
      },
      {
        id: 2,
        title: "French",
        imageSrc: "/image/fr.svg",
      },
      {
        id: 3,
        title: "Croatian",
        imageSrc: "/image/hr.svg",
      },
      {
        id: 4,
        title: "Italian",
        imageSrc: "/image/it.svg",
      },
      {
        id: 5,
        title: "Japanese",
        imageSrc: "/image/jp.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 {Learn Basics}
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 {Learn Basics}
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, // Unit 1 {Learn Basics}
        order: 3,
        title: "Adverbs",
      },
      {
        id: 4,
        unitId: 1, // Unit 1 {Learn Basics}
        order: 4,
        title: "Adjectives",
      },
      {
        id: 5,
        unitId: 1, // Unit 1 {Learn Basics}
        order: 5,
        title: "Pronouns",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "The Man"',
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: '"The Man"',
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "The Robot"',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/image/man.svg",
        correct: true,
        text: "El Hombre",
        audioSrc: "/sound//es_man.mp3",
      },
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/image/woman.svg",
        correct: false,
        text: "La Mujer",
        audioSrc: "/sound/es_woman.mp3",
      },
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/image/robot.svg",
        correct: false,
        text: "El Robot",
        audioSrc: "/sound/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, //"the man"?
        correct: true,
        text: "El Hombre",
        audioSrc: "/sound//es_man.mp3",
      },
      {
        challengeId: 2, //"the man"?
        correct: false,
        text: "La Mujer",
        audioSrc: "/sound/es_woman.mp3",
      },
      {
        challengeId: 2, //"the man"?
        correct: false,
        text: "El Robot",
        audioSrc: "/sound/es_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Which one of these is "the robot"?
        imageSrc: "/image/man.svg",
        correct: false,
        text: "El Hombre",
        audioSrc: "/sound//es_man.mp3",
      },
      {
        challengeId: 3, // Which one of these is "the robot"?
        imageSrc: "/image/woman.svg",
        correct: false,
        text: "La Mujer",
        audioSrc: "/sound/es_woman.mp3",
      },
      {
        challengeId: 3, // Which one of these is "the robot"?
        imageSrc: "/image/robot.svg",
        correct: true,
        text: "El Robot",
        audioSrc: "/sound/es_robot.mp3",
      },
    ]);

    console.log("Seeding Finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
