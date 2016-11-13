//Fonctions pour les animations du scroll horizontal
	function goScrollLeft(scrollingElement,scrollLeftDestination,timeTaken,pixelPerFrame) { 
		var scrollLeftPosition = scrollingElement.scrollLeft;
		var dist = scrollLeftDestination-scrollLeftPosition;
		var animationSpeed = (timeTaken*pixelPerFrame)/(dist);
		var intervalId = setInterval(frame, animationSpeed);
		function frame() { 
			if(scrollingElement.scrollLeft == scrollLeftDestination) { 
				clearInterval(intervalId);
			}
			else if(dist>=0) {
				if(scrollingElement.scrollLeft >= (scrollLeftDestination - pixelPerFrame)) { 
					scrollingElement.scrollLeft = scrollLeftDestination;
				}
				else { 
				scrollLeftPosition = scrollLeftPosition + pixelPerFrame;
				scrollingElement.scrollLeft = scrollLeftPosition;
				}
			}
			else if (dist<0) { 
				if(scrollingElement.scrollLeft <= (scrollLeftDestination + pixelPerFrame)) { 
					scrollingElement.scrollLeft = scrollLeftDestination;
				}
				else { 
				scrollLeftPosition = scrollLeftPosition - pixelPerFrame;
				scrollingElement.scrollLeft = scrollLeftPosition;
				}				
			}
			else {}
		}
	}

//Fonctions pour les animations de collapse (utilisant des classes CSS), tout ça tout ça
	function topCollapse(DOMElement) { 
		DOMElement.style.top = "-100%";
		DOMElement.style.zIndex = viewZIndex + 10;
		DOMElement.classList.remove("topHiding");		
		DOMElement.classList.add("topCollapsing");
		viewZIndex = viewZIndex + 10;
		viewSuperpositionTab.length += 1;
		viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
	}

	function topHide(DOMElement) { 
		DOMElement.classList.remove("topCollapsing");
		DOMElement.classList.add("topHiding");
		setTimeout(function() { 
			DOMElement.style.zIndex = viewZIndex - 20;
			DOMElement.style.top = "0%";
		} ,650);
		viewZIndex = viewZIndex - 10;
		viewSuperpositionTab.length -= 1;
	}

	function bottomCollapse(DOMElement) { 
		DOMElement.style.top = "100%";
		DOMElement.style.zIndex = viewZIndex + 10;
		DOMElement.classList.remove("bottomHiding");		
		DOMElement.classList.add("bottomCollapsing");
		viewZIndex = viewZIndex + 10;
		viewSuperpositionTab.length += 1;
		viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
	}

	function bottomHide(DOMElement) { 
		DOMElement.classList.remove("bottomCollapsing");
		DOMElement.classList.add("bottomHiding");
		setTimeout(function() { 
			DOMElement.style.zIndex = viewZIndex - 20;
			DOMElement.style.top = "0%";
		} ,650);
		viewZIndex = viewZIndex - 10;
		viewSuperpositionTab.length -= 1;
	}

	function rightCollapse(DOMElement) { 
		DOMElement.style.left = "100%";
		DOMElement.style.zIndex = viewZIndex + 10;
		DOMElement.classList.remove("rightHiding");		
		DOMElement.classList.add("rightCollapsing");
		viewZIndex = viewZIndex + 10;
		viewSuperpositionTab.length += 1;
		viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
	}

	function rightHide(DOMElement) { 
		DOMElement.classList.remove("rightCollapsing");
		DOMElement.classList.add("rightHiding");
		setTimeout(function() { 
			DOMElement.style.zIndex = viewZIndex - 20;
			DOMElement.style.left = "0%";
		} ,650);
		viewZIndex = viewZIndex - 10;
		viewSuperpositionTab.length -= 1;
	}

	function leftCollapse(DOMElement) { 
		DOMElement.style.left = "-100%";
		DOMElement.style.zIndex = viewZIndex + 10;
		DOMElement.classList.remove("leftHiding");		
		DOMElement.classList.add("leftCollapsing");
		viewZIndex = viewZIndex + 10;
		viewSuperpositionTab.length += 1;
		viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
	}

	function leftHide(DOMElement) { 
		DOMElement.classList.remove("leftCollapsing");
		DOMElement.classList.add("leftHiding");
		setTimeout(function() { 
			DOMElement.style.zIndex = viewZIndex - 20;
			DOMElement.style.left = "0%";
		} ,650);
		viewZIndex = viewZIndex - 10;
		viewSuperpositionTab.length -= 1;
	}

	function zIndexShow(DOMElement) { 
		DOMElement.style.left = "0%";
		DOMElement.style.top = "0%";
		DOMElement.style.zIndex = viewZIndex + 10;
		viewZIndex = viewZIndex + 10;
		viewSuperpositionTab.length += 1;
		viewSuperpositionTab[viewSuperpositionTab.length - 1] = DOMElement;
	}

	function zIndexHide(DOMElement) { 
		DOMElement.style.left = "0%";
		DOMElement.style.top = "0%";
		DOMElement.style.zIndex = viewZIndex - 20;
		viewZIndex = viewZIndex - 10;
		viewSuperpositionTab.length -= 1;
	}

//fonctions qui calculent les heights et width d'élements 
	function calcHeight(DOMElement) { 
		var schmurz = window.getComputedStyle(DOMElement).height;
		return parseFloat(schmurz);
	}

	function calcWidth(DOMElement) { 
		var schmurz = window.getComputedStyle(DOMElement).width;
		return parseFloat(schmurz);
	}

//fonction qui retourne un tableau avec tous les éléments d'une classe

	function classTab(className) { 
		return document.getElementsByClassName(className);
	}