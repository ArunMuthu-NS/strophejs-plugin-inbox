# strophe.inbox.js

Plugin for strophe.js to provide inbox support of the **MongooseIM XMPP server**

## Install
```
npm install strophejs-plugin-inbox
```
## Usage
`connection.inbox.query(parameters)`

parameters - This list contains the handlers which is used when the mongooseim responds back and set of parameters to filter the results of inbox.

## Example
```
connection.inbox.query({
  onMessage: function(message) {
    console.log(message);
    return true;
  },
  onComplete: function(iq) {
    console.log(iq);
  }
})
```

Influenced from the other repositories of the (strophejs-plugins)[https://github.com/strophe/strophejs-plugins] 
