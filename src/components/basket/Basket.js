import React, { useContext } from "react";
import { Modal } from "../../UI/Modal";
import BasketItem from "./BasketItem";
import TotalAmount from "./TotalAmount";
import styled from "styled-components";
import { cartContext } from "../../store/cart-context";

const Basket = ({ onToggle }) => {
  const { items, getTotalAmount } = useContext(cartContext);
  console.log(items, "items");
  return (
    <Modal>
      <Content>
        {items.length ? (
          <FixedWidthContainer>
            {items.map((item) => {
              return (
                <BasketItem
                  key={item._id}
                  title={item.title}
                  price={item.price}
                  amount={item.amount}
                  id={item._id}
                  item={item}
                ></BasketItem>
              );
            })}
          </FixedWidthContainer>
        ) : null}

        <TotalAmount onClose={onToggle} totalPrice={getTotalAmount} />
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
`;

const FixedWidthContainer = styled.div`
  max-height: 250px;
  overflow-y: scroll;
`;

export default Basket;
