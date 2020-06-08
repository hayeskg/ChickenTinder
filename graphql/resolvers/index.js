const Event = require('../../models/event');
const User = require('../../models/user');
const Restaurant = require('../../models/restaurant');

module.exports = {
  getEvents: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return {
            ...event._doc,
            _id: event._id,
            members: event._doc.members
          }
        })
      })
      .catch(err => {
        throw err;
      })
  },
  getUsers: () => {
    return User.find()
      .then(users => {
        return users.map(user => {
          return {
            ...user._doc,
            _id: user._id
          }
        })
      })
  },
  createUser: (args) => {
    const user = new User({
      email: args.userInput.email,
      firstName: args.userInput.firstName,
      city: args.userInput.city
    })
    return user.save()
      .then((user) => {
        return { ...user._doc, _id: user.id }
      })
  },
  createEvent: (args) => {
    const event = new Event({
      eventName: args.eventInput.eventName,
      eventLocation: args.eventInput.eventLocation,
      members: [...args.eventInput.members]
    });
    let createdEvent;
    return event
      .save()
      .then(savedEvent => {
        let users = [];
        users = savedEvent.members.map(id => {
          return User.findById(id)
            .then(user => {
              return {
                ...user._doc,
                _id: user.id
              }
            })
        })
        createdEvent = {
          ...savedEvent._doc,
          _id: savedEvent._doc._id.toString(),
          members: [...users]
        }
        console.log(createdEvent)
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

}