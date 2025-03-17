"use client";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import CourseList from "@/components/admin/course/CourseList";
import CourseEdit from "@/components/admin/course/CourseEdit";
import CourseCreate from "@/components/admin/course/CourseCreate";

import UnitList from "@/components/admin/unit/UnitList";
import UnitEdit from "@/components/admin/unit/UnitEdit";
import UnitCreate from "@/components/admin/unit/UnitCreate";

import LessonList from "@/components/admin/lesson/LessonList";
import LessonEdit from "@/components/admin/lesson/LessonEdit";
import LessonCreate from "@/components/admin/lesson/LessonCreate";

import ChallengeEdit from "@/components/admin/challenges/ChallengeEdit";
import ChallengeList from "@/components/admin/challenges/ChallengeList";
import ChallengeCreate from "@/components/admin/challenges/ChallengeCreate";

import ChallengeOptionList from "@/components/admin/challengeOptions/ChallengeOptionList";
import ChallengeOptionEdit from "@/components/admin/challengeOptions/ChallengeOptionEdit";
import ChallengeOptionCreate from "@/components/admin/challengeOptions/ChallengeOptionCreate";

const dataProvider = simpleRestProvider("/api");

const MainAdmin = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        options={{ label: "Courses" }}
      />
      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        options={{ label: "Units" }}
      />
      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        options={{ label: "Lessons" }}
      />
      <Resource
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        options={{ label: "Challenges" }}
      />
      <Resource
        name="challengesOption"
        recordRepresentation="question"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  );
};

export default MainAdmin;
