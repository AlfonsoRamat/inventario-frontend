import React from 'react';
import Navbar from '../../componentes/Navbar/navbar';
import Inventario from '../inventario/Inventario';
import { card } from 'react-bootstrap';

import './main.css';

function Main(props) {
  return (
    <div className="grid-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
       <div> 
       <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Title>Card Title</Card.Title>
       <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
         </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        </Card>
       </div>
        <div><Inventario /></div>
      </div>
      <div className="footer">
        <h3><strong>RT Development ©</strong></h3>
      </div>
    </div>
  );
}

export default Main;