import React from "react"; 
import { 
  Box, 
  Container, 
  Row, 
  Column, 
  FooterLink, 
  Heading, 
} from "./footer-c-styles.js"; 
  
const Footer = () => { 
  return ( 
    <Box> 
      <h1 style={{ color: "white",  
                   textAlign: "center",  
                   marginTop: "-50px" }}> 
        XGAN implementation from scratch
      </h1> 
      <p style={{ color: "white",  
                   textAlign: "center"}}>
        Pytorch implementation of the XGAN model based only on the original paper.
      </p>
      <Container> 
        <Column>
        <Heading>Resources</Heading>
        </Column>
        <Row> 
          <Column> 
            <FooterLink href="https://github.com/paper2code-pucp/avatar-image-generator">Our repository</FooterLink> 
          </Column> 
          <Column> 
            <FooterLink href="https://arxiv.org/abs/1711.05139">XGAN Paper</FooterLink> 
          </Column> 
        </Row> 
      </Container> 
    </Box> 
  ); 
}; 
export default Footer; 