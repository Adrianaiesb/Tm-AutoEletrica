import Pagina from "@/components/Pagina";
import React from "react";
import { BiSupport, BiSolidHome } from "react-icons/bi";
import styles from "../styles/index.module.css";
import Carrossel from "@/components/Carrossel";

const index = () => {
  return (
    <>
      <Pagina>
        <div className={styles.fundo}>
          <Carrossel />
        </div>
      </Pagina>
    </>
  );
};

export default index;
