class MyFileReader{

	constructor(classname,container,removeBtnClassName){
		this.dropArea = document.querySelector("."+container+"."+classname);
		this.dragAndDropBox = document.querySelector("."+container+" .drag-and-drop-box");
		this.dragAndDropTitle = this.dragAndDropBox.querySelector(".drag-and-drop-title");
		console.log(this.dragAndDropBox.querySelector(".drag-and-drop-title"))
		this.files = [];
		this.removeBtnClassName = removeBtnClassName;
		
		this.dropArea.addEventListener("dragover",function(event){
			event.preventDefault();

			this.dragAndDropTitle.style.transition = "1s";
			this.dragAndDropTitle.textContent = dargAndDropTitleDragged;
			// console.log("dragged");
		}.bind(this));

		this.dropArea.addEventListener("dragleave",function(event){
			event.preventDefault();

			this.dragAndDropTitle.style.transition = "1s";
			this.dragAndDropTitle.textContent = dargAndDropTitleMain;

			// console.log("dragged");
		}.bind(this));
		// console.log(this.dragAndDropBox);
		this.dragAndDropBox.addEventListener("mouseover",function(event){
			
			this.dragAndDropTitle.style.transition = "1s";
			this.dragAndDropTitle.style.fontSize = "24px";

		}.bind(this));

		this.dragAndDropBox.addEventListener("mouseleave",function(event){
			
			this.dragAndDropTitle.style.transition = "1s";
			this.dragAndDropTitle.style.fontSize = "18px";

		}.bind(this));

		this.dragAndDropTitle.addEventListener('click',function(event){

			this.dropArea.querySelector("input[type='file']").click()
		}.bind(this))

		this.dropArea.addEventListener("drop", function(event){
	      	event.preventDefault(); //preventing from default behaviour
	      	
	      	// file = event.dataTransfer.files[0];
	      	let file = event.dataTransfer.files[0];
	      	
	      	this.files.push(event.dataTransfer.files[0]);
	      	this.showFile(file);
	      	console.log(this.files);
	      	this.dragAndDropTitle.textContent = dargAndDropTitleMain;
	    }.bind(this));
	}

	showFile(file){
		
		let fileType = file.type;
		let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; 

		if(validExtensions.includes(fileType)){ 
	        let fileReader = new FileReader(); 
			fileReader.onload = ()=>{
				let fileURL = fileReader.result;
				let image = 
					`<div class="dropped-image" style="width: 200px;border: 0px dashed lightgrey;border-radius: 0px;margin:5px;">
						<img src="${fileURL}" style="width:100%" alt="">
						<button class="${this.removeBtnClassName}" style="padding:0;border:none;outline:none;">${removeBtnText}</button>
					</div>`; 
				let droppedImage = this.dropArea.querySelectorAll(".dropped-image");
				// console.log(droppedImage);
				droppedImage[droppedImage.length-1].after(this.toNodes(image));
				let removeBtns = document.querySelectorAll("."+this.removeBtnClassName);
	       		// console.log(removeBtns);
	       		let ri = removeBtns.length-1
	       		removeBtns[removeBtns.length-1].addEventListener('click',function(event){
	       			event.preventDefault();
	       			// console.log(removeBtns.length-1);
	       			// console.log(event.target.parentElement);
	       			this.files.splice(ri,1);
	       			event.target.parentElement.parentElement.remove();
	       		}.bind(this));

	       		fileReaderAfterLoad();
			}	
       		fileReader.readAsDataURL(file);

       		
		}else{
			alert("This is not an Image File!");
		// dropArea.classList.remove("active");
		// dragText.textContent = "Drag & Drop to Upload File";
		}
	}

	toNodes(html){
		return new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];
	}

	getFiles(){
		return this.files;
	}

	getFileDropAreaNode(){

		return this.dropArea;
	}
}