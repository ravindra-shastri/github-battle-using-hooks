import React, { useState, useEffect } from 'react';
import TotalCard from './TotalCard';

export default function _GithubStars() {

  const [state, setState] = useState({
    data: null,
    category: "all"
  })

  useEffect(() => {
    fetchStars(state.category)
  }, [state.category])

  const handleCategory = ({ target }) => {
    let id = target.dataset.id;
    setState(
      {
        data: null,
        category: id,
      },
      () => fetchStars(state.category)
    );
  };

  const fetchStars = (category) => {
    fetch(`https://api.github.com/search/repositories?q=stars:%3E1+language:${category}&sort=stars&order=desc&type=Repositories`)
      .then((res) => res.json())
      .then((data) => setState({ data: data.items }));
  };

  return (
    <>
      <div>
        <header>
          <nav className="navbar">
            <div>
              <h4 className={state.category === "all" ? "active" : ""}
                data-id="all"
                onClick={(event) => handleCategory(event)}
              > All
              </h4>
            </div>
            <h4 className={state.category === "javascript" ? "active" : ""}
              data-id="javascript"
              onClick={(event) => handleCategory(event)}
            >
              JavaScript
            </h4>
            <h4 className={state.category === "ruby" ? "active" : ""}
              data-id="ruby"
              onClick={(event) => handleCategory(event)}
            >
              ruby
            </h4>
            <h4 className={state.category === "java" ? "active" : ""}
              data-id="java"
              onClick={(event) => handleCategory(event)}
            >
              Java
            </h4>
            <h4 className={state.category === "css" ? "active" : ""}
              data-id="css"
              onClick={(event) => handleCategory(event)}
            >
              CSS
            </h4>
            <h4 className={state.category === "python" ? "active" : ""}
              data-id="python"
              onClick={(event) => handleCategory(event)}
            >
              Python
            </h4>
          </nav>
        </header>
        <div>
          {state.data ? (
            <TotalCard data={state.data} />) : (
            <h5> Fetching Repos ... </h5>
          )}
        </div>
      </div>
    </>
  )
}

