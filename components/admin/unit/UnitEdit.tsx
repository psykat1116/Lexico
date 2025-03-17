import React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput validate={[required()]} source="id" label="ID" />
        <TextInput validate={[required()]} source="title" label="Title" />
        <TextInput
          validate={[required()]}
          source="description"
          label="Description"
        />
        <ReferenceInput source="courseId" reference="courses" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};

export default UnitEdit;
