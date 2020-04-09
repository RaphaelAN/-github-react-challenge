import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repos, setRepos] = useState([])
  try {
    useEffect(() => {
      api.get("/repositories").then( response => {
        setRepos(response.data)
      })
    }, [])

  } catch(err){
    alert(`Erro ao acessar repositorios, tente novamente. Erro: ${err}`)
  }

  async function handleAddRepository() {
    try {
      const repo = {
        title: 'Desafio Node.js',
        url: 'https://github.com/RaphaelAN/github-node-challenge',
        techs: ['Node.js', 'Express']
      }
      
      const response = await api.post('/repositories', repo)
      setRepos([...repos, response.data])


    } catch (err) {
      alert(`Erro ao criar repositorio, tente novamente. Erro: ${err}`)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)
      setRepos(repos.filter(repo => repo.id !== id))
    } catch(err) {
      alert(`Erro ao deletar repositorio, tente novamente. Erro: ${err}`)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repos.map(repo => (
        <li key={repo.id}>

          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>

        </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
