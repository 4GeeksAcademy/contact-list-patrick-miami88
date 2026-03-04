import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import useActions from "../hooks/useActions.jsx";
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { getContacts } = useActions();

  const createUser = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/Patrick",
      {
        method: "POST",
      },
    );
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      getContacts();
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    createUser();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Contacts</h1>
      </div>
      <div>
        {store?.contacts.map((contact) => (
          <ContactCard
            name={contact.name}
            phone={contact.phone}
            email={contact.email}
            address={contact.address}
            id={contact.id}
            key={contact.id}
          />
        ))}
      </div>
    </>
  );
};
