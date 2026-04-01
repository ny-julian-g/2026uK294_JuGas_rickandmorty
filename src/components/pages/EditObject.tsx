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
      ServerService.getCharacterById(id)
        .then(setInitialData)
        .catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (values: any) => {
    if (!id || !initialData) return;

    const finalData = {
      name: values.name.trim() !== "" ? values.name : initialData.name,
      image: values.image.trim() !== "" ? values.image : initialData.image,
    };

    try {
      await ServerService.updateCharacterById(id, finalData);
      alert("Erfolgreich aktualisiert!");
      navigate("/characters");
    } catch (error) {
      console.error("Update fehlgeschlagen", error);
    }
  };

  if (!initialData) return <p>Lade Daten...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Objekt bearbeiten</h1>
      <p>ID: {id}</p>

      <Formik
        initialValues={{
          name: initialData.name,
          image: initialData.image,
        }}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Name (leer lassen zum Beibehalten):</label><br />
            <Field name="name" placeholder={initialData.name} />
          </div>
          <br />
          <div>
            <label>Bild URL (leer lassen zum Beibehalten):</label><br />
            <Field name="image" placeholder="http://..." />
          </div>
          <br />
          <button type="submit">Speichern</button>
          <button type="button" onClick={() => navigate(-1)}>Abbrechen</button>
        </Form>
      </Formik>
    </div>
  );
}

export default EditObject;