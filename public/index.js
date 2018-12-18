window.onload = () =>
  liff.init(data => liffInit(data), err => console.log("err: ", err));

function liffInit() {
  console.log("liffInit()");

  const getTemplate = (type, options) => ({
    type: "template",
    altText: `This is a ${type} template.`,
    template: { type, ...options }
  });

  const getCarouselColumns = (...imageSrcs) =>
    imageSrcs.map((src, index) => ({
      thumbnailImageUrl: src,
      title: `Item ${index + 1}`,
      text: `This is item no. ${index + 1}`,
      actions: getUriActions(3)
    }));

  const getUriActions = (number, ...options) => {
    const actions = [];
    let option;

    for (let i = 0; i < number; i++) {
      option = typeof options[i].type !== "undefined" ? options[i] : {};

      actions.push({
        type: "uri",
        label: `option #${i + 1}`,
        uri: ACTION_URI,
        ...option
      });

      return actions;
    }
  };

  [...document.getElementsByClassName("send-message-button")].forEach(node =>
    node.addEventListener(
      "click",
      () =>
        console.log("send message type: " + node.dataset.messageType) ||
        liff.sendMessages([message[node.dataset.messageType]])
    )
  );

  const ACTION_URI = "https://nawawish.me";
  const message = {
    text: {
      type: "text",
      text: "You've successfully sent a message! Hooray!"
    },
    templateButton: getTemplate("button", {
      thumbnailImageUrl:
        "https://images.unsplash.com/photo-1543363950-c78545037afc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
      title: "Menu",
      text: "Please select",
      defaultAction: {
        type: "uri",
        label: "View detail",
        uri: ACTION_URI
      },
      actions: getUriActions(3)
    }),
    templateConfirm: getTemplate("confirm", {
      text: "Are you sure?",
      actions: getUriActions(2, [{ label: "Yes" }, { label: "No" }])
    }),
    templateCarousel: getTemplate("carousel", {
      columns: getCarouselColumns(
        "https://images.unsplash.com/photo-1545070255-fdc9a55d32f2",
        "https://images.unsplash.com/photo-1545132147-d037e6c54cfd",
        "https://images.unsplash.com/photo-1545121064-3e8e1241e291"
      )
    }),
    image: {},
    location: {}
  };
}
