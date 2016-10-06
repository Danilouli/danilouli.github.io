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
								//TABcontentEl[i].isActive = true;
								TABcontentEl[i].navBtn.style.color = "#310767";
								TABcontentEl[i].navBtn.style.textShadow = "0px 0px 10px white";
							}
							else {
								//TABcontentEl[i].isActive = false;
								TABcontentEl[i].navBtn.style.color = "#1B003E";
								TABcontentEl[i].navBtn.style.textShadow = "none";
							}
						}
					}

		//Fonctions et variables sur #content
			var TABcontentEl = new Array(classTab("ANIMcontent").length);
			for(var i = 0; i < TABcontentEl.length; i++) {
				TABcontentEl[i] = new ContentEl(classTab("ANIMcontent")[i]);
				console.log(TABcontentEl[i].num);
			}

			
			//Fonctions sur #content_home
				//Fonction pour montrer le site en levant la page d'accueil #content_home
					function showContent() {
						removeAddClass(content_home,"ANIMhome-topReplace","ANIMhome-topHiding");
						removeAddClass(outside_navbar,"ANIMnavbar-resize","ANIMnavbar-shrink");
						removeAddClass(outside_navbar_logo,"ANIMlogo-resize","ANIMlogo-shrink");
					}
					function hideContent() {
						removeAddClass(content_home,"ANIMhome-topHiding","ANIMhome-topReplace");
						removeAddClass(outside_navbar,"ANIMnavbar-shrink","ANIMnavbar-resize");
						removeAddClass(outside_navbar_logo,"ANIMlogo-shrink","ANIMlogo-resize");
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

			//Fonctions sur #content_props
				//Variables sur #content_props
				function SubjectPage(subject,subjDiv) {
					this.subject = subject;
					this.subjDiv = subjDiv;
					this.TABprops = subjDiv.querySelectorAll(".content_props_element_prop");
					this.TABpropsName = subjDiv.querySelectorAll(".content_props_element_prop_title_name");
					this.TABpropsCheck = subjDiv.querySelectorAll(".content_props_element_prop_title_check");
					this.TABpropsSummary = subjDiv.querySelectorAll(".content_props_element_prop_summary");
					this.TABpropsVotes = subjDiv.querySelectorAll(".content_props_element_prop_title_voteNumber");
				}

				//Fonction de gestion de l'allumage des boutons pour les différents sujets de propositions sur #content_props
					function alternatePropBtn(btnToKeep) {
						for(var i = 0; i<TABbtnProps.length; i++) {
							if(TABbtnProps[i] == btnToKeep) {
								//TABbtnProps[i].isActive = true;
								TABbtnProps[i].style.color = "#0C2671";
							}
							else {
								//TABbtnProps[i].isActive = false;
								TABbtnProps[i].style.color = "#44537F";
							}
						}
					}

				//Fonction d'EL pour bouger les pages de propositions de classe .content_props_element
					function movePropsTo(btnNum) {
						for(var j = 0; j<TABANIMprops.length; j++) {
							TABANIMprops[j].style.webkitTransform = "translate3d(-"+ btnNum*100 +"%,0%,0)";
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
						console.log(TABcontentEl[num].isActive);
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
			
			// for(var i = 1; i<TABNavBtns.length; i++) {
			// 	function addMoveEL(btnNum) {
			// 		TABNavBtns[btnNum].navBtn.addEventListener("click", function() {
			// 			moveContentTo(btnNum);
			// 		},false);
			// 	}
			// 	addMoveEL(i);
			// }

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

		//ELs sur #content_props
			/*for(var i = 0; i<TABbtnProps.length; i++) {
				function addMoveEL(btnNum) {
					TABbtnProps[btnNum].addEventListener("click", function() {
						movePropsTo(btnNum);
					} ,false);
				}
				addMoveEL(i);
			}

			for(var i = 0; i<TABbtnProps.length; i++) {
				function addBtnEL(btnNum) {
					TABbtnProps[btnNum].addEventListener("click", function() {
						alternatePropBtn(this);
					},false)
				}
				addBtnEL(i);
			}

			//ELs pour faire changer la couleur et l'icone du bouton au survol #content_props_elements_post, faire apparaitre les infos #content_props_element_infos
				content_props_elements_post.addEventListener("mouseover", function() {
					this.querySelector("i").setAttribute("class","fa fa-pencil-square-o");
					removeAddClass(content_props_elements_infos,"hide","show");
				},false);
				content_props_elements_post.addEventListener("mouseout", function() {
					this.querySelector("i").setAttribute("class","fa fa-pencil");
					removeAddClass(content_props_elements_infos,"show","hide");
				},false);

			//ELs pour faire apparaitre les form content_props_form et content_props_secondForm quand on clique #content_props_elements_post
				content_props_elements_post.addEventListener("click", function() {
					this.querySelector("i").setAttribute("class","fa fa-pencil");
					removeAddClass(content_props_elements_infos,"show","hide");	
					removeAddClass(content_props_form,"hide","show");
					switchCSS(content_props_shade,"visibility","hidden","visible");
				},false);
				content_props_form_close.addEventListener("click", function() {
					removeAddClass(content_props_form,"show","hide");
					switchCSS(content_props_shade,"visibility","hidden","visible");			
				},false);

				content_props_form_submit.addEventListener("click", function() {
					removeAddClass(content_props_form,"show","hide");
					removeAddClass(content_props_secondForm,"hide","show");
				},false);
				content_props_secondForm_close.addEventListener("click",function() {
					removeAddClass(content_props_secondForm,"show","hide");
					switchCSS(content_props_shade,"visibility","hidden","visible");
				},false); 

			//ELs Ajax de #content_props, pour poster une prop, et les récup quand on clique sur le bouton des props
				content_props_secondForm_submit.addEventListener("click", function() { 
					postProp.go(content_props_secondForm_mailInput.value,content_props_secondForm_passwordInput.value,content_props_form_input.value,content_props_form_subjSelect.value,content_props_form_titleInput.value);
				}, false); 

				outside_navbar_propsBtn.addEventListener("click", function() {
					getProps.go();
				}, false);

			// TABANIMcontent[2].addEventListener("transitionend",function() {
			// 	console.log("hello");
			// },false);*/
			
},false);