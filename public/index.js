window.onload = () => {
  // document.getElementById("initializer").addEventListener("click", () => {
  //   enable();
  //   init();
  // });
  liff.init(
    data => init(data),
    err => {
      console.log("err: ", err);
      // disable();
    }
  );
};

function init(data) {
  console.log("init()");
  console.log("data: ", data);

  initProfileUi();

  const messages = getMessages();

  document.querySelectorAll("button[data-message-type]").forEach(node =>
    node.addEventListener("click", () => {
      console.log("send message type: " + node.dataset.messageType);
      if (typeof liff.sendMessages === "undefined") {
        createResponse("warning", "Could not send message!");

        return;
      }

      liff.sendMessages(messages[node.dataset.messageType]);
      createResponse("success", "Message sent!");
    })
  );
}

function initProfileUi() {
  if (typeof liff.getProfile === "undefined") {
    return;
  }

  liff
    .getProfile()
    .then(profile => {
      const { displayName, pictureUrl } = profile;
      const profileImageDom = document.querySelector("#profile-image img");
      const profileNameP = document.getElementById("profile-name");

      profileNameP.textContent = displayName;
      profileNameP.classList.remove("is-invisible");
      profileImageDom.src = pictureUrl;
      profileImageDom.classList.remove("is-invisible");
    })
    .catch(err => {
      console.log(err);
    });
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
  ].map(img => `${img}?w=800&q=40`);
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
      action: getUriActions(1, { label: obj.label || `Label #${index + 1}` })[0]
    }));

  const getCarouselColumns = (...imageSrcs) =>
    imageSrcs.map((src, index) => ({
      thumbnailImageUrl: src,
      title: `Item ${index + 1}`,
      text: `This is item no. ${index + 1}`,
      actions: getUriActions(3)
    }));

  const getUriActions = (amount, ...options) => {
    const validOptions = Array.isArray(options[0]) ? options[0] : options;

    return makeMany(
      amount,
      index => ({
        type: "uri",
        label: `option #${index + 1}`,
        uri: ACTION_URI
      }),
      validOptions
    );
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

function createResponse(type, message) {
  const dom = document.createElement("span");
  const responsesBox = document.getElementById("responses");

  dom.classList.add("response", "tag", `is-${type}`, "is-medium");
  dom.innerHTML = message;
  responsesBox.appendChild(dom);
  // dom.style.left =
  //   window.innerWidth / 2 - dom.getBoundingClientRect().width / 2 + "px";
  setTimeout(() => dom.classList.add("active"));

  setTimeout(
    () => responsesBox.firstElementChild.classList.remove("active"),
    3000
  );
  setTimeout(
    () => responsesBox.removeChild(responsesBox.firstElementChild),
    3800
  );
}

function disable() {
  document.getElementById("profile-name").classList.remove("is-invisible");
  document
    .querySelectorAll("button[data-message-type]")
    .forEach(dom => (dom.disabled = true));
  document
    .getElementById("initializer-background")
    .classList.remove("is-invisible");
  document.getElementById("warn-message-wrapper").classList.remove("collapse");
}

function enable() {
  document
    .getElementById("initializer-background")
    .classList.add("is-invisible");
  document
    .querySelectorAll("button[data-message-type]")
    .forEach(dom => (dom.disabled = false));
}
