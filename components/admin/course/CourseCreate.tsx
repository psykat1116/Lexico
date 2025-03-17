import React from "react";
import { SimpleForm, Create, TextInput, required } from "react-admin";

const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="title" label="Title" />
        <TextInput validate={[required()]} source="imageSrc" label="Image" />
      </SimpleForm>
    </Create>
  );
};

export default CourseCreate;
