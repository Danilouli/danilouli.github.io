document.addEventListener("DOMContentLoaded", function() { 


addBgLoadedEv(content_home);
loadOnEvent(outside_loader,content_home,"bgLoaded",1000,"loaderTopHiding",500);

	//Fonctions d'EL, AJAX, pour les différentes parties du site
		//Variables sur #outside_navbar
			TABNavBtns = classTab("outside_navbar_element");
			TABANIMcontent = classTab("ANIMcontent");
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

			TABbtnProps = classTab("content_props_btn");
			TABANIMprops = classTab("ANIMprops");
			TABtotalProps = classTab("content_props_element_prop");

			for(var i = 0; i<TABANIMprops.length; i++) {
				TABANIMprops[i].underObj = new SubjectPage(TABANIMprops[i].getAttribute("subj"),TABANIMprops[i]);
			}

			console.log(TABANIMprops[1].underObj);

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

			//Fonctions de back end et de post et reucp de donneés de #content_props
				//Objet AjaxFunction pour lancer la requête pour récuperer les props qui sont la
					var getProps = new AjaxFunction("GET","https://www.y-europe.org/getProps.php",[],10000,{
						success : function() { receivePropsOnLoad.launchReception();}
					});
				//Objet JSONReception pour recevoir les props au chargement de la page 
					var receivePropsOnLoad = new JSONReception(getProps, function() {getProps.go();},100,{
						success : function() {
							console.log(receivePropsOnLoad.dataReceived);
							//insertAllProps(receivePropsOnLoad.dataReceived);
						}
					});		

				//Objet AjaxFunction pour lancer la requete pour poster la proposition et ramener les nouvelles
					var postProp = new AjaxFunction("POST","https://www.y-europe.org/postProp.php",["mail","password","content","subject","name"],10000,{
						success : function() { receiveActualProps.launchReception();}
					});

				//Objet JSONReception pour recevoir les propositions cherchées 
					var receiveActualProps = new JSONReception(postProp, function() {postProp.go(content_props_secondForm_mailInput.value,content_props_secondForm_passwordInput.value,content_props_form_input.value,content_props_form_subjSelect.value,content_props_form_titleInput.value);},100,{
						success : function() {
							console.log(receiveActualProps.dataReceived);
							insertAllProps(receiveActualProps.dataReceived);
						}
					});

				//Fonctions d'insertion dans #content_props
					function insertAllProps(propsToInsert) {
						for(var i = 0; i<TABANIMprops.length; i++) {
							insertInPropPage(TABANIMprops[i].underObj,propsToInsert);
						}
					}
					function insertInPropPage(subjectPage,propsToInsert) {
						subjPropsToInsert = propsToInsert.extract(function(i) {
							return (propsToInsert[i].subject == subjectPage.subject);
						});
						min = Math.min(subjPropsToInsert.length,35);
						if(min==0) {
							subjectPage.TABpropsName[0].innerHTML = "Aucune proposition sur ce sujet...";
							subjectPage.TABpropsSummary[0].innerHTML = "Ecris en une !";
							for(var i = 1; i<35; i++) {
								try{subjectPage.subjDiv.removeChild(subjectPage.TABprops[i])}catch(err){};
							}
						}
						if(min<35 && min>0) {
							for(var i = min; i<35; i++) {
								try{subjectPage.subjDiv.removeChild(subjectPage.TABprops[i])}catch(err){}
							}
							for(var i = subjectPage.TABprops.length; i < min; i++) {
								divToAppend = subjectPage.TABprops[0].cloneNode(true);
								subjectPage.subjDiv.appendChild(divToAppend);
							}
							subjectPage.TABprops = subjectPage.subjDiv.querySelectorAll(".content_props_element_prop");
							subjectPage.TABpropsName = subjectPage.subjDiv.querySelectorAll(".content_props_element_prop_title_name");
							subjectPage.TABpropsCheck = subjectPage.subjDiv.querySelectorAll(".content_props_element_prop_title_check");
							subjectPage.TABpropsSummary = subjectPage.subjDiv.querySelectorAll(".content_props_element_prop_summary");
							subjectPage.TABpropsVotes = subjectPage.subjDiv.querySelectorAll(".content_props_element_prop_title_voteNumber");
							console.log(subjectPage.TABprops.length,subjectPage.subject);
						}
						for(var i = 0; i < subjectPage.TABprops.length; i++) {
							try {
								nameToInsert = subjPropsToInsert[i].name;
								contentToInsert = subjPropsToInsert[i].content;
								votesToInsert = subjPropsToInsert[i].numberOfVotes;
								subjectPage.TABpropsName[i].innerHTML = nameToInsert;
								subjectPage.TABpropsSummary[i].innerHTML = contentToInsert;
								subjectPage.TABpropsVotes[i].innerHTML = votesToInsert;
							} 
							catch(err){console.log("Erreur d'insertion des props dans les props",i);}
						}
					}

	//Ajout des event listeners
		//ELs sur #outside_navbar
			outside_navbar_homeBtn.addEventListener("click", function() {
				if(hasClass(content_home,"ANIMhome-topHiding")) {
					hideContent();
				}
			},false);

			for(var i = 0; i<TABNavBtns.length; i++) {
				function addBtnEL(btnNum) {
					TABNavBtns[btnNum].addEventListener("click", function() {
						alternateNavBtn(this);
					},false)
				} 
				addBtnEL(i);
			}		

			for(var i = 1; i<TABNavBtns.length; i++) {
				function addMoveEL(btnNum) {
					TABNavBtns[btnNum].addEventListener("click", function() {
						moveContentTo(btnNum);
					},false);
				}
				addMoveEL(i);
			}

		//ELs sur #content_home
			content_home_chevron.addEventListener("click",showJune24,false);

			outside_navbar_24JuneBtn.addEventListener("click",showJune24,false);


		//ELs sur #content_props
			for(var i = 0; i<TABbtnProps.length; i++) {
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
			// },false);
			
},false);