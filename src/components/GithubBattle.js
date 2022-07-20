import React, { useState } from 'react';
import Player from './Player';
import { Link } from 'react-router-dom';

export default function GithubBattle(props) {
  const [state, setState] = useState({
    text1: '',
    text2: '',
    form1: false,
    form2: false,
    data1: '',
    data2: '',
    closeData1: true,
    closeData2: true
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.dataset.id;
    if (state[id]) {
      fetch(`https://api.github.com/users/${state[id]}`)
        .then((res) => res.json())
        .then((data) => {
          if (id === 'text1') {
            setState({
              ...state,
              [id]: "",
              data1: data,
              form1: true,
              closeData1: false,
            })
          } else {
            setState({
              ...state,
              [id]: "",
              data2: data,
              form2: true,
              closeData2: false,
            })
          }
        });
    }
  };

  const handleChange = ({ target }) => {
    let { value } = target;
    let id = target.dataset.id;
    setState({ ...state, [id]: value });
  };

  const handleKey = (event) => {
    if (event.target === 13) {
      handleSubmit(event);
    }
  };

  const handleCloseData = ({ target }) => {
    let id = target.dataset.id;
    if (id === "user1") {
      setState((prevState) => ({
        ...prevState,
        form1: !prevState.form1,
        closeData1: !prevState.closeData1,
        data1: "",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        form2: !prevState.form2,
        closeData2: !prevState.closeData2,
        data2: "",
      }));
    }
  };

  return (
    <>
      <div>
        <h2>
          Instructions
        </h2>
      </div>
      <div className="page-btn-content">
        <div>
          <h3>
            Enter two Github users
          </h3>
          <i className="fa-solid fa-user-group battle-icon-one">
          </i>
        </div>
        <div>
          <h3>
            Battle
          </h3>
          <i className="fa-solid fa-jet-fighter battle-icon-two">
          </i>
        </div>
        <div>
          <h3> See the winner
          </h3>
          <i className="fa-solid fa-trophy battle-icon-three">
          </i>
        </div>
      </div>
      <div>
        <h4> Players
        </h4>
        <Player
          {...state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleKey={handleKey}
          handleCloseData={handleCloseData}
        />
        <div>
          <Link className="btn-link"
            to={{
              pathname: "/playerbattle",
              state: [state.data1, state.data2],
            }}
          >
            <h4
              className={!state.closeData1 &&
                !state.closeData2 ? "visible" : "hidden"}
            > <span
              className="btn-link-name">
                BATTLE
              </span>
            </h4>
          </Link>
        </div>
      </div>
    </>
  )
}
