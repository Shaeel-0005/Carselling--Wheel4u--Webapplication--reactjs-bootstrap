import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carousal.css"; // Optional for custom styles
import { Carousel } from "react-bootstrap";


const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const banner1 ="https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const banner2 ="https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?";
  const images = [banner1, banner2];

  const handleSelect = (selectedIndex, event) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <div className="container-fluid ps-5 pe-5 pb-3 pt-3 ">
      <div className="row">
        <div className="col">
          <Carousel activeIndex={currentIndex} onSelect={handleSelect} style={{boxShadow:'none'}}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="container text-center pt-5 pb-5">
            <div className="row">
              <div className="col">
                <div className="heading text-center">
                  <h2 className="fw-bold "style={{fontFamily: '"PT Serif", serif ', color: "#00000"}}>CHOOSE YOUR STYLISH</h2>
                  <h2 className="fw-bold " style={{ color: "#F87629",fontFamily: '"PT Serif", serif '}}>CAR AND GET DISCOUNT</h2>
                </div>
              </div>
              <div className="col" style={{borderLeft:'1px solid #234234'}}> 
                <p > 
                  By following these steps and using the provided resources, you
                  should be able to identify the reason why your images are not
                  rendering in theBy following these steps and using the provided resources, you
                  should be able to identify the reason why your images are not
                  rendering in the
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
