// Code javascript
import { data } from "./data.js";
import { generateDialogHTML, generateProductHTML } from "./fonction.js";

// affichage de la liste des produits

const produitsContainer = document.querySelector(".produits");

const dialog = document.querySelector("dialog");

let produitsCarte = [];

//Iniatilisé le nombre de produit
const nombreProduit = document.querySelector(".carte .nombre");

nombreProduit.textContent = produitsCarte.length;
//dialog.showModal();
let produitAfficher = data;
//Loop entre différents éléments

const afficherProduit = (produits) => {
  produits.forEach((produit) => {
    const produitHtml = document.createElement("div");
    produitHtml.classList.add("carte-produit");

    produitHtml.setAttribute("data-id", produit.id);
    // //c'est pour integrer les images dynamiquements
    // const contenuHTML = `<div class="img">
    //   <img src= "${produit.img}" alt=""/>
    // </div>`;

    //on utilise cette autre methode avec le fichier fonction
    produitHtml.innerHTML = generateProductHTML(produit);

    produitsContainer.appendChild(produitHtml);
  });
};

afficherProduit(produitAfficher);

//Rechercker un produit
const input = document.querySelector(".recherche");
input.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const filtre = data.filter((p) => {
    p.nom.toLocaleLowerCase().includes(e.target.value);
  });

  produitsContainer.innerHTML = "";
  //condition pour rendre les produits
  if (filtre.length > 0) {
    afficherProduit(filtre);
  } else {
    const vide = document.createElement("h3");
    vide.textContent = "Aucun produit trouvé 😢";

    produitsContainer.appendChild(vide);
  }
});

// Actions sur les produits

const cartes = document.querySelectorAll(".carte-produit");
cartes.forEach((produit) => {
  produit.addEventListener("click", () => {
    const contenuDialog = document.querySelector(".dialog-menu");
    //Effacer le contenu passé
    contenuDialog && contenuDialog.remove();

    dialog.showModal();

    console.log(produit.dataset);
    const curentproduct = data.filter((p) => p.id == produit.dataset.id)[0];

    const section = document.createElement("section");
    section.classList.add("dialog-menu");
    section.innerHTML = generateDialogHTML(curentproduct);

    dialog.appendChild(section);
    console.log(curentproduct);

    // changer de couleur pour le background des images
    const couleurs = document.querySelectorAll(".color.change");

    couleurs.forEach((couleur, key) => {
      couleur.addEventListener("click", () => {
        const backgroundImg = document.querySelector(".gauche");

        //faire le switch
        switch (key) {
          case 0:
            backgroundImg.style.background = "#ff6b58";
            break;
          default:
            backgroundImg.style.background = "#5f69d5";
            break;
        }
      });
    });

    //Ajouter le produit dans le panier

    const ajouter = document.querySelector(".ajouter");

    const qte = document.querySelector(".qte");
    qte.textContent = 0;

    ajouter.addEventListener("click", () => {
      if (produitsCarte.includes(curentproduct)) {
        const btnText = `<div class="icon"><i class="fa-solid fa-plus"></i></div>
            <p>Ajouter au panier</p>`;
        ajouter.innerHTML = btnText;
        ajouter.classList.remove("ajoute");
        produitsCarte = produitsCarte.filter((p) => p.id !== curentproduct.id);
        nombreProduit.textContent = produitsCarte.length;
      } else {
        //Push une fonction pour ajouter un élément dans un tableau
        produitsCarte.push(curentproduct);
        ajouter.textContent = "Effacer du panier";
        ajouter.classList.add("ajoute");
        nombreProduit.textContent = produitsCarte.length;
        qte.textContent = 1;
      }
    });

    //Tester si une fois le produit existe et afficher directement le message effacer
    if (produitsCarte.includes(curentproduct)) {
      ajouter.textContent = "Effacer du panier";
      ajouter.classList.add("ajoute");
    }
    // Quantité des produits ajoutés dans le panier
    const reduireBtn = document.querySelector(".counter .fa-minus");
    const incrementerBtn = document.querySelector(".counter .fa-plus");

    let qteProduit = produitsCarte.includes(produitsCarte, curentproduct)
      ? 1
      : 0;
    incrementerBtn.addEventListener("click", () => {
      qteProduit = qteProduit + 1;
      qte.textContent = qteProduit;
    });

    //reduire le nombre de produit dasn le panier
    reduireBtn.addEventListener("click", () => {
      qteProduit = qteProduit - 1;
      qte.textContent = qteProduit;
    });
  });
});
console.log(cartes);

// fermer le button de dialog
const close = document.querySelector(".close");

close.addEventListener("click", () => {
  dialog.close();
});
