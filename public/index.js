window.onload = () =>
  liff.init(data => init(data), err => console.log("err: ", err));

function init(data) {
  console.log("init()");
  console.log("data: ", data);

  const messages = getMessages();

  [...document.getElementsByClassName("send-message-button")].forEach(node =>
    node.addEventListener(
      "click",
      () =>
        console.log("send message type: " + node.dataset.messageType) ||
        liff.sendMessages(messages[node.dataset.messageType])
    )
  );
}

function getMessages() {
  const {
    getTemplate,
    getCarouselColumns,
    getImageCarouselColumns,
    getUriActions,
    getImageMessage,
    getLocationMessage,
    makeMany
  } = getHelpers();
  const TEMPLATE_BUTTONS = "buttons";
  const TEMPLATE_CAROUSEL = "carousel";
  const TEMPLATE_CONFIRM = "confirm";
  const TEMPLATE_IMAGE_CAROUSEL = "image_carousel";
  const images = [
    "https://images.unsplash.com/photo-1545070255-fdc9a55d32f2",
    "https://images.unsplash.com/photo-1545132147-d037e6c54cfd",
    "https://images.unsplash.com/photo-1545121064-3e8e1241e291",
    "https://images.unsplash.com/photo-1543363950-c78545037afc"
  ];
  const message = {
    text: [
      {
        type: "text",
        text: "You've successfully sent a message! Hooray!"
      }
    ],
    templateButton: [
      getTemplate(TEMPLATE_BUTTONS, {
        thumbnailImageUrl: images[3],
        title: "Menu",
        text: "Please select",
        defaultAction: getUriActions(1, { label: "View detail" })[0],
        actions: getUriActions(3)
      })
    ],
    templateConfirm: [
      getTemplate(TEMPLATE_CONFIRM, {
        text: "Are you sure?",
        actions: getUriActions(2, { label: "Yes" }, { label: "No" })
      })
    ],
    templateCarousel: [
      getTemplate(TEMPLATE_CAROUSEL, {
        columns: getCarouselColumns(...images)
      })
    ],
    templateImageCarousel: [
      getTemplate(TEMPLATE_IMAGE_CAROUSEL, {
        columns: getImageCarouselColumns(...images.map(img => ({ url: img })))
      })
    ],
    image: [getImageMessage(images[0])],
    location: makeMany(
      3,
      index => getLocationMessage("My location naja", "214/11 หมู่ 8 นะจ๊ะ"),
      [1, 2, 3].map(num => ({ title: `Location #${num}` }))
    )
  };

  console.log("message: ", message);

  return message;
}

function getHelpers() {
  const ACTION_URI = "https://nawawish.me";
  const getTemplate = (type, options) => ({
    type: "template",
    altText: `This is a ${type} template.`,
    template: { type, ...options }
  });

  const getImageCarouselColumns = (...objs) =>
    objs.map((obj, index) => ({
      imageUrl: obj.url,
      action: getUriActions(1, { label: obj.label })[0]
    }));

  const getCarouselColumns = (...imageSrcs) =>
    imageSrcs.map((src, index) => ({
      thumbnailImageUrl: src,
      title: `Item ${index + 1}`,
      text: `This is item no. ${index + 1}`,
      actions: getUriActions(3)
    }));

  const getUriActions = (amount, ...options) => {
    const actions = [];
    const validOptions = Array.isArray(options[0]) ? options[0] : options;
    let option;

    return makeMany(
      amount,
      index => ({
        type: "uri",
        label: `option #${index + 1}`,
        uri: ACTION_URI
      }),
      validOptions
    );

    for (let i = 0; i < number; i++) {
      option = validOptions[i] || {};

      actions.push({
        type: "uri",
        label: `option #${i + 1}`,
        uri: ACTION_URI,
        ...option
      });
    }

    return actions;
  };

  const getImageMessage = url => ({
    type: "image",
    originalContentUrl: url,
    previewImageUrl: `${url}?w=240&h=240`
  });

  const getLocationMessage = (title, address) => ({
    type: "location",
    title,
    address,
    latitude: 90 * 2 * Math.random() - 90,
    longitude: 180 * 2 * Math.random() - 180
  });

  const makeMany = (amount, defaultData, options = [], merger) => {
    const arr = [];
    const validMerger =
      merger || ((origin, newData) => ({ ...origin, ...newData }));

    for (let i = 0; i < amount; i++) {
      arr.push(
        validMerger(
          typeof defaultData === "function" ? defaultData(i) : defaultData,
          options[i] || {}
        )
      );
    }

    return arr;
  };

  return {
    getCarouselColumns,
    getImageCarouselColumns,
    getUriActions,
    getTemplate,
    getImageMessage,
    getLocationMessage,
    makeMany
  };
}
