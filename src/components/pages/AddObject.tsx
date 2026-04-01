import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ServerService } from "../../service/ServerService";

function AddObject() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Neuen Charakter erstellen</h1>
        <Formik
          initialValues={{ name: "", image: "" }}
          onSubmit={async (values) => {
            try {
              await ServerService.createCharacter(values);
              navigate("/characters");
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Form>
            <Field name="name" placeholder="Name" required />
            <br />
            <br />
            <Field name="image" placeholder="Bild-URL (https://...)" required />
            <br />
            <br />
            <button type="submit">Erstellen</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
export default AddObject;
