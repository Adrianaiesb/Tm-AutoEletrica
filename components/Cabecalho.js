import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BiSolidHome, BiSupport } from "react-icons/bi";
import styles from "../styles/index.module.css"

const Cabecalho = () => {
  return (
    <>
      <div className={styles.menunav}>
        <a className={styles.menunav} href="/">
          <BiSolidHome className="mt-1" />
          Página Inicial
        </a>
        <a className={styles.menunav} href="/faleconosco/form">
          <BiSupport className="mt-1" />
          Fale com o RH
        </a>
      </div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">TM Auto Elétrica</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/funcionarios">Funcionários</Nav.Link>
            <Nav.Link href="/atestados">Atestados</Nav.Link>
            <Nav.Link href="/ferias">Férias</Nav.Link>
            <Nav.Link href="/decimoterceiro">13°</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Cabecalho;
