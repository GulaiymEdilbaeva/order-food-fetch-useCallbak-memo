import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchRequest } from "../lib/fetApi";

import MealItem from "./mealItem/MealItem";

const Meals = React.memo(() => {
  const [meals, setMeals] = useState();

  async function getFoods() {
    try {
      const response = await fetchRequest(`/foods`);
      setMeals(response);
    } catch (error) {
      new Error(error);
    }
  }
  useEffect(() => {
    getFoods();
  }, []);

  return (
    <Container>
      {meals?.map((meal) => {
        return <MealItem key={meal._id} meal={meal} />;
      })}
    </Container>
  );
});

const Container = styled.div`
  background-color: #ffff;
  width: 80%;
  margin: 0 auto;
  border-radius: 16px;
  padding: 40px;
  margin-top: 198px;
`;

export default Meals;
