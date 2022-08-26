//https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-random-quote-machine
//<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css' />
//https://codesandbox.io/s/react-bootstrap-demo-forked-dde0b

import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

import "./styles.css";

//colot attay
const colorArray = [
  "#fb918f",
  "#ee749d",
  "#a3b0e4",
  "#947ac0",
  "#5c6bc0",
  "#6ebbfa",
  "#26c6da",
  "#9ccc65",
  "#d3b21d",
  "#ffb74d"
];

const App = () => {
  const twitLink =
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";
  const tumblrLink =
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=";
  const tumblrShareSourceLink =
    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
  const [quotation, setQuotation] = useState("Easy-peasy, lemon squeezy");
  const [quotationGot, setQuotationGot] = useState(false);
  const [quotationArr, setQuotationArr] = useState(null);
  const [author, setAuthor] = useState("King Arthur");
  const [bgColor, setBgColor] = useState("gray");
  const [textVisibility, setTextVisibility] = useState(false);
  const [twitterShareLink, setTwitterShareLink] = useState(
    twitLink + encodeURIComponent('"' + quotation + '" ' + author)
  );
  const [tumblrShareLink, setTumblrShareLink] = useState(
    tumblrLink +
      encodeURIComponent(author) +
      "&content=" +
      encodeURIComponent(quotation) +
      tumblrShareSourceLink
  );

  const cardStyle = {
    maxWidth: "550px",
    minWidth: "550px",
    width: "550px"
  };

  const btnStyle = {
    backgroundColor: bgColor,
    border: "none",
    boxShadow: "none"
  };

  //bindNewQuotation
  const bindNewQuotation = (result) => {
    if (!textVisibility) {
      setTextVisibility(true);
      let quotationCollection;
      if (quotationGot) {
        quotationCollection = quotationArr;
      } else {
        quotationCollection = result;
      }
      const randomNumber = Math.floor(Math.random() * 102);
      let currentQuotation = quotationCollection.quotes[randomNumber].quote;
      let currentAuthor = quotationCollection.quotes[randomNumber].author;
      setQuotation(currentQuotation);
      setAuthor(currentAuthor);
      setBgColor(colorArray[Math.floor(Math.random() * 10)]);
      setTwitterShareLink(
        twitLink +
          encodeURIComponent('"' + currentQuotation + '" ' + currentAuthor)
      );
      setTumblrShareLink(
        tumblrLink +
          encodeURIComponent(currentAuthor) +
          "&content=" +
          encodeURIComponent(currentQuotation) +
          tumblrShareSourceLink
      );
    }
  };
  //getQotation function
  const getQuotation = () => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setQuotationArr(result);
          setQuotationGot(true);
          bindNewQuotation(result);
        },
        (error) => {
          console.log("error");
        }
      );
  };

  useEffect(() => {
    //get quotations array from server
    getQuotation();
  }, []);
  return (
    <div>
      <Container
        id="quote-box"
        fluid
        className="vh-100 d-flex align-items-center uniqueContainer"
        style={{ backgroundColor: bgColor }}
      >
        <Row>
          <Col className="d-flex justify-content-center">
            <Card style={cardStyle}>
              <Card.Body
                className={textVisibility && "elementFadeIn"}
                onAnimationEnd={() => {
                  setTextVisibility(false);
                }}
                style={{ color: bgColor }}
              >
                <Card.Title id="text" className="text-center">
                  '{quotation}
                </Card.Title>
                <Card.Text id="author" className="text-right">
                  {"- " + author}
                </Card.Text>
              </Card.Body>
              <Card.Body className="d-flex">
                <Col>
                  <a
                    id="tweet-quote"
                    href={twitterShareLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="mr-2" style={btnStyle}>
                      tw
                    </Button>
                  </a>
                  <Button
                    onClick={(e) => {
                      console.log(tumblrShareLink);
                      e.preventDefault();
                      window.open(tumblrShareLink, "_blank");
                    }}
                    style={btnStyle}
                  >
                    tu
                  </Button>
                </Col>
                <Button
                  id="new-quote"
                  style={btnStyle}
                  onClick={bindNewQuotation}
                >
                  New quote
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
