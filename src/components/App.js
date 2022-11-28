import Filter from "./Filter/Filter";
import { Form } from "./Form/Form";
import { ContactList } from "./ContactList/ContactList";

import { addContact, deleteContact } from "../redux/operations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./App.module.css";

export const App = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2 className={style.title}>Contacts</h2>
      <Filter />
      <ContactList onDeleteContact={deleteContact} />
      <ToastContainer autoClose={2000} />
    </div>
  );
};
