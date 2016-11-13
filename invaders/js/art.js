ScreenW = window.innerWidth;
var currentArt = new Object();


document.addEventListener("DOMContentLoaded", function() { 

	function ContentEl(DOMElement) {
		this.el = DOMElement;
		this.style = DOMElement.style;
		this.num = Math.floor(getCSSNumberProperty(DOMElement,"left")/ScreenW);
		this.childs = DOMElement.childNodes;
		this.navBtn = TABoutside_navbar_btns_element[this.num];
	}

	//Fonctions d'interprétation des données
		function INTcategorize(cat) {
			if(cat == "jv") return "Jeu Vidéo";
			if(cat == "fan") return "Fantasy";
			if(cat == "ani") return "Animes et Mangas";
			if(cat == "other") return "Autre";
		}

	//Fonctions d'EL, AJAX, pour les différentes parties du site

		//Fonctions et variables sur #outside
			//Variables sur #outside_navbar
				var TABoutside_navbar_btns_element = classTab("outside_navbar_btns_element");
				var TAGArtCats = document.querySelectorAll("artCat"),
					TAGArtTitle = document.querySelectorAll("artTitle"),
					TAGArtWriter = document.querySelectorAll("artWriter"),
					TAGArtDate = document.querySelectorAll("artDate");

			//Fonctions sur #outside_navbar
				//Fonction de gestion de l'allumage des boutons de la navbar
					function hoverNavBtn(btnNum) {
						TABcontentEl[btnNum].navBtn.style.color = "#310767";
						TABcontentEl[btnNum].navBtn.style.textShadow = "0px 0px 10px white";
					}

					function leaveNavBtn(btnNum) {
						TABcontentEl[btnNum].navBtn.style.color = "#1B003E";
						TABcontentEl[btnNum].navBtn.style.textShadow = "none";						
					}

					function alternateNavBtn(btnNum) {
						for(var i = 0; i<TABcontentEl.length; i++) {
							if(i == btnNum) {
								TABcontentEl[i].isActive = true;
								TABcontentEl[i].navBtn.style.color = "#310767";
								TABcontentEl[i].navBtn.style.textShadow = "0px 0px 10px white";
							}
							else {
								TABcontentEl[i].isActive = false;
								TABcontentEl[i].navBtn.style.color = "#1B003E";
								TABcontentEl[i].navBtn.style.textShadow = "none";
							}
						}
					}

				outside_navbar_logo.addEventListener("mouseover", function() { 
					this.querySelector("img").setAttribute("src","img/logoHover.png");
				},false);

				outside_navbar_logo.addEventListener("mouseout", function() { 
					this.querySelector("img").setAttribute("src","img/logo.png");
				},false);

				art.addEventListener("scroll", function() {
					if(art.scrollTop > 90) {
						removeAddClass(outside_navbar,"ANIMnavbar-resize","ANIMnavbar-shrink");
						removeAddClass(outside_navbar_logo,"ANIMlogo-resize","ANIMlogo-shrink");
						removeAddClass(outside_navbar_soc,"ANIMsoc-resize","ANIMsoc-shrink");
					}
					else if(hasClass(outside_navbar,"ANIMnavbar-shrink")){
						removeAddClass(outside_navbar,"ANIMnavbar-shrink","ANIMnavbar-resize");
						removeAddClass(outside_navbar_logo,"ANIMlogo-shrink","ANIMlogo-resize");
						removeAddClass(outside_navbar_soc,"ANIMsoc-shrink","ANIMsoc-resize");
					}
				},false);

	//Fonction ajax pour récupérer l'article et l'insérer !
		console.log(jsget("id"));
		//instance AjaxFunction pour la récup des articles 
			var fetchArt = new AjaxFunction("GET","https://www.crabbix.fr/fetchArt.php",["artID"],50000, {
				success: function() { receiveArt.launchReception();}
			})
		//instance JSONReception pour la reception des articles et leur insertion une fois bien reçus
			var receiveArt = new JSONReception(fetchArt, function() {fetchArt.go(jsget("id"));},10,{
				success: function() { 
					currentArt = receiveArt.dataReceived;
					console.log("Article à insérer :", currentArt);
					insertArt();
				}
			})
		//fonction d'insertion des preview des articles dans le site
			function insertArt() {
				console.log(currentArt);
				for(var i = 0; i < TAGArtCats.length; i++) {
					TAGArtCats[i].innerHTML = INTcategorize(currentArt.category);
				}
				for(var i = 0; i < TAGArtTitle.length; i++) {
					TAGArtTitle[i].innerHTML = currentArt.title;
				}
				for(var i = 0; i < TAGArtWriter.length; i++) {
					TAGArtWriter[i].innerHTML = currentArt.writer;
				}		
				for(var i = 0; i < TAGArtDate.length; i++) {
					TAGArtDate[i].innerHTML = Date.formateIn(currentArt.date,"d/m/y");
				}					
				art_content.innerHTML = currentArt.content;
				art_wrapper.style["background-image"] = "url(img/artsBgs/art"+currentArt.ID+".jpg)";
			}
			fetchArt.go(jsget("id"));
			
},false);