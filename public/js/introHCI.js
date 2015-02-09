'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

    console.log($(this));
	console.log("User clicked on project " + idNumber);

    var url = "/project/"+idNumber;
    console.log(url);
    $.get(url,addDetails_callback);
}

function addDetails_callback(result){
    console.log("In add_Details_Callback");
    console.log(result);
    console.log(result['id']);
    //$(".details").html(result['summary']);
    //
    var myDiv = $("#project"+result['id']+"1");
    console.log(myDiv);
    //var newid= $(".details").attr('id');
    //console.log(newid);
    //var newnew = $(".details").parent().parent();
    //console.log(newnew);
    //console.log($(this));
    //var detailsID = $(".details").attr('id');
    //console.log(detailsID.substr('project'.length));
    $("#project"+result['id']+"1").html(result['summary']);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {

	console.log("User clicked on color button");
    $.get("/palette", colors_callback);
}

function colors_callback(result){
    console.log(result);
    var colors =  result['colors'];
    console.log(colors[0]);
    console.log(result['colors'][0]);

    $('body').css('background-color', colors[0]);
    $('.thumbnail').css('background-color', colors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
    $('p').css('color', colors[3]);
    $('.project img').css('opacity', .75);

}
