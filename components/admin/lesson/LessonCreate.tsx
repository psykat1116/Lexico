import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  NumberInput,
} from "react-admin";

const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="title" label="Title" />
        <ReferenceInput source="unitId" reference="units" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export default LessonCreate;
