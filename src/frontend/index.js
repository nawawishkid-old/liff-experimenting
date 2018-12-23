import * as fieldNameParser from "./fieldNameParser";

// Initialize LIFF SDK
window.onload = () => {
  liff.init(
    data => initProfileUi(),
    err => {
      // Show user profile as 'Anonymous'
      document.getElementById("user-greeting").classList.remove("is-invisible");
      // Show warning message about LIFF.
      document
        .getElementById("warn-message-wrapper")
        .classList.remove("collapse");
    }
  );
};

// Handle all forms submission.
document.querySelectorAll("form").forEach(function handleEachForm(form) {
  const fields = [...form.elements].filter(elem => elem.tagName !== "BUTTON");

  // Validate form on field input
  fields.forEach(field =>
    field.addEventListener("input", e => validateField(e.target))
  );

  // Handle form submission.
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    fields.forEach(validateField);

    if (!this.checkValidity()) {
      return;
    }

    const liffMessageData = fieldNameParser.parseManyFieldNames(fields);

    console.log("The form is submitted!");
    console.log("liffMessageData: ", liffMessageData);

    if (typeof liff.sendMessages === "undefined") {
      createResponse("warning", "Message can only be sent in LIFF app!");

      return;
    }

    liff
      .sendMessages([liffMessageData])
      .then(() => createResponse("success", "Message sent!"))
      .catch(err => {
        console.log("Send message error", err);
        createResponse("danger", "Unable to send message!");
      });
  });
});

// Should separate concern
function validateField(field) {
  const { validity, validationMessage } = field;
  const messageDom = field.parentElement.parentElement.querySelector(
    ".builtin-message"
  );

  if (!validity.valid) {
    const message = validity.patternMismatch
      ? field.dataset.errorMessagePattern
      : validationMessage;

    field.classList.remove("is-success");
    field.classList.add("is-danger");
    messageDom.innerHTML = message || validationMessage;

    return true;
  } else {
    field.classList.remove("is-danger");
    field.classList.add("is-success");
    messageDom.innerHTML = "";

    return false;
  }
}

// Toggle field description panel when field info icon is clicked.
document.querySelectorAll("form .field .description-icon").forEach(elem =>
  elem.addEventListener("click", function() {
    console.log("description icon clicked!");
    const notiDom = document.querySelector(
      `form .field .field-description[data-for=${this.dataset.for}]`
    );
    const method = notiDom.classList.contains("collapse") ? "remove" : "add";

    notiDom.classList[method]("collapse");
  })
);

// Close field description when delete icon is clicked.
document
  .querySelectorAll("form .field .field-description")
  .forEach(elem =>
    elem
      .querySelector(".delete")
      .addEventListener("click", () => elem.classList.add("collapse"))
  );

function createResponse(type, message) {
  const dom = document.createElement("span");
  const responsesBox = document.getElementById("responses");

  dom.classList.add("response", "tag", `is-${type}`, "is-medium");
  dom.innerHTML = message;
  responsesBox.appendChild(dom);

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

function initProfileUi() {
  if (typeof liff.getProfile === "undefined") {
    return;
  }

  liff
    .getProfile()
    .then(profile => {
      const { displayName, pictureUrl } = profile;
      const profileImageDom = document.querySelector("#profile-image img");
      const userGreetingDom = document.getElementById("user-greeting");
      const profileNameP = document.getElementById("profile-name");

      profileNameP.textContent = displayName;
      userGreetingDom.classList.remove("is-invisible");
      profileImageDom.src = pictureUrl;
      profileImageDom.classList.remove("is-invisible");
    })
    .catch(err => {
      console.log(err);
    });
}
