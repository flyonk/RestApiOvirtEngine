const $domBtn = document.querySelector(".domSend");

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

async function domOutParse() {
  const $doms = document.body.getElementsByTagName("*");
  const domArr = [];

  for (const dom of $doms) {
    if (dom.innerHTML === dom.innerText && dom.innerText != "") {
      domArr.push(dom.innerText.replace(/\s+/g, "").replace(/^(.{10000}).+/g, "$1.."));
    }
  }

  const readyArr = unique(domArr);
  // console.log('readyArr: ', readyArr);
  console.log("la");

  let aaPayload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(readyArr),
  };
  // console.log('aaPayload: ', aaPayload);

  // let oFData = new FormData();
  // oFData.append('domArr', JSON.stringify({"data": readyArr}));

  // let aaPayload = {
  //     method: 'POST',
  //     // headers: {
  //     //     'Content-Type': 'application/json;charset=utf-8'
  //     // },
  //     body: oFData
  // };
  // console.log('aaPayload: ', aaPayload);

  const theFetch = await fetch("http://localhost:3333/postdom", aaPayload);

  let result = theFetch;
  // console.log("stringify:", JSON.stringify(readyArr));

  return result;
}

const $td = document.querySelectorAll("td");

if ($td) {
  console.log("go");
  for (const td of $td) {
    const split = td.split(",");
    tdSplit(td);
    console.log(split);
  }
}

function tdSplit(string) {
  setTimeout(() => {
    tdSplit(string);
  }, 111);
  return string.split(",");
}
