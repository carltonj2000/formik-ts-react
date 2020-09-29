import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CheckboxProps,
  FormGroup,
  Button,
  Box,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";

import { object, string, number, boolean, array, mixed } from "yup";

const initialValues = {
  fullName: "",
  initialInvestment: undefined,
  investmentRisk: [],
  commentAboutInvestmentRisk: "",
  dependents: -1,
  acceptedTermsAndConditions: false,
};

function App() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">New Account</Typography>
          <Formik
            validationSchema={object({
              fullName: string()
                .required("Your name is mandatory!!!")
                .min(2)
                .max(100),
              initialInvestment: number().required().min(100),
              dependents: number().required().min(0).max(5),
              acceptedTermsAndConditions: boolean().oneOf([true]),
              investmentRisk: array(
                string().oneOf(["High", "Medium", "Low"])
              ).min(1),
              commentAboutInvestmentRisk: mixed().when("investmentRisk", {
                is: (investmentRisk) => investmentRisk.includes("High"),
                then: string().required().min(20).max(100),
                otherwise: string().min(20).max(100),
              }),
            })}
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              console.log(values);
              console.log(formikHelpers);
              return new Promise((resolve) => setTimeout(resolve, 1000));
            }}
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Form>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field name="fullName" as={TextField} label="Full Name" />
                    <ErrorMessage name="fullName" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="initialInvestment"
                      type="number"
                      as={TextField}
                      label="Initial Investment"
                    />
                    <ErrorMessage name="initialInvestment" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <CheckBox
                      name="investmentRisk"
                      value="High"
                      label="High Risk"
                    />
                    <CheckBox
                      name="investmentRisk"
                      value="Medium"
                      label="Medium Risk"
                    />
                    <CheckBox name="investmentRisk" value="Low" label="Safe" />
                    <ErrorMessage name="investmentRisk" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="commentAboutInvestmentRisk"
                      as={TextField}
                      multiline
                      rows={4}
                      label="Comment About Investment Risk"
                    />
                    <ErrorMessage name="commentAboutInvestmentRisk" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="dependents"
                      label="dependents"
                      as={TextField}
                      select
                    >
                      <MenuItem value={-1}>Select ...</MenuItem>
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Field>
                    <ErrorMessage name="dependents" />
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <CheckBox
                      name="acceptedTermsAndConditions"
                      label="Accept Terms And Conditions"
                    />
                    <ErrorMessage name="acceptedTermsAndConditions" />
                  </FormGroup>
                </Box>
                <Button type="submit" disabled={isSubmitting || isValidating}>
                  Submit
                </Button>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
}

export interface CheckBoxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

function CheckBox(props: CheckBoxProps) {
  const [field] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value,
  });

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label || props.value}
    />
  );
}
export default App;
