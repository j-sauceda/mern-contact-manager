function Spinner() {
  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <span className="icon-text">
            <span>
              <h1 className="subtitle is-2">
                Loading, please wait...
              </h1>
            </span>
            <span className='icon is-large'>
              <i className='fas fa-regular fa-compass fa-pulse' ></i>
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Spinner
