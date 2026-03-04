import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useActions from "../hooks/useActions";
import { useNavigate } from "react-router-dom";

export const EditContact = () => {
  const {store, dispatch} = useGlobalReducer();
  const { getContacts } = useActions();
  const {contactId} = useParams();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    nameInput: "",
    emailInput: "",
    addressInput: "",
    phoneInput: "",
  });

  useEffect(() => {
    const foundContact = store?.contacts.find(contact => contact.id === parseInt(contactId))
    setInputValues({
      nameInput: foundContact.name,
      emailInput: foundContact.email,
      addressInput: foundContact.address,
      phoneInput: foundContact.phone,
    })
  }, [])

  const postContact = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/Patrick/contacts/" + contactId,
      {
        method: "PUT",
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
      <h1>Edit Contact {contactId}</h1>
      <form onSubmit={(e) => postContact(e)}>
        <fieldset>
          <label htmlFor="nameInput">Name</label>
          <input
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
        <fieldset>
          <label htmlFor="nameInput">Phone</label>
          <input
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
        <fieldset>
          <label htmlFor="nameInput">Email</label>
          <input
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
        <fieldset>
          <label htmlFor="nameInput">Address</label>
          <input
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
            <button className="btn btn-danger ms-auto">Back to Home</button>
          </Link>
          <button type="submit" className="btn btn-info ms-2">
            Edit Contact
          </button>
        </div>
      </form>
    </>
  );
};
