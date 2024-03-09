import React, { useEffect, useRef, useState } from "react";
import classes from "./Register.module.css";
import { api } from "../services/api";
import { FiSearch, FiTrash } from "react-icons/fi";
import { RouteModal } from "./RouteModal";
import { CustomerProps } from "../types/customer";

export const Register = () => {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phonenumerRef = useRef<HTMLInputElement | null>(null);
  const xCoordinateRef = useRef<HTMLInputElement>(null);
  const yCoordinateRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLSelectElement | null>(null);
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routeCustomers, setRouteCustomers] = useState<CustomerProps[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearInput = () => {
    nameRef.current!.value = "";
    emailRef.current!.value = "";
    phonenumerRef.current!.value = "";
    xCoordinateRef.current!.value = "";
    yCoordinateRef.current!.value = "";
    filterRef.current!.value = "";
    queryRef.current!.value = "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const phonenumber = phonenumerRef.current?.value;

    if (!name || !email || !phonenumber) return;

    const coordinates = {
      x: xCoordinateRef.current?.value || Math.random() * 100,
      y: yCoordinateRef.current?.value || Math.random() * 100,
    };

    try {
      const existingCustomerResponse = await api.get("/customers/filter", {
        params: {
          filterKey: "email",
          filterValue: email,
        },
      });
      const existingCustomers = existingCustomerResponse.data;

      if (existingCustomers.length > 0) {
        alert("Já existe um cliente cadastrado com este email.");
        clearInput();
        return;
      }

      await api.post("/customers", { name, email, phonenumber, coordinates });
      loadCustomers();
      clearInput();
    } catch (error) {
      console.error(error);
      clearInput();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete("/customers", { params: { id } });
      loadCustomers();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const handleFilter = async () => {
    const filterKey = filterRef.current?.value;
    const filterValue = queryRef.current?.value;

    try {
      const response = await api.get("/customers/filter", {
        params: {
          filterKey,
          filterValue,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Erro ao filtrar clientes:", error);
      loadCustomers();
    }
  };

  const handleOpenModal = async () => {
    try {
      const response = await api.get("/customers/calculate-optimal-route");
      setRouteCustomers(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.register}>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          className={classes.input}
          type="text"
          placeholder="Digite seu nome completo..."
          ref={nameRef}
        />

        <label>Email:</label>
        <input
          className={classes.input}
          type="email"
          placeholder="Digite seu email..."
          ref={emailRef}
        />

        <label>Telefone:</label>
        <input
          className={classes.input}
          type="text"
          placeholder="Digite seu telefone..."
          ref={phonenumerRef}
        />

        <div className={classes.coordinates}>
          <div>
            <label>Coordenada X:</label>
            <input
              className={classes.input}
              type="number"
              placeholder="Digite a coordenada X..."
              ref={xCoordinateRef}
            />
          </div>
          <div>
            <label>Coordenada X:</label>
            <input
              className={classes.input}
              type="number"
              placeholder="Digite a coordenada Y..."
              ref={yCoordinateRef}
            />
          </div>
        </div>

        <input className={classes.submit} type="submit" value="Cadastrar" />
      </form>

      {/* Filtros */}
      <div className={classes.filterBy}>
        <label>Buscar por:</label>
        <select id="filter" ref={filterRef}>
          <option value="name">Nome</option>
          <option value="email">Email</option>
          <option value="phonenumber">Telefone</option>
        </select>
        <input type="text" placeholder="Digite sua busca..." ref={queryRef} />
        <button onClick={handleFilter}>
          <FiSearch size={18} color="#FFF" />
        </button>
      </div>

      {/* Lista de clientes */}
      <div className={classes.listCustomers}>
        <h2>Lista de Clientes</h2>
        <button className={classes.buttonViewRoute} onClick={handleOpenModal}>
          Visualizar Rota
        </button>
        <section className={`${classes.section} ${classes.scroll}`}>
          {customers.map((customer) => (
            <article key={customer.id}>
              <p>
                <span>Nome:</span> {customer.name}
              </p>
              <p>
                <span>Email:</span> {customer.email}
              </p>
              <p>
                <span>Telefone:</span> {customer.phonenumber}
              </p>
              <p>
                <span>Coordenada X:</span> {customer.coordinates.x}
              </p>
              <p>
                <span>Coordenada Y:</span> {customer.coordinates.y}
              </p>

              <button onClick={() => handleDelete(customer.id)}>
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>
      </div>

      {/* Modal */}
      <RouteModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        routeCustomers={routeCustomers}
      />
    </div>
  );
};
