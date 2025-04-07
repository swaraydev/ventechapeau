// Code javascript
import { data } from "./data.js";
import { generateDialogHTML, generateProductHTML } from "./fonction.js";

// affichage de la liste des produits

const produitsContainer = document.querySelector(".produits");
const dialog = document.querySelector("dialog");
const nombreProduit = document.querySelector(".nombre");

let produitsCarte = [];

//Iniatilisé le nombre de produit
let curentproduct = null;

nombreProduit.textContent = produitsCarte.length;
let produitAfficher = data;
//dialog.showModal();

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

//Rechercker des produits
const input = document.querySelector(".recherche");
input.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const resultat = data.filter((p) => {
    p.nom.toLocaleLowerCase().includes(e.target.value);
  });

  produitsContainer.innerHTML = "";
  //condition pour rendre les produits
  if (resultat.length > 0) {
    afficherProduit(resultat);
    actionProduit();
  } else {
    const vide = document.createElement("h3");
    vide.textContent = "Aucun produit trouvé 😢";
    produitsContainer.appendChild(vide);
  }
});
//--------------------////////////

// Fonction si toute fois le produit existe dans le panier
const testerSiExiste = (produit, arr) => {
  const ele = arr.find((p) => p.id == produit.id);
  return ele ? true : false;
};

const actionProduit = () => {
  // Actions sur les produits

  const cartes = document.querySelectorAll(".carte-produit");
  cartes.forEach((produit) => {
    produit.addEventListener("click", () => {
      const contenuDialog = document.querySelector(".dialog-menu");
      //Effacer le contenu passé
      contenuDialog && contenuDialog.remove();
      dialog.showModal();

      dialog.scrollTo(0, 0);
      //console.log(produit.dataset);
      const section = document.createElement("section");
      section.classList.add("dialog-menu");
      curentproduct = data.filter((p) => p.id == produit.dataset.id)[0];
      section.innerHTML = generateDialogHTML(curentproduct);
      dialog.appendChild(section);
      //console.log(curentproduct);

      //Ajouter le produit dans le panier

      const ajouter = document.querySelector(".ajouter");

      const qte = document.querySelector(".qte");
      let existedeja = false;
      const numberOfTimeIncart = produitsCarte.filter(
        (p) => p.id === curentproduct.id
      );
      qte.textContent = numberOfTimeIncart.length;

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
      //-------------------

      //Tester si une fois le produit existe et afficher directement le message effacer
      if (testerSiExiste(curentproduct)) {
        ajouter.textContent = "Effacer du panier";
        ajouter.classList.add("ajoute");
        qte.textContent = 1;
      }

      ajouter.addEventListener("click", () => {
        if (testerSiExiste(curentproduct)) {
          const btnText = `<div class="icon"><i class="fa-solid fa-plus"></i></div>
            <p>Ajouter au panier</p>`;
          ajouter.innerHTML = btnText;
          ajouter.classList.remove("ajoute");
          produitsCarte = produitsCarte.filter(
            (p) => p.id !== curentproduct.id
          );
          nombreProduit.textContent = produitsCarte.length;
        } else {
          ajouter.textContent = "Effacer du panier";
          ajouter.classList.add("ajoute");
          nombreProduit.textContent = produitsCarte.length;
          qte.textContent = 1;
          console.log(produitsCarte);
          existedeja = true;
          //Push une fonction pour ajouter un élément dans un tableau
          produitsCarte.push(curentproduct);
        }
        ajouter.textContent = produitsCarte.length;
        console.log(ajouter.dataset);
      });
      const backgroundImg = document.querySelector(".gauche");
      // changer de couleur pour le background des images
      const couleurs = document.querySelectorAll(".color.change");
      couleurs.forEach((couleur, key) => {
        couleur.addEventListener("click", () => {
          //faire le switch
          switch (key) {
            case 0:
              backgroundImg.style.background = "#ff6b58";
              break;
            case 1:
              backgroundImg.style.background = "#3333";
              console.log(key);
            case 2:
              backgroundImg.style.background = "#5f69d5";
            default:
              break;
          }
        });
      });
    });
  });
};
actionProduit();

// fermer le button de dialog
const close = document.querySelector(".close");
close.addEventListener("click", () => {
  dialog.close();
});
