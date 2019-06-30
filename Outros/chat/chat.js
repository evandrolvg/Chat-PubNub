function publish() {
   
    pubnub = new PubNub({
        publishKey : 'pub-c-3f57595e-735f-4a24-a6da-7ea7a637e490',
        subscribeKey : 'sub-c-a39b5672-9ac7-11e9-be69-5e5c515185c4'
    })
       
    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel : "hello_world",
            message: { 
                title: "greeting",
                description: "hello world!"
            }
        }
        pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        })
    }
       
    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function(msg) {
            console.log(msg.message.title);
            console.log(msg.message.description);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })      
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['hello_world'] 
    });
};

publich();

pubnub.addListener({
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        var publisher = m.publisher; //The Publisher
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
        var affectedChannelGroups = s.affectedChannelGroups; // The channel groups affected in the operation, of type array.
        var affectedChannels = s.affectedChannels; // The channels affected in the operation, of type array.
        var category = s.category; //Returns PNConnectedCategory
        var operation = s.operation; //Returns PNSubscribeOperation
        var lastTimetoken = s.lastTimetoken; //The last timetoken used in the subscribe request, of type long.
        var currentTimetoken = s.currentTimetoken; //The current timetoken fetched in the subscribe response, which is going to be used in the next request, of type long.
        var subscribedChannels = s.subscribedChannels; //All the current subscribed channels, of type array.
    }
});