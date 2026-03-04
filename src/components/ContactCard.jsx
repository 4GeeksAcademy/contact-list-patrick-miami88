import React from "react";
import { Link } from "react-router-dom";
import useActions from "../hooks/useActions";

export const ContactCard = ({ name, phone, email, address, id }) => {
  const { getContacts } = useActions();
  const deleteContact = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/Patrick/contacts/" + id,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      return;
    }
    getContacts();
    return;
  };

  return (
    <div className="container card mt-3 pt-2">
      <div className="ms-4 mt-3">
        <div className="row">
          <div className="col-8">
            <h2>{name}</h2>
            <h4>
              <i class="fa-solid fa-phone"></i> {phone}
            </h4>
            <h4>
              <i class="fa-solid fa-envelope"></i> {email}
            </h4>
            <h4>
              <i class="fa-solid fa-house"></i> {address}
            </h4>
          </div>
          <div className="col-3 d-flex">
            <img src="https://picsum.photos/200" className="rounded-circle ms-auto" alt="..."></img>
          </div>
          <div className="col-1"></div>
        </div>
        <div>
          <Link to={`edit-contact/${id}`}>
            <button className="btn btn-warning m-3">Edit</button>
          </Link>
          <button
            className="btn btn-danger m-3"
            onClick={() => deleteContact()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
