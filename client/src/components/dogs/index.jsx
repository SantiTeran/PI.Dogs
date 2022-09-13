import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
// getApiDogs,
// getDbDogs,
// getDogs,
// getTemperaments,
// handleAlphabeticChange,
// handleDbChange,
// handleTemperamentChange,
// handleWeightChange,
// } from "../../store/actions";
import Dog from "../dog";
// import Temperament from "../temperaments";
import "./index.css";

export default function Dogs({ dogsFilter }) {
  // let dogs = useSelector((state) => state.filteredDogs);
  // let temperaments = useSelector((state) => state.temperaments);
  // let pagesTotal = useSelector((state) => state.pagesTotal);

  const [dogs, setDogs] = useState([]);
  const [pagesTotal, setTotalPages] = useState(0);
  // const [auxDogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // let dispatch = useDispatch();

  useEffect(() => {
    setDogs([...dogsFilter].splice(0, 8));
    setCurrentPage(0);
    setTotalPages(Math.floor(dogsFilter.length / 8));
  }, [dogsFilter]);

  // let i = 0;
  // function handleTempChange(e) {
  //   console.log(e.target.value);
  //   dispatch(handleTemperamentChange(e.target.value));
  // }

  // function handleChange(e) {
  //   if (e.target.value === "") dispatch(getDogs());
  //   else if (e.target.value === "api") dispatch(getApiDogs());
  //   else if (e.target.value === "db") dispatch(getDbDogs());
  // }

  // function handleAlphaChange(e) {
  //   dispatch(handleAlphabeticChange(e.target.value));
  // }

  // function handleWChange(e) {
  //   dispatch(handleWeightChange(e.target.value));
  // }
  // console.log(auxDogs);

  function HandleForwad() {
    const totalElementos = dogsFilter.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * 8;
    if (firstIndex > totalElementos) return;
    setCurrentPage(nextPage);
    setDogs([...dogsFilter].splice(firstIndex, 8));
  }

  function HandleBack() {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * 8;
    setCurrentPage(prevPage);
    setDogs([...dogsFilter].splice(firstIndex, 8));
  }

  return (
    <div className="container">
      {/* {console.log(dogs)} */}
      {/* <div className="temperaments">
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
      </div> */}

      {/* <div className="races">
        <select onChange={(e) => handleChange(e)}>
          <option value="" key={"both"}>
            Both DB's
          </option>
          <option value="api" key={"api"}>
            Api
          </option>
          <option value="db" key={"db"}>
            Db
          </option>
        </select>
      </div> */}
      {/* <div className="alphabeticOrder">
        <select onChange={(e) => handleAlphaChange(e)}>
          <option value="abc">A-Z</option>
          <option value="cba">Z-A</option>
        </select>
      </div> */}

      {/* <div className="weightOrder">
        <select onChange={(e) => handleWChange(e)}>
          <option value="-/+">Menor a Mayor</option>
          <option value="+/-">Mayor a Menor</option>
        </select>
      </div> */}
      <div className="container-dogs">
        {dogs ? (
          dogs.length > 0 ? (
            dogs.map((dog) => {
              return (
                <Dog
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  life_span={dog.life_span}
                  temperament={
                    dog.temperament ? (
                      dog.temperament
                    ) : dog.temperaments ? (
                      dog.temperaments.map(
                        (temperament) => temperament.name + " "
                      )
                    ) : (
                      <></>
                    )
                  }
                  img={dog.image_url}
                  weight={dog.weight}
                  height={dog.height}
                />
              );
            })
          ) : (
            <>No se Encontro el Perrito</>
          )
        ) : (
          <div>cargando</div>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => HandleBack()}> Back </button>
        <span>{`${currentPage + 1} of ${pagesTotal + 1}`}</span>
        <button onClick={() => HandleForwad()}> Forward </button>
      </div>
    </div>
  );
}
