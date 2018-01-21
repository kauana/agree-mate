import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';
 
import { Agreements } from '../api/agreements.js';

import { ShoppingList } from '../api/shopping.js';

import { Users } from '../api/users.js';
 
import './body.html';

import './agreement.html';

import './shopping.html';

import './rent.html';

import './tasks.html';

Template.body.helpers({

});

Template.body.events({
  'click .nav-button'(e) {

 	var id = e.target.parentElement.id;
 	var id2 = e.target.id;

    if(id == "agreement" || id2 == "agreement") {
    	document.getElementById("agreement-page").classList.remove("page");
    } else if(id == "shopping-list" || id2 == "shopping-list") {
    	document.getElementById("shopping-page").classList.remove("page");
    } else if(id == "tasks") {
    	document.getElementById("tasks-page").classList.remove("page");
    } else {

    }

    document.getElementById("main").style.display = 'none';
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
		document.getElementById("agreement-page").classList.add("page");
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

  'click #cancel-agreement'(e) {

  		// Clear form
    	document.getElementById("title-input").value = '';
    	document.getElementById("description-input").value = '';

  		document.getElementById("new-agreement-popup").style.display = 'none';
  }
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

	 	agreedMembers = Template.currentData().agreedMembers;
	 	agreedMembers.push(String(Meteor.userId()));

	 	agreements = Agreements.find().fetch();
	 	var id;

	 	for (var i = agreements.length - 1; i >= 0; i--) {

	 		if(agreements[i]._id == idString) {
	 			id = agreements[i]._id;
	 		}
	 	}

	 	Agreements.update(id, {
	      $set: { agreedMembers: agreedMembers },
	    });


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

Template.shoppingPage.helpers({
	shoppingList() {
    	return ShoppingList.find({});
	},
});

Template.shoppingPage.events({
	'click #addAgreement'() {
		document.getElementById("new-item-popup").style.display = 'block';
	},

	'click #back'(e) {
		document.getElementById("shopping-page").classList.add("page");
		document.getElementById("main").style.display = 'block';
	},

	'click #addItem'(e) {
		// Prevent default browser form submit
    	event.preventDefault();
 
    	// Get value from form element
    	const itemName = document.getElementById("new-item-input").value;

    	// Insert a task into the collection
	    ShoppingList.insert({
	    	name: itemName,
	    	bought: false,
	    	createdAt: new Date(),
	    	pitchedIn: [],
	    	type: "essential",
	    	price: 0,
   		});
 
    	// Clear form
    	document.getElementById("new-item-input").value = '';
    	
	}
});

Template.tasksPage.helpers({

  tasksPage() {
    return tasksPage.find({});
  },

});

Template.tasksPage.events({
        'click #addTask'() {
                document.getElementById("new-item-popup").style.display = 'block';
        },

        'click #back'(e) {
                document.getElementById("tasks-page").classList.add("page");
                document.getElementById("main").style.display = 'block';
        },
});

 
Template.item.events({
   'click #addItem'() {
        document.getElementById("new-item-popup").style.display = 'block';
    },

    'click #back'(e) {
        document.getElementById("shopping-page").classList.add("page");
        document.getElementById("main").style.display = 'block';

     },

    'click .item-checkbox'(e){
	 	

    	var idString = e.target.id;
    	// idString = idString.slice(10,idString.indexOf("\")"));

	 	var list = ShoppingList.find({}).fetch();
	 	var id;

	 	for (var i = list.length - 1; i >= 0; i--) {
	 		if(list[i]._id  == idString) {
	 			id = list[i]._id;
	 		}
	 	}



	 	if(e.target.checked) {
			ShoppingList.update(id, {
			    $set: { bought: true, purchasedBy: String(Meteor.userId()) },
	   		 });
	 	} else {
	 		ShoppingList.update(id, {
			    $set: { bought: false, purchasedBy: "" },
	   		});
	 	}
	 	

     },

    'submit #new-item-form'(event) {

	}
     // Prevent default browser form submit
     // event.preventDefault();


     	// Get value from form element

    	// const target = event.target;

    	// const item = target.item.value;

     //  const type = target.type.value;

   	//If it's an extra item person who added is immediately pitched in



    	// Insert a task into the collection

     //  shoppingList.insert({

     //    item: item,

     //    type: type,

     //  	bought : false,

     //  	pitchedIn: [String(Meteor.userId())], //add user who added item if extra item

     //  	createdAt : new Date(),

   		// });

    

      // Clear form

      // target.title.value = '';

      // target.description.value = '';





      //hide pop-up

      // document.getElementById("new-agreement-popup").style.display = 'none';    

  });

    



