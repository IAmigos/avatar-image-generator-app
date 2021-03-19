import { AssignmentReturnedSharp } from "@material-ui/icons";
import React from "react";
import SimpleReactFooter from "simple-react-footer";

const FooterPage = () => {
    const description = "We have implemented in Pytorch the XGAN model based only on the original paper.";
  const title = "XGAN implementation from scratch.";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "Our repository",
                link: "https://github.com/paper2code-pucp/avatar-image-generator"
            },
            {
                name: "XGAN Paper",
                link: "https://arxiv.org/abs/1711.05139"
            }
        ]
    }
 ];
  return <SimpleReactFooter 
    description={description} 
    title={title}
    columns={columns}
    iconColor="#FFFFFF"
    backgroundColor="#0077BE"
    fontColor="#FFFFFF"
    copyright="paper2code-pucp"
    width="100%"
 />;
}

export default FooterPage;