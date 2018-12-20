function initFormValidation() {
  // Handle all submit buttons
  document.querySelectorAll(".submit-button").forEach(dom =>
    dom.addEventListener("click", e => {
      // e.preventDefault();
      console.log("Submit button is clicked!");
    })
  );

  // Handle all form submission.
  document.querySelectorAll("form").forEach(form => {
    const fields = [...form.elements].filter(elem => elem.tagName !== "BUTTON");

    fields.forEach(field =>
      field.addEventListener("input", e => validateField(e.target))
    );

    form.addEventListener("submit", function(e) {
      fields.forEach(validateField);

      e.preventDefault();
      console.log("The form is submitted!");
    });
  });

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
}

function initFieldDescriptionTrigger() {
  document.querySelectorAll("form .field .description-icon").forEach(elem =>
    elem.addEventListener("click", function(e) {
      console.log("description icon clicked!");
      const notiDom = document.querySelector(
        `form .field .field-description[data-for=${this.dataset.for}]`
      );
      const method = notiDom.classList.contains("collapse") ? "remove" : "add";

      notiDom.classList[method]("collapse");
    })
  );

  document
    .querySelectorAll("form .field .field-description")
    .forEach(elem =>
      elem
        .querySelector(".delete")
        .addEventListener("click", () => elem.classList.add("collapse"))
    );
}

initFormValidation();
initFieldDescriptionTrigger();
