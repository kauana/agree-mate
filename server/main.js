import { Meteor } from 'meteor/meteor';

import '../imports/api/agreements.js';	

import { Accounts } from 'meteor/accounts-base';

import '../imports/api/users.js';

import { Users } from '../imports/api/users.js'; 

Accounts.onCreateUser((options, user) => {
  // user.cadenas = [];  //contains list of cadena id's that user is member of
  // user.invites = [];  //contains list of cadena id's that user is invited to
  // user.invested = 0;  //invested balance (not available until person taking it out pays it back) -- (includes cadena contributions and extra contributions)
  // user.available = 0; //available balance (can be retrieved at any time)
  // user.loans = []; //contains loan objects -- (date created, date due, amount owed left, payment interval, payment amount)

  Users.insert(user);
  return user;
});

Meteor.methods({
	'insertAgreement': function(doc) {
		return Agreements.insert(doc);
	},

	// 'updateCadenaMembers': function(cadenaId, userId) {
	// 	var currentCadena = Cadenas.find({_id: cadenaId}).fetch()[0];
	// 	currentCadena.members.push(userId);
	// 	return Cadenas.update({_id: cadenaId},{$set: {members: currentCadena.members}});
	// },

	// 'updateCadenaInvites': function(cadenaId, userId) {
	// 	var currentCadena = Cadenas.find({_id: cadenaId}).fetch()[0];
	// 	currentCadena.invited.push(userId);
	// 	return Cadenas.update({_id: cadenaId},{$set: {invited: currentCadena.invited}});
	// },

	// 'deleteCadenaInvite': function(cadenaId, userId) {
	// 	var currentCadena = Cadenas.find({_id: cadenaId}).fetch()[0];
	// 	var index = currentCadena.invited.indexOf(userId);
	// 	currentCadena.invited.splice(index, index + 1);
	// 	return Cadenas.update({_id: cadenaId},{$set: {invited: currentCadena.invited}});
	// },

	// 'updateUserCadena': function(id, cadenaId) {
	// 	var currentUser = Users.find({_id: id}).fetch()[0];
	// 	currentUser.cadenas.push(cadenaId);
	// 	return Users.update({_id: id},{$set: {cadenas: currentUser.cadenas}});
	// },

	// 'updateUserInvites': function(id, cadenaId) {
	// 	var currentUser = Users.find({_id: id}).fetch()[0];
	// 	currentUser.invites.push(cadenaId);
	// 	return Users.update({_id: id},{$set: {invites: currentUser.invites}});
	// },

	// 'removeUserInvite': function(id, cadenaId) {
	// 	var currentUser = Users.find({_id: id}).fetch()[0];
	// 	var index = currentUser.invites.indexOf(cadenaId);
	// 	currentUser.invites.splice(index, index + 1); 
	// 	return Users.update({_id: id},{$set: {invites: currentUser.invites}});
	// },

	// //insert balance in user's balance
	// 'insertBalance': function(doc) {
	// 	return Balance.insert(doc);
	// },

	// //todo: insert balance2 in user's balance2
	// 'insertBalance2': function(doc) {
	// 	return Balance2.insert(doc);
	// },

});