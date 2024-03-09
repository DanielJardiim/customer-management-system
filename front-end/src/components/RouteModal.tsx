import React from "react";
import ReactModal from "react-modal";
import { CustomerProps } from "../types/customer";
import classes from "./RouteModal.module.css";

interface IRouteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  routeCustomers: CustomerProps[];
}

export const RouteModal: React.FC<IRouteModalProps> = ({
  isOpen,
  onRequestClose,
  routeCustomers,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Visualização da Rota"
      ariaHideApp={false}
      className={classes.routeModalContent}
      overlayClassName={classes.routeModalOverlay}
    >
      <h2>Ordem de Visitação dos Clientes</h2>
      <ul className={classes.customerList}>
        {routeCustomers.map((customer, index) => (
          <li key={customer.id} className={classes.customerListItem}>
            <div className={classes.customerInfo}>
              <p>{customer.name}</p>
              <p>{customer.email}</p>
              <p>{customer.phonenumber}</p>
              <p>Coordenada X: {customer.coordinates.x}</p>
              <p>Coordenada Y: {customer.coordinates.y}</p>
            </div>
            <div className={classes.customerIndex}>{index + 1}</div>
          </li>
        ))}
      </ul>
    </ReactModal>
  );
};
