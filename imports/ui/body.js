import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';
 
import { Agreements } from '../api/agreements.js';

import { Users } from '../api/users.js';
 
import './body.html';

import './agreement.html';

import './shopping.html';

import './rent.html';

import './task.html';

Template.body.helpers({

});

Template.body.events({
  'click .nav-button'(e) {
 	
 	document.getElementById("main").style.display = 'none';

 	var id = e.target.parentElement.id;
    
    if(id == "agreement") {
    	document.getElementById("agreement-page").style.display = 'block';
    } else if(id == "shopping-list") {


    } else if(id == "tasks") {
    	document.getElementById("task-page").style.display = 'block';
    } else {

    }
  },
});



Template.agreementPage.helpers({
	agreements() {
		return Agreements.find({});
	}
});

Template.agreementPage.events({
	'click #addAgreement'() {
		document.getElementById("new-agreement-popup").style.display = 'block';
	},

	'click #back'(e) {
		document.getElementById("agreement-page").style.display = 'none';
		document.getElementById("main").style.display = 'block';
	},

	'submit #new-agreement-form'(event) {
		
    	// Prevent default browser form submit
    	event.preventDefault();
 
    	// Get value from form element
    	const target = event.target;
    	const title = target.title.value;
    	const description = target.description.value;

    	// Insert a task into the collection
	    Agreements.insert({
	    	title: title,
	    	description: description,
	    	approved : false,
	    	agreedMembers: [String(Meteor.userId())],
	    	createdAt : new Date(),
   		});
 
    	// Clear form
    	target.title.value = '';
    	target.description.value = '';


    	//hide pop-up
    	document.getElementById("new-agreement-popup").style.display = 'none';
  },
});

Template.agreement.helpers({
	hasChecked() {
		var ids = Template.currentData().agreedMembers;
		for (var i = ids.length - 1; i >= 0; i--) {

			if(ids[i] == String(Meteor.userId())) {
				return true;
			}
		}

		return false;
	}
});

Template.agreement.events({
	'click #accept-icon'(e) {

	 	var idString = e.target.parentElement.parentElement.id;
	 	idString = idString.slice(10,idString.indexOf("\")"));

	 	agreedMembers = Template.currentData().agreedMembers;
	 	agreedMembers.push(String(Meteor.userId()));

	 	agreements = Agreements.find().fetch();
	 	var id;

	 	for (var i = agreements.length - 1; i >= 0; i--) {
	 		if(String(agreements[i]._id._str) == idString) {
	 			id = agreements[i]._id;
	 		}
	 	}

	 	Agreements.update(id, {
	      $set: { agreedMembers: agreedMembers },
	    });

	 	console.log(agreedMembers.length);
	 	console.log(Users.find().fetch().length);

	    if(agreedMembers.length == Users.find().fetch().length) {
	 		Agreements.update(id, {
		      $set: { approved: true },
		    });
	 	}

	 },
	 'click #deny-icon'(e) {


	 	var idString = e.target.parentElement.parentElement.id;
	 	idString = idString.slice(10,idString.indexOf("\")"));

	 	agreedMembers = Template.currentData().agreedMembers;
	 	agreedMembers.push(String(Meteor.userId()));

	 	agreements = Agreements.find().fetch();
	 	var id;

	 	for (var i = agreements.length - 1; i >= 0; i--) {
	 		if(String(agreements[i]._id._str) == idString) {
	 			id = agreements[i]._id;
	 		}
	 	}

	 	Agreements.remove(id);

	 },
});





