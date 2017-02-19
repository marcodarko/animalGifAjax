

var myProject={

	defaultButtons:["Monkey", "Goldfish", "Unicorn", "Boston Terrier", "Panda", "Velociraptor"],
	authKey: "dc6zaTOxFJmzC",

	renderDefaultButtons: function(){

		$("#buttonContainer").empty();
		x = myProject.defaultButtons.length;
		// console.log(myProject.defaultButtons);
		for(i=0; i<x; i++){
			var button= $("<button>");
			button.attr("data-name",myProject.defaultButtons[i]);
			button.text(myProject.defaultButtons[i]);
			// append to HTML
			$("#buttonContainer").append(button);
			// tie event listener to each button
			$(button).on("click", function(event){
		
				var UR=$(this).attr("data-name");
				console.log("Button Clicked: "+UR);
				myProject.GIFrequest(UR);

			});

		};
	},

	renderUserButton: function(userInput){

			myProject.defaultButtons.push(userInput);
			$("#animalInput").val("");
			myProject.renderDefaultButtons();
			
	},

	GIFrequest: function(Userrequest) {
		var key= myProject.authKey;
		var word= encodeURI(Userrequest);
		var queryURL="http://api.giphy.com/v1/gifs/search?q="+word+"&limit=10&fmt=json&rating=pg-13&api_key="+key;
		
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			
			var results= response.data;
			console.log("AJAX response: "+results);
			var z = results.length;
			$("#gifContainer").empty();
			for (var i =0; i < z; i++) {
				var newDiv= $("<div class='picDiv'>");
				var p= $("<p>");
				p.text("Rated: "+results[i].rating);
				var picture= $("<img>");
				picture.attr("src", results[i].images.original_still.url);
				picture.attr("data-still", results[i].images.original_still.url);
				picture.attr("data-animate", results[i].images.original.url);
				picture.attr("data-state", "still");
				picture.addClass("pic");
				newDiv.append(picture);
				newDiv.append(p);
				$("#gifContainer").append(newDiv);
				// ---------Event handler
				$(".pic").on("click", function(event){
					console.log("IMG clicked");
					var state= $(this).attr("data-state")
				 	if(state === "still"){
		                $(this).attr("src", $(this).attr("data-animate"));
		                $(this).attr("data-state", "animate");
		              }
		              else{
		                $(this).attr("src", $(this).attr("data-still"));
		                $(this).attr("data-state", "still");
		              }
				});
				// ---------
			};
		});
	}


};

// _____________________________________
window.onload = function() {

	myProject.renderDefaultButtons();

	$("#submitButton").on("click", function(event){

		// prevents reload of page upon click
		event.preventDefault();
		var y=$("#animalInput").val().trim();
		myProject.renderUserButton(y);
	});


};