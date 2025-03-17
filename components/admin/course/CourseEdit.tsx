import { SimpleForm, TextInput, required, Edit } from "react-admin";

const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={[required()]} source="id" label="ID" />
        <TextInput validate={[required()]} source="title" label="Title" />
        <TextInput validate={[required()]} source="imageSrc" label="Image" />
      </SimpleForm>
    </Edit>
  );
};

export default CourseEdit;
