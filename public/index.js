window.onload = () =>
  liff.init(data => liffInit(data), err => console.log("err: ", err));

function liffInit() {
  console.log("liffInit()");

  [...document.getElementsByClassName("send-message-button")].forEach(node =>
    node.addEventListener(
      "click",
      () =>
        console.log("send message type: " + node.dataset.messageType) ||
        liff.sendMessages([message[node.dataset.messageType]])
    )
  );

  const message = {
    text: {
      type: "text",
      text: "You've successfully sent a message! Hooray!"
    },
    templateButton: {
      type: "template",
      altText: "This is a buttons template",
      template: {
        type: "buttons",
        thumbnailImageUrl:
          "https://images.unsplash.com/photo-1543363950-c78545037afc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
        title: "Menu",
        text: "Please select",
        defaultAction: {
          type: "uri",
          label: "View detail",
          uri: "https://nawawish.me"
        },
        actions: [
          {
            type: "postback",
            label: "Buy",
            data: "action=buy&itemid=123"
          },
          {
            type: "uri",
            label: "View detail",
            uri: "https://nawawish.me"
          }
        ]
      }
    },
    image: {},
    location: {}
  };
}
