import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApiDogs,
  getDbDogs,
  getDogs,
  getTemperaments,
  handleAlphabeticChange,
  handleTemperamentChange,
  handleWeightChange,
  searchDog,
} from "../../store/actions";
import "./index.css";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  let temperaments = useSelector((state) => state.temperaments);
  let i = 0;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(searchDog(search));
  }

  function handleTempChange(e) {
    console.log(e.target.value);
    if (e.target.value === "") dispatch(getDogs());
    else dispatch(handleTemperamentChange(e.target.value));
  }

  function handleChange(e) {
    if (e.target.value === "") dispatch(getDogs());
    else if (e.target.value === "api") dispatch(getApiDogs());
    else if (e.target.value === "db") dispatch(getDbDogs());
  }

  function handleAlphaChange(e) {
    if (e.target.value !== "") {
      dispatch(handleAlphabeticChange(e.target.value));
    } else {
      dispatch(getDogs());
    }
  }

  function handleWChange(e) {
    if (e.target.value !== "") {
      dispatch(handleWeightChange(e.target.value));
    } else {
      dispatch(getDogs());
    }
  }

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <div className="navbar-search-bar">
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  onChange={onInputChange}
                  value={search}
                  placeholder="Find Your Puppy"
                />
                <input type="submit" value="Buscar" />
              </form>
            </div>
          </li>
          <li>
            <div className="navbar-temperaments">
              <select onChange={(e) => handleTempChange(e)}>
                <option value="">Select Temperament</option>
                {temperaments &&
                  temperaments.map((temperament) => {
                    return (
                      <option
                        temperament={temperament}
                        key={i++}
                        id={temperaments.indexOf(temperament)}
                        value={temperament}
                      >
                        {temperament}
                      </option>
                    );
                  })}
              </select>
            </div>
          </li>
          <li>
            <div className="navbar-races">
              <select onChange={(e) => handleChange(e)}>
                <option value="" key={"bothDB"}>
                  API and DB
                </option>
                <option value="api" key={"api"}>
                  API
                </option>
                <option value="db" key={"db"}>
                  DB
                </option>
              </select>
            </div>
          </li>
          <li>
            <div className="navbar-alphabetic-order">
              <select onChange={(e) => handleAlphaChange(e)}>
                <option value="" key={"bothAlph"}>
                  Without Alphabetic Order
                </option>
                <option value="abc" key={"abc"}>
                  A-Z
                </option>
                <option value="cba" key={"cba"}>
                  Z-A
                </option>
              </select>
            </div>
          </li>
          <li>
            <div className="navbar-weight-order">
              <select onChange={(e) => handleWChange(e)}>
                <option value="" key={"bothWeight"}>
                  Without Weight Order
                </option>
                <option value="-/+">Menor a Mayor</option>
                <option value="+/-">Mayor a Menor</option>
              </select>
            </div>
          </li>

          <li className="navbar-create">
            <Link to="/create">
              <button className="button">Create</button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="clearfix"></div>
    </div>
  );
}
