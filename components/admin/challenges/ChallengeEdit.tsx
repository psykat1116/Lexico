import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const ChallengeEdit = () => {
  return (
    <Edit>
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
    </Edit>
  );
};

export default ChallengeEdit;
