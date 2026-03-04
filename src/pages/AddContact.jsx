import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useState } from "react";
import useActions from "../hooks/useActions";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
  const { getContacts } = useActions();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    nameInput: "",
    emailInput: "",
    addressInput: "",
    phoneInput: "",
  });

  const postContact = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/Patrick/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputValues.nameInput,
          phone: inputValues.phoneInput,
          address: inputValues.addressInput,
          email: inputValues.emailInput,
        }),
      },
    );
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    getContacts();
    navigate("/");
    return data;
  };

  return (
    <>
    <div className="container mt-3">
      <h1>Add Contact</h1>
      <form onSubmit={(e) => postContact(e)}>
        <fieldset className="ms-2">
          <label htmlFor="nameInput">Name</label>
          <input
            placeholder="Name"
            type="text"
            id="nameInput"
            name="nameInput"
            className="form-control"
            value={inputValues.nameInput}
            onChange={(event) =>
              setInputValues({ ...inputValues, nameInput: event.target.value })
            }
          />
        </fieldset>
        <fieldset className="ms-2">
          <label htmlFor="nameInput">Phone</label>
          <input
            placeholder="Phone #"
            type="text"
            id="phoneInput"
            name="phoneInput"
            className="form-control"
            value={inputValues.phoneInput}
            onChange={(event) =>
              setInputValues({ ...inputValues, phoneInput: event.target.value })
            }
          />
        </fieldset>
        <fieldset className="ms-2">
          <label htmlFor="nameInput">Email</label>
          <input
            placeholder="Email"
            type="text"
            id="emailInput"
            name="emailInput"
            className="form-control"
            value={inputValues.emailInput}
            onChange={(event) =>
              setInputValues({ ...inputValues, emailInput: event.target.value })
            }
          />
        </fieldset>
        <fieldset className="ms-2">
          <label htmlFor="nameInput">Address</label>
          <input
            placeholder="Address"
            type="text"
            id="addressInput"
            name="addressInput"
            className="form-control"
            value={inputValues.addressInput}
            onChange={(event) =>
              setInputValues({
                ...inputValues,
                addressInput: event.target.value,
              })
            }
          />
        </fieldset>
        <div classname="d-flex">
          <Link to="/">
            <button className="btn btn-danger mt-4 ms-auto">Back to Home</button>
          </Link>
          <button type="submit" className="btn btn-success mt-4 ms-2">
            Add Contact
          </button>
        </div>
      </form>
      </div>
    </>
  );
};
