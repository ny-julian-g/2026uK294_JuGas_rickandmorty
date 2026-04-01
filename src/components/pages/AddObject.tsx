import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { ServerService } from "../../service/ServerService";

function AddObject() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Neuen Charakter erstellen</h1>
      <Formik
        initialValues={{
          name: "",
          status: "Alive",
          species: "",
          gender: "unknown",
          image: "",
        }}
        onSubmit={async (values) => {
          try {
            await ServerService.createCharacter(values);
            navigate("/characters");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
          }}
        >
          <label>Name:</label>
          <Field name="name" placeholder="Name" required />

          <label>Status:</label>
          <Field as="select" name="status">
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Field>

          <label>Species:</label>
          <Field name="species" placeholder="Human, Alien..." />

          <label>Gender:</label>
          <Field as="select" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </Field>

          <label>Image URL:</label>
          <Field name="image" placeholder="URL" />

          <button type="submit" style={{ marginTop: "10px" }}>
            Create
          </button>
          <button type="button" onClick={() => navigate("/characters")}>
            Cancel
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default AddObject;
