plants = new Array();

class plant {
    constructor(name, ed, pois) {
        this.name = name;
        if (typeof (ed) == "boolean") {
            this.edible = ed;
        }
        else {
            this.edible = false;
        }

        if (typeof (pois) == "boolean") {
            this.poisonous = pois;
        }
        else {
            this.poisonous = false;
        }
    }
}

async function main() {
    const requestURL = "https://api.jsonbin.io/v3/b/654e8b5b12a5d3765997b126";
    const request = new Request(requestURL);
    const response = await fetch(request);
    if (response.ok) {
        const seed = await response.json();
        newPlant(seed.record);
        showHeader();
        showPlant();
    }
    else {
        alert("Error");
    }
}

function newPlant(obj) {
    let seed = obj;
    for (s of seed) {
        let plan = new plant(s.name, s.edible, s.poisonous);
        plants.push(plan);
    }
}

function showHeader() {
    const header = document.querySelector("header");
    const myH1 = document.createElement("h1");
    myH1.innerText = "Мала класифікація рослин";
    header.appendChild(myH1);
}

function showPlant() {
    const main = document.querySelector("article");
    const divEd = document.createElement("div");
    const divnotEd = document.createElement("div");
    const divPois = document.createElement("div");
    const myH2Ed = document.createElement("h2");
    const myH2notEd = document.createElement("h2");
    const myH2Pois = document.createElement("h2");
    myH2Ed.textContent = "Їстівні";
    myH2notEd.textContent = "Не їстівні";
    myH2Pois.textContent = "Отруйні";
    const myListEd = document.createElement("ul");
    const myListnotEd = document.createElement("ul");
    const myListPois = document.createElement("ul");
    plants.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            return 0;
        }
    });    
    for (p of plants) {
        const listItem = document.createElement("li");
        listItem.textContent = p.name;
        if (p.edible) myListEd.appendChild(listItem);
        else if (p.poisonous) myListPois.appendChild(listItem);
        else myListnotEd.appendChild(listItem);
    }
    divEd.appendChild(myH2Ed);
    divEd.appendChild(myListEd);
    divnotEd.appendChild(myH2notEd);
    divnotEd.appendChild(myListnotEd);
    divPois.appendChild(myH2Pois);
    divPois.appendChild(myListPois);
    main.appendChild(divEd);
    main.appendChild(divnotEd);
    main.appendChild(divPois);
}
main();