import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

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
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freeCodeCamp&text=";
  const tumblrLink =
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=";
  const tumblrShareSourceLink = "&canonicalUrl=" + window.location.href;
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
    width: "550px",
    backgroundColor: "white"
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
          encodeURIComponent(
            '"' +
              currentQuotation +
              '" ' +
              currentAuthor +
              " " +
              window.location.href +
              " #freeCodeCamp"
          )
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
    <div
      fluid
      className="vh-100 d-flex align-items-center uniqueContainer p-0"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-100 d-flex justify-content-center">
        <div id="quote-box" className="quoteCart" style={cardStyle}>
          <div
            className={textVisibility && "elementFadeIn"}
            onAnimationEnd={() => {
              setTextVisibility(false);
            }}
            style={{ color: bgColor }}
          >
            <div id="text" className="text-center">
              <i className="fa fa-quote-left mr-2"> </i>
              {quotation}
            </div>
            <div id="author" className="text-right">
              {"- " + author}
            </div>
          </div>
          <div className="d-flex">
            <div>
              <a
                id="tweet-quote"
                href={twitterShareLink}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="mr-2" style={btnStyle}>
                  <i className="fa-brands fa-twitter"></i>
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
                <i className="fa-brands fa-tumblr"></i>
              </Button>
            </div>
            <Button id="new-quote" style={btnStyle} onClick={bindNewQuotation}>
              New quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
