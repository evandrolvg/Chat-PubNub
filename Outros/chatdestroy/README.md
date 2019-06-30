# Babel

## Key Exchange and Self-Destructing Messages with PubNub

Babel is an open source chat widget and API built with the PubNub Global Realtime Network. With Babel you can exchange 1024-bit RSA Public Keys, and send Encrypted, Self-Destructing Messages.

###  [Live Demo](http://pubnub.github.io/secure-key-exchange/)
<!--*  [Annotated Source](http://larrywu.com/babel/docs/annotated-source)
-->
<!--Insert blog posts here as they are posted.-->

------
## Source Walkthrough

###Check out the [annotated source](http://pubnub.github.io/secure-key-exchange/docs/annotated-source).

------

<!--#### Key Generation
First, we have to generate our 1024-bit RSA key. This step is pretty simple with the Cryptico JavaScript library.

	var RSAkey = cryptico.generateRSAKey(1024);
	var publicKey = cryptico.publicKeyString(RSAkey);

Then let's initialize our PubNub client.
	
	var pubnub = PUBNUB.init({
		publish_key : 'demo',
		subscribe_key : 'demo',
		uuid : userName,
		ssl : true
	});
	
`'demo'` can be replaced with your own PubNub `publish_key` and `subscribe_key`, which you can get with your free PubNub [account](http://www.pubnub.com/get-started/).

`userName` should be some unique string that other users will be able to identify you by. By setting `ssl` to `true`, PubNub will be using TLS while transport our data.

#### Key Sharing

Now that we've generated a Public Key and our PubNub client is prepared, we can share our Public Key with others through PubNub.

Let's subscribe to a PubNub channel.

	pubnub.subscribe({
		channel : 'babel',
		callback : function(m) {},
		state : {username : 'doge', publicKey : publicKey}
	});
	
Our channel name in this case is `babel`. `callback` has been set to do nothing, because for now we don't need to do anything when we receive a message. Our `state` has been set to an object containing our username and publicKey.

Now we can use PubNub's presence features to see the public keys of other users subscribed to the `babel` channel.

	pubnub.here_now({
		channel : 'babel',
		state : true,
		callback : function(m) {console.log(m)}
	});
	
`here_now` prints out a list of uuids along with their state. Here's an example of what it might print out.

	{
		occupancy: 1,
		uuids: [
	    	{‘doge’ : "Tknd+V5WrBOujZKHUCS2MYZKhwSUr6Wha...SqlHjVLvDOVmewRjHWC9a5SzQq5/YRhw+7E="}
		]
	}

### 3. Encrypted, Self-Destructing Messages

`babel.js` also has the capabilities to send encrypted, self-destructing messages. Messages are encrypted with 1024-bit RSA, which is performed by a slightly modified [cryptico.js](http://wwwtyro.github.io/cryptico/).
-->

## API Walkthrough

### 1. First Steps
Babel uses both [PubNub](http://www.pubnub.com/) and [Cryptico](http://wwwtyro.github.io/cryptico/). So first, let's include the all the necessary libraries. We can then instantiate a Babel object by calling `Babel` with a username string.

	<script src="http://cdn.pubnub.com/pubnub.min.js"></script>
	
	<!-- Download both from https://github.com/lw7360/babel -->
	<script src="./cryptico.js"></script> 
	<script src="./babel.js"></script>
	
	<script> 
	    var doge = new Babel('doge'); // Initialize Babel with a username
	</script>
	
### 2. Public Key Exchange

`listUsers()` returns an object with all currently connected users' usernames and their public keys.
	
	console.log(doge.listUsers());
	// {username: publicKey}
	// {doge: "olpbSlUEca0VVVqcs9ciUZyP...NNIkqx9lVtUZDYLUWhnjaNrEK4E="}
	
`myKey()` returns your [Cryptico](https://github.com/wwwtyro/cryptico) RSA key. 

### 3. Encrypted Self-Destructing Messages

`sendMessage(recipient, message, ttl)` encrypts `message` with `recipient`'s public key, and sends the encrypted message to `recipient`. The message will be accessible through the `returnMessages` method for both you and the `recipient` for `ttl` seconds.

	doge.sendMessage('shibe', 'Very greetings shibe. Much Excited!', 5);
	// This will send a message to 'shibe', with the message 
	// 'Very greetings shibe. Much Excited!'. 
	// Both you and `shibe` will only be able to view this message for 5 seconds.
	
`returnMessages()` returns all the messages you've sent or received that have yet to time out.

	console.log(doge.returnMessages());
	// {
	//   shibe: [
	//	   {
	//       TTL: 5,
	//       msgID: "2fa4abf3-08d4-4e40-873f-f35540590d04",
	//       plaintext: "Very greetings shibe. Much Excited!",
	//       recipient: "shibe",
	//       sender: "doge"
	//     }
	//   ]
	// }
	

`onMessage(callback)` let's you set a function to be called whenever you receive or send a message.

    var	messageHandler = function(msg) {console.log(msg);};
	doge.onMessage(messageHandler);
	
	// 'shibe' responds to our earlier message and sends us a message of his own.
	// messageHandler would be called and would print the following.
	// {
	//     msgID: "d8fd0f29-81cf-4c35-8aef-59b2c664628f", 
	//     plaintext: "Much hello doge!  Very cannot wait.", 
	//     TTL: 5, 
	//     sender: "shibe", 
	//     recipient: "doge"
	// }
	// msgID is a unique string that can be used to identify the message.

`onPresence(callback)` does the same thing for presence events, i.e. users joining/leaving/timing out of the channel.

`quit()` causes you to leave the channel. Other users will no longer be able to retrieve your public key or send messages to you.



## build instructions

```
npm install
node build.js
```
This will create build/demo.html and support files.

 
