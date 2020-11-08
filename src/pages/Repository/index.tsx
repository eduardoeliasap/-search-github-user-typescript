import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface RepositoryGit {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;    
    avatar_url: string;
  }
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  }
}

const Repository: React.FC = () => {
  const[repository, setRepository] = useState<RepositoryGit | null>(null);
  const[issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    async function loadRepo(): Promise<void> {      
      // Promisse.all execute all requests and return one array
      // The first return I put on repo variable
      // The second return I put on issues variable
      const [repo, issues] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ])

      console.log(repo.data);
      console.log(issues.data);
      
      setRepository(repo.data);
      setIssues(issues.data);
    }
    loadRepo();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub" />
        <Link to="/">Voltar
          <FiChevronLeft size={20} />   
        </Link>
      </Header>
      
      {repository ? (
        <RepositoryInfo>
          <header>
            <img src={repository?.owner.avatar_url} alt="#" />
            <div>
              <strong>{repository?.full_name}</strong>
              <p>{repository?.description}</p>
            </div>          
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <p>Carregando...</p>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url} target="_blank" rel="noopener noreferrer">                                    
            <img src={issue.user.avatar_url} alt="#" />
            <div>
              
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>       
            <FiChevronRight size={20} />   
          </a>
        ))}
      </Issues>
    </>
  )
}

export default Repository;