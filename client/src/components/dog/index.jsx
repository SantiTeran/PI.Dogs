import { Link } from "react-router-dom";
import "./index.css";
// import { useDispatch } from "react-redux";
// import { deleteDog } from "../../store/actions";
export default function Dog(props) {
  // let dispatch = useDispatch();
  // function handleClick() {
  //   dispatch(deleteDog(props.id));
  // }

  return (
    props && (
      <div className="container-dog">
        <div className="container-text">
          {/* <h5>{props.id}</h5> */}
          <Link style={{ textDecoration: "none" }} key={props.id} to={`/home/${props.id}`}>
            <h3 className="name">{props.name}</h3>
          </Link>
          <p>Temperament: {props.temperament}</p>
          <p>Weight: {props.weight.metric ? props.weight.metric : props.weight} kg</p>
          <p>Height: {props.height.metric ? props.height.metric : props.height} cm</p>
          <p>
            Life Span: {props.life_span} {props.id.length > 5 ? "years" : <></>}
          </p>
        </div>
        <div className="container-img">
          <img
            src={
              props.img
                ? props.img
                : "https://www.revistapetlovers.com/wp-content/uploads/2020/10/todas-razas-perros.png"
            }
            alt="imagen"
          />
        </div>
        {/* {props.id.length > 6 ? (
          <button className="button_delete" onClick={(e) => handleClick(e)}>
            Delete
          </button>
        ) : (
          <></>
        )} */}
      </div>
    )
  );
}
