import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap";
import image from "../images/rh.jpeg";
import recruit from "../images/recruit.png";
import sobre from "../images/sobre.png"

const Carrossel = () => {
  return (
    <>
      <Carousel bg='dark' variant='dark' className='mt-5'>
        <Carousel.Item className='mt-5'>
          <Image className="d-block w-100" src={recruit} alt="Primeiro Slide" />
          <Carousel.Caption>
            <h3>TM Auto Elétrica</h3>
            <p>Informações sobre a sua empresa!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='mt-5'>
          <Image className="d-block w-100" src={sobre} alt="Segundo Slide" />
          <Carousel.Caption>
            <h3>Funcionários</h3>
            <p>Acesse aqui a lista de funcionários cadastrados!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='mt-5'>
          <Image className="d-block w-100" src={image} alt="Terceiro Slide" />
          <Carousel.Caption>
            <h3>Fale com o RH</h3>
            <p>Tem alguma reclamação, dúvida ou sugestão? Fale conosco!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Carrossel;
