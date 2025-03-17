import React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
} from "react-admin";

const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={[required()]} source="text" label="Text" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <BooleanInput source="correct" label="Correct" />
        <TextInput source="imageSrc" label="Image Source" />
        <TextInput source="audioSrc" label="Audio Source" />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengeOptionEdit;
