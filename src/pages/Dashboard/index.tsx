import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';
import logo from '../../assets/logo.svg';
// import Repository from '../Repository';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;    
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const[newRepo, setNewRepo] = useState('');
  const[inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    } else {
      return;
    }
  });  

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {        
    event.preventDefault();

    try {
      if (!newRepo) {
        setInputError('Digite o autor/nome do repository');
        return;
      }
      
      // Add new repositories
      const response = await api.get<Repository>(`repos/${newRepo}`);
      
      const repository = response.data;
      
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    }catch (err) {
      setInputError('Erro na busca por esse repositorio');
    }    
  }

  return (
    <>  
      <img src={logo} alt="GitHub Repository" />
      <Title>Explore repositorios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input placeholder="Digite o nome do repositório aqui" 
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/* // If i have something inside of inputError I will show Error */}
      { inputError && <Error>{inputError}</Error> }
      
      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="test">
          <img src={repository.owner.avatar_url} alt={repository.full_name}
          
          />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description} </p>
          </div>       

          <FiChevronRight size={20} />   
        </a>
        ))}
                
      </Repositories>
    </>
  )
}

export default Dashboard;