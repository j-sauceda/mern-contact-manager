// load contact components
import EditContactForm from './EditContactForm';
import DeleteContactModal from './DeleteContactModal';

// define contact_item component
function ContactItem({ contact, relationSelector }) {

  return (
    <>
      {
        relationSelector === '' ? (
          <tr>
            <td>{ contact.name }</td>
            <td>{ contact.phone }</td>
            <td>{ contact.email }</td>
            <td>{ contact.relation }</td>
            <td>
              <EditContactForm contact={contact} />
            </td>
            <td>
              <DeleteContactModal contact={contact} />
            </td>
          </tr>
        ): (
          relationSelector === contact.relation ? (
            <tr>
              <td>{ contact.name }</td>
              <td>{ contact.phone }</td>
              <td>{ contact.email }</td>
              <td>{ contact.relation }</td>
              <td>
                <EditContactForm contact={contact} />
              </td>
              <td>
                <DeleteContactModal contact={contact} />
              </td>
            </tr>
          ) : (
            <></>
          )
        )
      }
    </>
  )
}

export default ContactItem;