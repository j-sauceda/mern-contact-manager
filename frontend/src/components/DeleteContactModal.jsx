// load libraries
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../features/contacts/contactSlice';

function DeleteContactModal({ contact }) {
  const [modalClass, setModalClass] = useState('modal');
  
  const toggleModalClass = () => {
    if (modalClass === 'modal') {
      setModalClass('modal is-active');
    }
    else {
      setModalClass('modal');
    }
  }

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    dispatch(deleteContact(contact._id));
  }

  return (
    <div>
      <button className="button is-danger" onClick={toggleModalClass} >
        <i className="fa-regular fa-trash-can"></i>
      </button>

      <div className={modalClass} >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Confirm Delete</p>
            <button className="delete" aria-label="close" onClick={toggleModalClass} ></button>
          </header>
          <section className="modal-card-body has-text-centered">
            <form onSubmit={onSubmit}>
              <p>Name:&nbsp;{contact.name}</p>
              <p>Phone:&nbsp;{contact.phone}</p>
              <p>Email:&nbsp;{contact.email}</p>
              <p>Relation:&nbsp;{contact.relation}</p>

              <div className='field'>
                <button className='button control is-danger' type='submit'>
                  Delete
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DeleteContactModal;