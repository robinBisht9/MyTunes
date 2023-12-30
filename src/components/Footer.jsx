const Footer = () => {
  return (
    <footer
      className="footer text-center bg-dark text-white
     border-top mt-3"
    >
      <div className="container pt-4">
        <section className="mb-4">
          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-white m-1 text-decoration-none"
            href="https://www.linkedin.com/in/robin-bisht-011574134/"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="bi bi-linkedin"></i> LinkedIn
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-white m-1 text-decoration-none"
            href="https://github.com/robinBisht9"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="bi bi-github"></i> GitHub
          </a>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05) " }}
      >
        Created By : Robin Bisht
      </div>
    </footer>
  );
};

export default Footer;
