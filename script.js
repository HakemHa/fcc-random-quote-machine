import React from "react";
import { createRoot } from "react-dom/client";
import getRandomLocal from "./quotes.js"


const container = document.getElementById("root");
const root = createRoot(container);
let pool = [];
let currQuote = ["", ""];
let tweet = () =>
`x.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
`"${currQuote[0]}" ${currQuote[1]}`)
}`;
let COLORS = [
"#735cb0",
"#00a4ef",
"#6ab43e",
"#e89d41",
"#fd4084",
"#ee1166",
"#ff679a",
"#00bbdc",
"#ff7721",
"#0077dd",
"#fb6107",
"#f3de2c",
"#7cb518",
"#5c8001",
"#fbb02d",
"#b24a20",
"#c16e4d",
"#d19279",
"#e0b7a6",
'#34c227'];


root.render( /*#__PURE__*/
React.createElement(React.StrictMode, null, /*#__PURE__*/
React.createElement(App, null), /*#__PURE__*/
React.createElement("a", { id: "github", href: "https://github.com/HakemHa", target: "_blank" }, "by HakemHa")));




changeQuote();

const TWITTER = /*#__PURE__*/
React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  "shapeRendering": "geometricPrecision",
  "textRendering": "geometricPrecision",
  "imageRendering": "optimizeQuality",
  "fillRule": "evenodd",
  "clipRule": "evenodd",
  viewBox: "0 0 512 462.799" }, /*#__PURE__*/

React.createElement("path", {
  fill: "#fff",
  "fillRule": "nonzero",
  d: "M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" }));




function App() {
  return /*#__PURE__*/(
    React.createElement("div", { id: "quote-box" }, /*#__PURE__*/
    React.createElement("div", { id: "text-author" }, /*#__PURE__*/
    React.createElement("div", { id: "text-block" }, /*#__PURE__*/
    React.createElement(TextBox, { id: "text", value: "The unexamined life is not worth living" })), /*#__PURE__*/

    React.createElement("div", { id: "author-block" }, /*#__PURE__*/
    React.createElement(TextBox, { id: "author", value: "~ Socrates" }))), /*#__PURE__*/


    React.createElement("div", { id: "tweet-new" }, /*#__PURE__*/
    React.createElement("a", { id: "tweet-quote", href: tweet(), target: "_blank" }, /*#__PURE__*/
    React.createElement(Button, { value: TWITTER })), /*#__PURE__*/

    React.createElement(Button, { id: "new-quote", onClick: changeQuote, value: "New Quote" }))));



}

function TextBox(props) {
  return /*#__PURE__*/React.createElement("p", { id: props.id }, props.value);
}

function Button(props) {
  let tid = props.id || React.useId();
  return /*#__PURE__*/(
    React.createElement("button", { id: tid, className: "button", onClick: props.onClick },
    props.value));


}

async function changeQuote() {
  let reloadQuote = getRandomQ();
  let text = document.getElementById("text");
  let author = document.getElementById("author");
  let newQuote;
  let m = (1 - 2) / (500 - 200);
  let c = 2 - m * 200;
  if (pool.length > 1) {
    newQuote = pool[0 + Math.floor(pool.length * Math.random())];
    let newBack = COLORS[0 + Math.floor(COLORS.length * Math.random())];
    container.style.background = newBack;
    container.style.color = newBack;
    document.querySelectorAll(".button").forEach(btn => btn.style.background = newBack);
  } else {
    await reloadQuote.then(ans => {
      newQuote = ans;
      text = document.getElementById("text");
      author = document.getElementById("author");
      text.innerText = '"' + newQuote[0] + '"';
      author.innerText = newQuote[1];
      currQuote = newQuote;
      document.getElementById("tweet-quote").href = tweet();
      return newQuote;
    });
  }
  let words = newQuote[0].split("").length + newQuote[0].split(/\r\n|\r|\n/).length * 80;
  let newSize = Math.max(1, Math.min(2, m * words + c));
  document.getElementById('text').style.fontSize = `${newSize}rem`;
  text.innerText = '"' + newQuote[0] + '"';
  author.innerText = newQuote[1];
  let quoteBox = document.getElementById('quote-box');
  let blockHeight = quoteBox.offsetHeight;
  let screenHeight = window.innerHeight;
  if (window.innerWidth <= 800) {
    quoteBox.style.marginTop = `${screenHeight * 0.8 - blockHeight}px`;
  } else {
    quoteBox.style.marginTop = `${screenHeight / 2 - blockHeight}px`;
  }
  currQuote = newQuote;
  document.getElementById("tweet-quote").href = tweet();
  return newQuote;
}

async function getQ(n = 1) {
  let ans;
  try {
    ans = fetch(
      `https://valuesofthewise.com/wisdom-quote-search-engine/?keyword=+&author=&gender=&eth=&search_quotes=Search&pages=${n}&skip=0&pageno=2`
    ).
    then(data => data.text()).
    then(str => new window.DOMParser().parseFromString(str, "text/html")).
    then(doc => doc.querySelectorAll(".result_list")).
    then(quotes => {
      let ans = [];
      quotes.forEach(div => {
        let quote = div.querySelector(".desc").innerText;
        let author = div.querySelector(".author").innerText;
        ans.push([quote, author]);
      });
      return ans;
    });
    return ans;
  } catch (error) {
    return [getRandomLocal()];
  }
}
//let count = new Set();
//let file = '['
async function getRandomQ() {
  let ans = [];
  let i = Math.floor(1 + 674 * Math.random());
  await getQ(i).then(res => res.length > 0 ? ans = res : ans = [getRandomLocal()]).catch(er => ans = [getRandomLocal()]);
  // if (!count.has(i)) {
  //   console.log("Got for", i, "quotes", `\n`);
  //   count.add(i);
  //   file += '[' + ans.map(a => '"' + a.join("\" , \"") + '"').join("], [") + ']';
  // }
  // if (count.size > 10) {
  //   console.log("File is ready.");
  //   file += ']';
  //   console.log(file);
  // }
  let newPool = [];
  for (let k = 0; k < 5; k++) {
    if(pool.length > 1) {
      newPool.push(pool[0 + Math.floor(pool.length * Math.random())]);
    }
  }
  for (let k = 0; k < 25; k++) {
    if(ans.length > 1) {
      newPool.push(ans[0 + Math.floor(ans.length * Math.random())]);
    }
  }
  pool = newPool;
  let j = Math.floor(0 + ans.length * Math.random());
  if (ans[j] === undefined) {
    return ["The unexamined life is not worth living", "~ Socrates"];
  }
  return ans[j];
}
