import React, { useEffect, useState } from "react";
import styled from "styled-components";
const axios = require("axios").default;

const Translate = () => {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        setOptions(res.data);
      });
  });

  const translate = () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setOutput(res.data.translatedText);
      });
  };

  // curl -X POST "https://libretranslate.com/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  return (
    <>
      <ContainerTranslate>
        <Card>
          <div>
            <Texto>From({from}):</Texto>
            <select
              onChange={(e) => setFrom(e.target.value)}
              onClick={translate}
            >
              {options.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
            <Texto>To ({to}):</Texto>
            <select onChange={(e) => setTo(e.target.value)} onClick={translate}>
              {options.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              cols="50"
              rows="8"
              onChange={(e) => {
                setInput(e.target.value);
                {
                  translate();
                }
              }}
            ></textarea>
          </div>
          <div>
            <textarea cols="50" rows="8" defaultValue={output}></textarea>
          </div>
          <div>
            <button className="custom-btn btn-16" onClick={(e) => translate()}>
              Translate
            </button>
          </div>
        </Card>
      </ContainerTranslate>
    </>
  );
};

export default Translate;

const ContainerTranslate = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
  font-family: Poppins;
  font-weight: 300;
  font-size: 1.5em;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding: 10px;
  }
  select {
    width: 120px;
    height: 30px;
    text-align: center;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(
        245,
        40,
        170,
        0.685
      ); /* color of the scroll thumb */
      border-radius: 10px; /* roundness of the scroll thumb */
      border: 3px solid white; /* creates padding around scroll thumb */
    }
  }
  option {
    padding: 10px;
    background-color: #f4f4f4;
    option:hover {
      color: red;
    }
  }
`;

const Texto = styled.span`
  font-size: 1em;
  padding: 20px;
`;

const Card = styled.div`
  box-shadow: rgba(240, 46, 170, 0.4) -5px 5px,
    rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px,
    rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  border: 1px solid #f3efef;
  .btn-16 {
    border: none;
    color: #000;
  }
  .button:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: -1;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  button {
    margin: 20px;
  }
  .custom-btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  .btn-16 {
    border: none;
    color: #000;
  }
  .btn-16:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    direction: rtl;
    z-index: -1;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
    transition: all 0.3s ease;
  }
  .btn-16:hover {
    color: #000;
  }
  .btn-16:hover:after {
    left: auto;
    right: 0;
    width: 100%;
  }
  .btn-16:active {
    top: 2px;
  }

  textarea {
    font-size: 1rem;
    border: 1px solid rgba(245, 40, 170, 0.685);
    &:focus-visible {
      outline: none;
    }
  }
`;
