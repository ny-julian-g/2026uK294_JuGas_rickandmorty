import { Grid } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ServerService } from "../../service/ServerService";
import { useNavigate } from "react-router-dom";

interface LogInProps {
  onLogin: () => void;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

function LogIn({ onLogin }: LogInProps) {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const response = await ServerService.login(values);
      const token = response.accessToken || response.token;

      if (token) {
        localStorage.setItem("token", token);
        onLogin();
        navigate("/characters");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "50vh" }}
    >
      <Grid size={4} style={{ textAlign: "center" }}>
        <h1>Log In</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <br />
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" />
              </div>
              <br />
              <button type="submit">
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default LogIn;