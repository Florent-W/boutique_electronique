import React, { createContext, useState, useContext } from "react";

export type Order = {
  id: string;
  date: string;
  status: string;
  totalAmount: string;
};

const OrderContext = createContext({
  order: null as Order | null,
  updateOrder: (orderData: Order | null) => {},
});

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState(null as Order | null);

  const updateOrder = (orderData: Order | null) => {
    setOrder(orderData);
  };

  return (
    <OrderContext.Provider value={{ order, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
