import React from "react";
import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  BooleanInput,
} from "react-admin";

const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="text" label="Text" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <BooleanInput source="correct" label="Correct" />
        <TextInput source="imageSrc" label="Image Source" />
        <TextInput source="audioSrc" label="Audio Source" />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeOptionCreate;
