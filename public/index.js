window.onload = () =>
  liff.init(data => liffInit(data), err => console.log("err: ", err));

function liffInit() {
  console.log("liffInit()");

  const getTemplate = (type, options) => ({
    type: "template",
    altText: `This is a ${type} template.`,
    template: { type, ...options }
  });

  const getImageCarouselColumns = (...objs) =>
    objs.map((obj, index) => ({
      imageUrl: obj.url,
      action: {
        type: "uri",
        label: obj.label || `label ${index + 1}`,
        uri: ACTION_URI
      }
    }));

  const getCarouselColumns = (...imageSrcs) =>
    imageSrcs.map((src, index) => ({
      thumbnailImageUrl: src,
      title: `Item ${index + 1}`,
      text: `This is item no. ${index + 1}`,
      actions: getUriActions(3)
    }));

  const getUriActions = (number, ...options) => {
    const actions = [];
    const validOptions = Array.isArray(options[0]) ? options[0] : options;
    let option;

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

  const TEMPLATE_BUTTONS = "buttons";
  const TEMPLATE_CAROUSEL = "carousel";
  const TEMPLATE_CONFIRM = "confirm";
  const TEMPLATE_IMAGE_CAROUSEL = "image_carousel";
  const ACTION_URI = "https://nawawish.me";
  const images = [
    "https://images.unsplash.com/photo-1545070255-fdc9a55d32f2",
    "https://images.unsplash.com/photo-1545132147-d037e6c54cfd",
    "https://images.unsplash.com/photo-1545121064-3e8e1241e291",
    "https://images.unsplash.com/photo-1543363950-c78545037afc"
  ];
  const message = {
    text: {
      type: "text",
      text: "You've successfully sent a message! Hooray!"
    },
    templateButton: getTemplate(TEMPLATE_BUTTONS, {
      thumbnailImageUrl: images[3],
      title: "Menu",
      text: "Please select",
      defaultAction: {
        type: "uri",
        label: "View detail",
        uri: ACTION_URI
      },
      actions: getUriActions(3)
    }),
    templateConfirm: getTemplate(TEMPLATE_CONFIRM, {
      text: "Are you sure?",
      actions: getUriActions(2, { label: "Yes" }, { label: "No" })
    }),
    templateCarousel: getTemplate(TEMPLATE_CAROUSEL, {
      columns: getCarouselColumns(...images)
    }),
    templateImageCarousel: getTemplate(TEMPLATE_IMAGE_CAROUSEL, {
      columns: getImageCarouselColumns(...images.map(img => ({ url: img })))
    }),
    image: {},
    location: {}
  };

  console.log("message: ", message);

  [...document.getElementsByClassName("send-message-button")].forEach(node =>
    node.addEventListener(
      "click",
      () =>
        console.log("send message type: " + node.dataset.messageType) ||
        liff.sendMessages([message[node.dataset.messageType]])
    )
  );
}
