ScreenW = window.innerWidth;
var currentDatas = new Object();

window.addEventListener("load", function() { 

	outside_loader.classList.add("ANIMloader-topHiding");
	setTimeout( function() {
		outside_loader.style.display = "none";
		outside_loader.style.zIndex = "-10";
		outside_loader.style.visibility = "hidden";
	},500);

	function ContentEl(DOMElement) {
		this.el = DOMElement;
		this.style = DOMElement.style;
		this.num = Math.floor(getCSSNumberProperty(DOMElement,"left")/ScreenW);
		this.childs = DOMElement.childNodes;
		this.navBtn = TABoutside_navbar_btns_element[this.num];
	}

	//Fonctions d'EL, AJAX, pour les différentes parties du site
		//Fonctions d'interprétation des données
			function INTcategorize(cat) {
				if(cat == "jv") return "Jeu Vidéo";
				if(cat == "fan") return "Fantasy";
				if(cat == "ani") return "Animes et Mangas";
				if(cat == "other") return "Autre";
			}


		//Fonctions et variables sur #outside
			//Variables sur #outside_navbar
				var TABoutside_navbar_btns_element = classTab("outside_navbar_btns_element");

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

		//Fonctions et variables sur #content
			var TABcontentEl = new Array(classTab("ANIMcontent").length);
			for(var i = 0; i < TABcontentEl.length; i++) {
				TABcontentEl[i] = new ContentEl(classTab("ANIMcontent")[i]);
			}

			
			//Fonctions sur #content_home
				//Fonction pour montrer le site en levant la page d'accueil #content_home
					function showContent() {
						removeAddClass(content_home,"ANIMhome-topReplace","ANIMhome-topHiding");
						removeAddClass(outside_navbar,"ANIMnavbar-resize","ANIMnavbar-shrink");
						removeAddClass(outside_navbar_logo,"ANIMlogo-resize","ANIMlogo-shrink");
						removeAddClass(outside_navbar_soc,"ANIMsoc-resize","ANIMsoc-shrink");
					}
					function hideContent() {
						removeAddClass(content_home,"ANIMhome-topHiding","ANIMhome-topReplace");
						removeAddClass(outside_navbar,"ANIMnavbar-shrink","ANIMnavbar-resize");
						removeAddClass(outside_navbar_logo,"ANIMlogo-shrink","ANIMlogo-resize");
						removeAddClass(outside_navbar_soc,"ANIMsoc-shrink","ANIMsoc-resize");
						for(var i = 0; i<TABcontentEl.length; i++) {
							TABcontentEl[i].isActive = false;
							TABcontentEl[i].navBtn.style.color = "#1B003E";
							TABcontentEl[i].navBtn.style.textShadow = "none";
						}
					}

				//Fonction d'EL pour bouger les différents panels de #content de classe .content_element
					function moveContentTo(contentElNum) {
						for(var j = 0; j<TABcontentEl.length; j++) {
							TABcontentEl[j].style.webkitTransform = "translate3d(-"+ (contentElNum)*100 +"%,0%,0)";
						}	
						if(hasClass(content_home,"ANIMhome-topReplace")) {
							showContent();
						}
					}

			//Fonctions sur #content_pres
				//Fonction pour montrer forcément #content_24June quand on clique sur le chevron			
					function showFirstEl(e) {
						e.preventDefault();
						showContent();
						alternateNavBtn(TABcontentEl[0].num);
						for(var j = 0; j<TABcontentEl.length; j++) {
							TABcontentEl[j].style.webkitTransform = "translate3d(0%,0%,0)";
						}	
					}

			//Fonctions sur #content_arts
				//Préparation des tableaux dans lesquels on insérera les articles
				var TABcontent_arts_cat_art = classTab("content_arts_cat_art"),
					TABcontent_arts_cat_art_name = classTab("content_arts_cat_art_name"),
					TABcontent_arts_cat_art_dateAuthor = classTab("content_arts_cat_art_dateAuthor"),
					TABcontent_arts_cat_art_cat = classTab("content_arts_cat_art_cat");

				var DOMcontent_arts = [];
					for(var i = 0; i< classTab("content_arts_cat").length; i++) {
						DOMcontent_arts[i] = classTab("content_arts_cat")[i].querySelectorAll(".content_arts_cat_art");
						for(var j = 0; j<DOMcontent_arts[i].length; j++) {
							DOMcontent_arts[i][j].nameEL = DOMcontent_arts[i][j].querySelector(".content_arts_cat_art_name");
							DOMcontent_arts[i][j].dateAuthorEL = DOMcontent_arts[i][j].querySelector(".content_arts_cat_art_dateAuthor");
							DOMcontent_arts[i][j].catEL = DOMcontent_arts[i][j].querySelector(".content_arts_cat_art_cat");
						}
					}
				//Fonctions AJAX de récupération de données, et fonctions d'insertion de données dans #content_arts
					//instance AjaxFunction pour la récup des articles 
						var fetchArts = new AjaxFunction("POST","https://www.crabbix.fr/fetchArts.php",[],1000, {
							success: function() { receiveArts.launchReception();}
						})
					//instance JSONReception pour la reception des articles et leur insertion une fois bien reçus
						var receiveArts = new JSONReception(fetchArts, function() {fetchArts.go();},10,{
							success: function() { 
								currentDatas.arts = receiveArts.dataReceived;
								insertArts();
							}
						})
					//fonction d'insertion des preview des articles dans le site
						function insertArts() {
							artsToInsert = currentDatas.arts;
							for(var i = 0; i<4; i++) {
								for(var j = 0; j<artsToInsert[i].length; j++) {
									try {
										DOMcontent_arts[i][j].nameEL.innerHTML = artsToInsert[i][j].title;
										DOMcontent_arts[i][j].dateAuthorEL.innerHTML = "Publié le " + Date.formateIn(artsToInsert[i][j].date,"d/m/y") + " par " + artsToInsert[i][j].writer;
										DOMcontent_arts[i][j].catEL.innerHTML = "Catégorie : " + INTcategorize(artsToInsert[i][j].category);
										DOMcontent_arts[i][j].style["background-image"] = "url(artsBgs/art"+artsToInsert[i][j].ID+".jpg)";
										setCSSProperty(DOMcontent_arts[i][j],"--bgPosY", artsToInsert[i][j].bgPosY + "%");
										function chooseArt(catNumber,artNumber) {
											DOMcontent_arts[catNumber][artNumber].addEventListener("click",function() {
												window.location.href = '../invaders/art.html?id='+artsToInsert[catNumber][artNumber].ID;
											},false);
										}
										chooseArt(i,j); 
									}
									catch(err) { 
										console.log("erreur à l'article ",i);
									}									
								}
							}
						}

			//Fonctions sur #content_picts 
				var TABpictsImg = content_picts.querySelectorAll(".mess_el img");
				var galleryScrollCount = 2;
				var pictLoader = content_picts.querySelector(".mess_loader");
				function galleryELAddPictPrevToImg(galleryImg) {
					galleryImg.addEventListener("click", function() {
						var ratio = galleryImg.width/galleryImg.height;
						if(ratio > 1) content_picts.querySelector(".pictPreview").style["background-size"] = "100% auto";
						else content_picts.querySelector(".pictPreview").style["background-size"] = "auto 100%";
						content_picts.querySelector(".pictPreview").style.top = content_picts.scrollTop + "px";
						content_picts.querySelector(".pictPreview").style.visibility = "visible";
						content_picts.querySelector(".pictPreview").style["background-image"] = 'none';
						content_picts.querySelector(".pictPreview").style["background-image"] = 'url("'+ this.src +'")';
						content_picts.style.overflowY = "hidden";
					},false);			
				}
				//Fonctions AJAX de récupération de données, et fonctions d'insertion de données dans #content_picts
					//instance AjaxFunction pour la récup des premières images
						var fetchPicts = new AjaxFunction("POST","https://www.crabbix.fr/fetchPicts.php",[],1000, {
							success: function() { receivePicts.launchReception();}
						})
					//instance JSONReception pour la reception des premières images et leur insertion une fois bien reçus
						var receivePicts = new JSONReception(fetchPicts, function() {fetchPicts.go();},10,{
							success: function() { 
								currentDatas.picts = receivePicts.dataReceived;
								console.log(currentDatas.picts);
								insertPicts();
							}
						})
					//fonction d'insertion des premières images dans la galerie
						function insertPicts() {
							pictsToInsert = currentDatas.picts;
							for(var i = 0; i<galleryScrollCount; i++) {
								insertPict(pictsToInsert[i],i);
							}
						}
						function insertPict(pict,pictNumber) {
							try {
								galleryElement = content_picts.querySelectorAll(".mess_el")[pictNumber];
								galleryElement.querySelector("img").src = "img/gallery/gal"+pict.ID+"."+pict.ext;	
								galleryElement.querySelector("span").innerHTML = pict.title;								
							}
							catch(err) {console.log("impossible d'ajouter l'image",i);}							
						}

					//instance AjaxFunction pour récupérer les images suivantes lors du scroll
						var fetchFollowingPict = new AjaxFunction("POST","https://www.crabbix.fr/fetchFollowingPict.php",["pictNumber"],10000, {
							success: function() { receiveFollowingPict.launchReception(); },
							wait: function() {
								try {
									content_picts.querySelector(".mess").appendChild(pictLoader);
									pictLoader.style.visibility = "visible";
								}
								catch(err) {pictLoader.style.visibility = "visible";}
							}
						})
					//instance JSONReception pour la reception des images suivantes 
						var receiveFollowingPict = new JSONReception(fetchFollowingPict, function() {fetchFollowingPict.go();},10,{
							success: function() {
								console.log(receiveFollowingPict.dataReceived,currentDatas.picts);
								currentDatas.picts.push(receiveFollowingPict.dataReceived);
								console.log(currentDatas.picts);
								insertFollowingPict();
							}
						})
						function insertFollowingPict() {
							pict = currentDatas.picts[currentDatas.picts.length - 1];
							newImg = content_picts.querySelector(".mess_el").cloneNode(true);
							newImg.querySelector("img").src = "img/gallery/gal"+pict.ID+"."+pict.ext;
							newImg.querySelector("span").innerHTML = pict.title;
							content_picts.querySelector(".mess").appendChild(newImg);
							galleryELAddPictPrevToImg(newImg.querySelector("img"));
							galleryScrollCount++;
							try {content_picts.removeChild(pictLoader);} catch(err){pictLoader.style.visibility = "hidden";}
							if(galleryScrollCount == Math.min(currentDatas.picts[0].ID,30)) {
								try {pictLoader.style.visibility = "hidden";} catch(err) {console.log("erreur")};
							}
						} 


	//Ajout des event listeners
		//ELs sur #outside_navbar		
			for(var i = 0; i<TABcontentEl.length; i++) {
				function addBtnEL(num) {
					TABcontentEl[num].navBtn.addEventListener("mouseover", function() {
						hoverNavBtn(num);
					},false);
					TABcontentEl[num].navBtn.addEventListener("mouseleave", function() {
						if(TABcontentEl[num].isActive != true) {
							leaveNavBtn(num);
						}
					},false);
					TABcontentEl[num].navBtn.addEventListener("click", function() {
						alternateNavBtn(num);
						moveContentTo(num);
						TABcontentEl[num].isActive = true;
						for(var i = 0; i<TABcontentEl.length; i++) {
							if(i != num) {
								TABcontentEl[i].isActive = false;
							}
						}
					},false);
				} 
				addBtnEL(i);
			}		

			outside_navbar_logo.addEventListener("mouseover", function() { 
				this.querySelector("img").setAttribute("src","img/logoHover.png");
			},false);

			outside_navbar_logo.addEventListener("mouseout", function() { 
				this.querySelector("img").setAttribute("src","img/logo.png");
			},false);

		//ELs sur #content_home
			content_home_discover.querySelector("a").addEventListener("click", function(e) { 
				showFirstEl(e);
			},false);

			outside_navbar_logo.querySelector("img").addEventListener("click", function() { 
				hideContent();
			},false);

		//ELs sur #content_pres 
			//pour avoir un déplacement avec les images en bas
				content_pres_arts.addEventListener("click", function() {
					moveContentTo(1);
				},false);

				content_pres_picts.addEventListener("click", function() {
					moveContentTo(2);
				},false);

				content_pres_evs.addEventListener("click", function() {
					moveContentTo(3);
				},false);

		//ELs sur #content_arts 
			fetchArts.go();

		//ELs sur #content_picts 
			for(var i = 0; i<TABpictsImg.length; i++) {
				galleryELAddPictPrevToImg(TABpictsImg[i]);
			}
			content_picts.querySelector(".pictPreview i").addEventListener("click", function() {
				content_picts.querySelector(".pictPreview").style.visibility = "hidden";
				content_picts.style.overflowY = "scroll";
			})
			content_picts.addEventListener("scroll", function() {
				var scrollPos = content_picts.scrollTop/(content_picts.scrollHeight - getCSSNumberProperty(content_picts,"height"));
				if(scrollPos > 0.9 && galleryScrollCount < Math.min(currentDatas.picts[0].ID,30)) {
					fetchFollowingPict.go(currentDatas.picts[0].ID - galleryScrollCount);
				}
			})
			fetchPicts.go();

},false);