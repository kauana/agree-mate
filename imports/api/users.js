import { Mongo } from 'meteor/mongo';
 
// export const Users = Meteor.users;

export const Users = new Mongo.Collection('userCollection');

Users.deny({
	insert() {
		return true;
	},

	update() {
		return true;
	},

	remove() {
		return true;
	}
});