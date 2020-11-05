import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>  
      <img src={logo} alt="GitHub Repository" />
      <Title>Explore repositorios no GitHub</Title>

      <Form action="">
        <input placeholder="Digite o nome do repositório aqui" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="test">
          <img src="#" alt="Eduardo Elias"
          
          />
          <div>
            <strong>Eduardo Elias</strong>
            <p>Repository description </p>
          </div>       

          <FiChevronRight size={20} />   
        </a>

        <a href="test">
          <img src="#" alt="Eduardo Elias"
          
          />
          <div>
            <strong>Eduardo Elias</strong>
            <p>Repository description </p>
          </div>       

          <FiChevronRight size={20} />   
        </a>

        <a href="test">
          <img src="#" alt="Eduardo Elias"
          
          />
          <div>
            <strong>Eduardo Elias</strong>
            <p>Repository description </p>
          </div>       

          <FiChevronRight size={20} />   
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard;