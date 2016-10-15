var ScreenW = window.innerWidth;

document.addEventListener("DOMContentLoaded", function() { 

	function ContentEl(DOMElement) {
		this.el = DOMElement;
		this.style = DOMElement.style;
		this.num = Math.floor(getCSSNumberProperty(DOMElement,"left")/ScreenW);
		this.childs = DOMElement.childNodes;
		this.navBtn = TABoutside_navbar_btns_element[this.num];
	}

	//Fonctions d'EL, AJAX, pour les différentes parties du site

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
				var TABcontent_arts_cat_art = classTab("content_arts_cat_art");
				for(var i = 0; i<TABcontent_arts_cat_art.length; i++) {
					setCSSProperty(TABcontent_arts_cat_art[i],"--bgPosY", (i+1)*100/(TABcontent_arts_cat_art.length) + "%");
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
			//content_home_chevron.addEventListener("click",showJune24,false);

			//outside_navbar_24JuneBtn.addEventListener("click",showJune24,false);

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

				content_pres_vids.addEventListener("click", function() {
					moveContentTo(2);
				},false);

				content_pres_evs.addEventListener("click", function() {
					moveContentTo(3);
				},false);
			
},false);