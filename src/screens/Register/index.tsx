import React from "react";
import { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { SelectInput } from "../../components/Forms/SelectInput";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório!"),
  amount: Yup.number()
    .typeError("Informe um valor númerico!")
    .positive("O valor não pode ser negativo!")
    .required("O valor é obrigatório"),
});

export const Register = () => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleTransactionTypeSelect = (type: "up" | "down") => {
    setTransactionType(type);
  };

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  };
  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleRegister = (form: FormData) => {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação!");
    }

    if (category.key === "category")
      return Alert.alert("Selecione a categoria!");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name,
    };
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>Cadastro</Title>
          </Header>
          <Form>
            <Fields>
              <InputForm
                placeholder="Nome"
                name="name"
                control={control}
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />
              <InputForm
                placeholder="Preço"
                name="amount"
                control={control}
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
              />

              <TransactionTypes>
                <TransactionTypeButton
                  title="Income"
                  type="up"
                  onPress={() => handleTransactionTypeSelect("up")}
                  isActive={transactionType === "up"}
                />
                <TransactionTypeButton
                  title="Outcome"
                  type="down"
                  onPress={() => handleTransactionTypeSelect("down")}
                  isActive={transactionType === "down"}
                />
              </TransactionTypes>

              <SelectInput
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
              />
            </Fields>
            <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          </Form>

          <Modal visible={categoryModalOpen}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
          </Modal>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
};
