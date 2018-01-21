import { Template } from 'meteor/templating';
 
import { Agreements } from '../api/agreements.js';
 
import './body.html';

import './agreement.html';

import './shopping.html';

import './rent.html';

import './task.html';

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

Template.agreement.helpers({
	approvedColor() {
		return "#e65d25";
	},

	pendingColor() {
		return "#eee";
	}
});





