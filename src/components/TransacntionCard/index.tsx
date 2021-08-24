import React from "react";

import {
  Amount,
  Category,
  CategoryName,
  Container,
  Footer,
  Icon,
  Title,
  Date,
} from "./styles";

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  title: string;
  amount: string;
  category: Category;
  date: string;
  type: "positive" | "negative";
}

interface Props {
  data: TransactionCardProps;
}

export const TransactionCard = ({ data }: Props) => {
  return (
    <>
      <Container>
        <Title>{data.title}</Title>
        <Amount type={data.type}>
          {data.type === "negative" && "- "}
          {data.amount}
        </Amount>
        <Footer>
          <Category>
            <Icon name={data.category.icon} />
            <CategoryName>{data.category.name}</CategoryName>
          </Category>
          <Date>{data.date}</Date>
        </Footer>
      </Container>
    </>
  );
};
