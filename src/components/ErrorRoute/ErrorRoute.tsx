import * as React from "react";
import './ErrorRoute.css'
type ErrorRouteProps = {
  //
};

const ErrorRoute: React.FC<any> = () => {
  return (
      <div className='error'>
        <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
        />
        <div className="error-header"> </div>
        <div className="container ">
          <section className="error-container text-center">
            <h1>404</h1>
            <div className="error-divider">
              <h2>PAGE INTROUVABLE.</h2>
              <p className="description">Nous n’avons pas trouvé cette page</p>
            </div>
            <a href="/home" className="return-btn">
              <i className="fa fa-home" />
              Home
            </a>
          </section>
        </div>
      </div>

  );
};

export default ErrorRoute;
