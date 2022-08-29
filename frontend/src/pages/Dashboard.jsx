// load libraries
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// load dashboard components
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import ContactItem from '../components/ContactItem';
import Spinner from '../components/Spinner';

// load redux slice
import { getContacts, reset } from '../features/contacts/contactSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [relationSelector, setRelationSelector] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { contacts, isLoading, isError, message } = useSelector(
    (state) => state.contacts
  );

  const filterNames = (e) => {
    let filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredContacts(filteredContacts);
  }

  useEffect(() => {
    if (isError) { console.log(message); }
    // if user not logged in
    if (!user) { navigate('/login'); }
    // get contacts for logged in user
    dispatch(getContacts());

    return () => dispatch(reset());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) return <Spinner />

  return (
    <div className="container">
      <Header />
      <div className='block'>
        <div className="block has-text-centered mt-3">
          <h2 className='title is-2'>Welcome, {user && user.name}!</h2>
        </div>

        <div className="columns">
          <div className="column is-4 is-left ml-3">
            <ContactForm />
          </div>
          <div className="column is-right mr-3">
            <div className="control has-icons-left has-icons-right">
              <input 
                className="input is-large" 
                id = "searchText"
                type="text" 
                placeholder='Search by name'
                onChange={e => filterNames(e)}
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="container has-text-centered">
          <div className="column has-text-centered">
            {contacts.length > 0 ? (
              <table className='table is-striped is-hoverable is-fullwidth'>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>
                      <div className="select">
                        <select 
                          name='relation' 
                          id='relation' 
                          value={relationSelector} 
                          onClick={e => setRelationSelector(e.target.value)} 
                          onChange={e => setRelationSelector(e.target.value)} 
                        >
                          <option value=''>All</option>
                          <option value="Relative">Relatives</option>
                          <option value="Friend">Friends</option>
                          <option value="Coworker">Coworkers</option>
                          <option value="Classmate">Classmates</option>
                          <option value="Other">Others</option>
                        </select>
                      </div>
                    </td>
                    <td>Edit</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {document.getElementById('searchText') === null ? (
                    contacts.map((contact) => (
                      <ContactItem key={contact._id} contact={contact} relationSelector={relationSelector} />
                    ))
                  ) : (
                    (document.getElementById('searchText') !== null & filteredContacts.length > 0) ? (
                      filteredContacts.map((contact) => (
                        <ContactItem key={contact._id} contact={contact} relationSelector={relationSelector} />
                      ))
                    ) : (
                      <tr><h3>No contacts match the search</h3></tr>
                    )
                  ) }
                </tbody>
              </table>
            ) : (
                <h3>No contacts recorded yet</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;