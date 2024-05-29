import * as React from "react";
import "./ScrollToTopBtn.css";
type ScrollToTopBtnProps = {
  //
};

const ScrollToTopBtn: React.FC<any> = () => {

     const handleScrollToTop = () => {
       window.scrollTo({ top: 0, behavior: 'smooth' });

     };

     return (
         <>

             <button className="btn  btn-sm me-2 pulse-btn"
                                      onClick={handleScrollToTop}
                                      style={{
                                          "position": "fixed",
                                          "bottom": "20px",
                                          "left": "30px",
                                          "zIndex": "99"
                                      }}><i className="fas fa-caret-up" style={{color:"white",fontSize:20}}></i>

                                              </button>

         </>
     );
};

export default ScrollToTopBtn;
