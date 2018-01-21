import { Mongo } from 'meteor/mongo'

export const Chores = new
  Mongo.Collection('chores');
