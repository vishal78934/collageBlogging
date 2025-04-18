import React from "react";
import Navbar from "../components/Navbar";
import "./team.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Member1 from "../assets/vishal.jpg";

const Team = () => {
  return (
    <>
      <Navbar />
      <div className="teamPage">
        <h2>Our Team Members</h2>
        <div className="container">
          <div className="card">
            <div className="content">
              <div className="profile">
                <img src={Member1} alt="" />
              </div>
              <div className="detail">
                <h2>Vishal Kumar</h2>
                <h4>Front-End Developer</h4>
                <div className="social">
                  <Link to="" target="_blank">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com/__vishal5576?igsh=MXhkb3R3YW50aWJmMw%3D%3D"
                    target="_blank"
                  >
                    <i className="fa fa-instagram"></i>
                  </Link>
                  <Link to="" target="_blank">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Team;
