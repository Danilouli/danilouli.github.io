document.addEventListener("DOMContentLoaded", function() { 

	//Fonctions d'EL, AJAX, pour les différentes parties du site
		//Variables sur #outside_navbar

		//Fonctions sur #outside_navbar
			//Fonction de gestion de l'allumage des boutons de la navbar
				function alternateNavBtn(btnToKeep) {
					for(var i = 0; i<TABNavBtns.length; i++) {
						if(TABNavBtns[i] == btnToKeep) {
							TABNavBtns[i].isActive = true;
							TABNavBtns[i].style.color = "#EBC400";
						}
						else {
							TABNavBtns[i].isActive = false;
							TABNavBtns[i].style.color = "rgb(240,240,240)";
						}
					}
				}

		//Fonctions sur #content_home
			//Fonction pour montrer le site en levant la page d'accueil #content_home
				function showContent() {
					content_home.classList.remove("ANIMhome-topReplace");
					content_home.classList.add("ANIMhome-topHiding");
					content_home.classList.remove("ANIMhome-opacify");
					content_home.classList.add("ANIMhome-unopacify");
					content_home_chevron.classList.remove("ANIMchevron-show");
					content_home_chevron.classList.remove("ANIMchevron-moving");
					content_home_chevron.classList.add("ANIMchevron-hide");
				}
				function hideContent() {
					removeAddMultipleClasses(content_home,["ANIMhome-unopacify","ANIMhome-topHiding"],["ANIMhome-opacify","ANIMhome-topReplace"]);
					removeAddMultipleClasses(content_home_chevron,["ANIMchevron-hide"],["ANIMchevron-show","ANIMchevron-moving"]);
				}

			//Fonction d'EL pour bouger les différents panels de #content de classe .content_element
				function moveContentTo(btnNum) {
					for(var j = 0; j<TABANIMcontent.length; j++) {
						TABANIMcontent[j].style.webkitTransform = "translate3d(-"+ (btnNum-1)*100 +"%,0%,0)";
					}	
					if(hasClass(content_home,"ANIMhome-topReplace")) {
						showContent();
					}
				}

		//Fonctions sur #content_24June
			//Fonction pour montrer forcément #content_24June quand on clique sur le chevron			
				function showJune24(e) {
					e.preventDefault();
					showContent();
					alternateNavBtn(outside_navbar_24JuneBtn);
					for(var j = 0; j<TABANIMcontent.length; j++) {
						TABANIMcontent[j].style.webkitTransform = "translate3d(0%,0%,0)";
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
							TABbtnProps[i].isActive = true;
							TABbtnProps[i].style.color = "#0C2671";
						}
						else {
							TABbtnProps[i].isActive = false;
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
			/*for(var i = 0; i<TABNavBtns.length; i++) {
				function addBtnEL(btnNum) {
					TABNavBtns[btnNum].addEventListener("click", function() {
						alternateNavBtn(this);
					},false)
				} 
				addBtnEL(i);
			}		
			*/
			/*for(var i = 1; i<TABNavBtns.length; i++) {
				function addMoveEL(btnNum) {
					TABNavBtns[btnNum].addEventListener("click", function() {
						moveContentTo(btnNum);
					},false);
				}
				addMoveEL(i);
			}*/

			outside_navbar_logo.addEventListener("mouseover", function() { 
				this.querySelector("img").setAttribute("src","img/logoHover.png");
			},false);

			outside_navbar_logo.addEventListener("mouseout", function() { 
				this.querySelector("img").setAttribute("src","img/logo.png");
			},false);

		//ELs sur #content_home
			//content_home_chevron.addEventListener("click",showJune24,false);

			//outside_navbar_24JuneBtn.addEventListener("click",showJune24,false);

			content_home_discover.querySelector("a").addEventListener("click", function() { 
				removeAddClass(content_home,"ANIMhome-topReplace","ANIMhome-topHiding");
				removeAddClass(outside_navbar,"ANIMnavbar-resize","ANIMnavbar-shrink");
				removeAddClass(outside_navbar_logo,"ANIMlogo-resize","ANIMlogo-shrink");
			},false);

			outside_navbar_logo.querySelector("img").addEventListener("click", function() { 
				removeAddClass(content_home,"ANIMhome-topHiding","ANIMhome-topReplace");
				removeAddClass(outside_navbar,"ANIMnavbar-shrink","ANIMnavbar-resize");
				removeAddClass(outside_navbar_logo,"ANIMlogo-shrink","ANIMlogo-resize");
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