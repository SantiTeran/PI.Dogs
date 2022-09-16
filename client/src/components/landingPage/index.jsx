import { Link } from "react-router-dom";
// import Footer from "../footer/index.jsx"
import "./index.css";

export default function LandingPage() {
  return (
    <div className="landingPage">
      {/* <img
        className="landingPageImage"
        src="https://wallpaperaccess.com/full/3845930.jpg"
        alt="landingPageImage"
      /> */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div className="landingPageText">
        <Link to="/home">
          <button className="button2">Welcome to my Proyect</button>
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
