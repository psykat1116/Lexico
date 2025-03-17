"use client";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseList from "./course/CourseList";
import CourseCreate from "./course/CourseCreate";
import CourseEdit from "./course/CourseEdit";
import UnitList from "./unit/UnitList";
import UnitCreate from "./unit/UnitCreate";
import UnitEdit from "./unit/UnitEdit";
import LessonList from "./lesson/LessonList";
import LessonCreate from "./lesson/LessonCreate";
import LessonEdit from "./lesson/LessonEdit";
import ChallengeList from "./challenges/ChallengeList";
import ChallengeCreate from "./challenges/ChallengeCreate";
import ChallengeEdit from "./challenges/ChallengeEdit";
import ChallengeOptionCreate from "./challengeOptions/ChallengeOptionCreate";
import ChallengeOptionList from "./challengeOptions/ChallengeOptionList";
import ChallengeOptionEdit from "./challengeOptions/ChallengeOptionEdit";

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
