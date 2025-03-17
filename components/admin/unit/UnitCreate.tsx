import React from "react";
import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="title" label="Title" />
        <TextInput
          validate={[required()]}
          source="description"
          label="Description"
        />
        <ReferenceInput source="courseId" reference="courses" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export default UnitCreate;
