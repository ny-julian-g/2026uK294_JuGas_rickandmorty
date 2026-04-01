import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { ServerService, type RickAndMortyChar } from "../../service/ServerService";

function EditObject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<RickAndMortyChar | null>(null);

  useEffect(() => {
    if (id) {
      ServerService.getCharacterById(id).then(setInitialData).catch(console.error);
    }
  }, [id]);

  if (!initialData) return <p>Lade Daten...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Objekt bearbeiten</h1>
      <Formik
        initialValues={{
          name: initialData.name,
          status: initialData.status || "unknown",
          species: initialData.species || "",
          gender: initialData.gender || "unknown",
          image: initialData.image,
        }}
        enableReinitialize={true}
        onSubmit={async (values) => {
          try {
            await ServerService.updateCharacterById(id!, values);
            navigate("/characters");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
          <label>Name:</label>
          <Field name="name" />

          <label>Status:</label>
          <Field as="select" name="status">
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Field>

          <label>Species:</label>
          <Field name="species" />

          <label>Gender:</label>
          <Field as="select" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </Field>

          <label>Image URL:</label>
          <Field name="image" />

          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </Form>
      </Formik>
    </div>
  );
}
export default EditObject;