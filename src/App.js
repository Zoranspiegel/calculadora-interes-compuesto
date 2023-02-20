import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Balance from "./components/Balance";

const compoundInterests = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }
  return Math.round(total);
};

function App() {
  const [balance, setBalance] = useState('');
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterests(Number(deposit), Number(contribution), Number(years), Number(rate));
    setBalance(val)
  }
  return (
    <Container >
      <Section>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            years: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required("Campo obligatorio")
              .typeError("Debe ser un número")
              .min(0, "El valor mínimo debe ser 0"),
            contribution: Yup.number()
              .required("Campo obligatorio")
              .typeError("Debe ser un número")
              .min(0, "El valor mínimo debe ser 0"),
            years: Yup.number()
              .required("Campo obligatorio")
              .typeError("Debe ser un número")
              .min(0, "El valor mínimo debe ser 0"),
            rate: Yup.number()
              .required("Campo obligatorio")
              .typeError("Debe ser un número")
              .min(0, "El valor mínimo debe ser 0")
              .max(1, "Debe ser un número entre 0 y 1"),
          })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial" />
            <Input name="contribution" label="Contribución Anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés Estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance Final: {balance.toLocaleString('en-US', { currency: 'USD', style: 'currency' })}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
