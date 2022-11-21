import { useDispatch, useSelector } from "react-redux";
import { ContactItem } from "../ContactItem/ContactItem";
import { deleteContact } from "../../redux/contactsSlice";
import { getFilterValue, getContacts } from "../../redux/selectors";
import style from "./ContactList.module.css";

export const ContactList = () => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact());

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

  const filteredContacts = (contacts) => {
    if (filter === "") {
      return contacts;
    } else {
      const normalizedFilter = filter.toLowerCase();

      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  return (
    <ul className={style.contacts_list}>
      {filteredContacts(contacts).map(({ id, name, number }) => (
        <li key={id} className={style.contact_list_item}>
          <ContactItem contactItem={{ name, number, id }}></ContactItem>
          <button onClick={handleDelete} className={style.contact_item_btn}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
