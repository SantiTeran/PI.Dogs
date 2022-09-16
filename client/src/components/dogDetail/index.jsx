import React, { useEffect } from "react";
// import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDogDetail, deleteDog } from "../../store/actions";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function DogDetail(props) {
  let { id } = useParams();

  let history = useNavigate();

  let dispatch = useDispatch();
  let dog = useSelector((state) => state.detailDog);
  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);
  console.log(props);

  function handleClick() {
    dispatch(deleteDog(dog.id));
    alert(`Se elimino ${dog.name}`);
    history("/home");
  }

  //   return dog ? (
  //     <div>
  //       <h1>{dog.name}</h1> {console.log(dog)}
  //       <img src={dog.image} alt={`${dog.name}_image`} />
  //       <h3>{dog.height.metric}</h3>
  //       <h3>{dog.weight.metric}</h3>
  //       <h3>{dog.life_span}</h3>
  //       <h3>{dog.temperament}</h3>
  //     </div>
  //   ) : (
  //     <div>'loding'</div>
  //   );
  return (
    <div>
      {dog ? (
        <div className="dog-detail">
          <h1>ID: {dog.id}</h1>
          <h1>Name: {dog.name}</h1> {console.log(dog)}
          <img
            src={dog.image ? dog.image : dog.image_url}
            alt={`${dog.name}_image`}
          />
          <h3>
            Height: {dog.height.metric ? dog.height.metric : dog.height} cm
          </h3>
          <h3>
            Weight: {dog.weight.metric ? dog.weight.metric : dog.weight} kg
          </h3>
          <h3>
            Life Span: {dog.life_span} {dog.id.length > 5 ? "years" : <></>}
          </h3>
          <h3>
            Temperaments{" "}
            {dog.temperament
              ? dog.temperament
              : dog.temperaments &&
                dog.temperaments.map((temperament) => temperament.name + " ")}
          </h3>{" "}
          <br />
          {dog.id.length > 6 ? (
            <div>
              <button className="button_delete" onClick={(e) => handleClick(e)}>
                Delete
              </button>
              <br />
              <br />
            </div>
          ) : (
            <></>
          )}
          <Link to="/home" style={{ textDecoration: "none" }}>
            <button className="button">Go Back</button>
          </Link>
        </div>
      ) : (
        <div>
          <img
            src="https://i.pinimg.com/originals/f8/97/e2/f897e2e871ed90d572f23b0539397432.gif"
            alt="gif"
          ></img>
        </div>
      )}
    </div>
  );
}
