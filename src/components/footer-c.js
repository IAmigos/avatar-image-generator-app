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
                   marginTop: "29px" }}> 
        XGAN implementation from scratch
      </h1> 
      <p style={{ color: "white",  
                   textAlign: "center"}}>
        Pytorch implementation of the XGAN model based only on the original paper.
      </p>
      <Container> 
        <Row> 
            <Column>
            </Column>
            <Column>
                <Heading>Resources</Heading>

                <FooterLink href="https://github.com/paper2code-pucp/avatar-image-generator">Project's Repository</FooterLink> 
                <FooterLink href="https://arxiv.org/abs/1711.05139">XGAN Original Paper</FooterLink> 
            </Column>
            <Column>
                <Heading>Contact us</Heading>

                <FooterLink href="https://www.linkedin.com/in/daniel-ibanez/">Daniel Ibáñez</FooterLink> 
                <FooterLink href="https://www.linkedin.com/in/davidfreidenson/">David Freidenson</FooterLink> 
                <FooterLink href="https://www.linkedin.com/in/joel-cabrera-rios/">Joel Cabrera</FooterLink> 
                <FooterLink href="https://www.linkedin.com/in/manuel-harold-stev-huaman-ramos/">Stev Huamán</FooterLink> 
                <p></p>
            </Column>

        </Row> 
      </Container> 
    </Box> 
  ); 
}; 
export default Footer; 