import React from "react";
import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  NumberInput,
  SelectInput,
} from "react-admin";

const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="question" label="Question" />
        <ReferenceInput source="lesssonId" reference="lessons" />
        <NumberInput source="order" validate={[required()]} label="Order" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
          validate={[required()]}
          label="Type"
        />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeCreate;
