

// perloader


$(window).on("load", function () {
  $(".preloader").addClass("active");
  setTimeout(function () {
    $(".preloader").addClass("done");
  }, 1500);
});



// typed


document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 40,
        backSpeed: 20,
        startDelay: 0,
        loop: true,
        loopCount: Infinity,
    });

});




/*=============== SHOW model history ===============*/
const showmodel1 = (openButton, modelContent) => {
  const openBtn = document.getElementById(openButton),
    modelContainer = document.getElementById(modelContent)

  if (openBtn && modelContainer) {
    openBtn.addEventListener('click', () => {
      modelContainer.classList.add('show-model')
    })
    // Add click event listener to modelContainer
    modelContainer.addEventListener('click', closemodel1)
  }
}
  
showmodel1('open-model1', 'model-container')

/*=============== CLOSE model history ===============*/
const closeBtn1 = document.querySelectorAll('.close-model')

function closemodel1() {
  const modelContainer = document.getElementById('model-container')
  modelContainer.classList.remove('show-model')
}
closeBtn1.forEach(c => c.addEventListener('click', closemodel1))







/*=============== SHOW model experience ===============*/
const showmodel2 = (openButton, modelContent) => {
  const openBtn = document.getElementById(openButton),
    modelContainer = document.getElementById(modelContent)

  if (openBtn && modelContainer) {
    openBtn.addEventListener('click', () => {
      modelContainer.classList.add('show-model')
    })
 
    // Add click event listener to modelContainer
    modelContainer.addEventListener('click', closemodel2)
  }
}
showmodel2('open-model2', 'model-container-2')

/*=============== CLOSE model experience ===============*/
const closeBtn2 = document.querySelectorAll('.close-model-2')

function closemodel2() {
  const modelContainer = document.getElementById('model-container-2')
  modelContainer.classList.remove('show-model')
}
closeBtn2.forEach(c => c.addEventListener('click', closemodel2))




/*=============== SHOW model goals ===============*/
const showmodel3 = (openButton, modelContent) => {
  const openBtn = document.getElementById(openButton),
    modelContainer = document.getElementById(modelContent)

  if (openBtn && modelContainer) {
    openBtn.addEventListener('click', () => {
      modelContainer.classList.add('show-model')
    })
 
    // Add click event listener to modelContainer
    modelContainer.addEventListener('click', closemodel3)
  }
}
showmodel3('open-model3', 'model-container-3')

/*=============== CLOSE model goals ===============*/
const closeBtn3 = document.querySelectorAll('.close-model-3')

function closemodel3() {
  const modelContainer = document.getElementById('model-container-3')
  modelContainer.classList.remove('show-model')
}
closeBtn3.forEach(c => c.addEventListener('click', closemodel3))





// Email
function sendMail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var options = []

  if (document.getElementById("opt-1").checked) {
    options.push("Seo Services"); // matches your label text for opt-1
    }
    if (document.getElementById("opt-2").checked) {
    options.push("Web Development"); // matches label text for opt-2
    }
    if (document.getElementById("opt-3").checked) {
    options.push("Tool Development"); // matches label text for opt-3
    }
    if (document.getElementById("opt-4").checked) {
    options.push("Plugin Development"); // matches label text for opt-3
    }

  if (name === "" || email === "") {
    showAlert("Please fill in your name and email.", "error");
    return;
  }

  if (options.length === 0) {
    showAlert("Please select at least one option.", "error");
    return;
  }

  // Show loader and disable send button
  showLoader();
  const sendButton = document.querySelector('.send-button'); // Add your actual send button class/id
  if (sendButton) {
    sendButton.disabled = true;
    sendButton.style.opacity = '0.6';
    sendButton.style.cursor = 'not-allowed';
  }

  var gmails = {
    name: name,
    email: email,
    message: message,
    options: options.join(", "),
  };

  const serviceID = "service_xgecpea";
  const templateID = "template_bsnu289";

  emailjs.send(serviceID, templateID, gmails)
    .then((res) => {
      // Hide loader and re-enable button
      hideLoader();
      if (sendButton) {
        sendButton.disabled = false;
        sendButton.style.opacity = '1';
        sendButton.style.cursor = 'pointer';
      }

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      // Uncheck options
      var checkboxes = document.getElementsByTagName("input");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === "checkbox") {
          checkboxes[i].checked = false;
        }
      }

      console.log(res);
      showAlert("Your Message sent successfully.", "success");
    })
    .catch((err) => {
      // Hide loader and re-enable button on error
      hideLoader();
      if (sendButton) {
        sendButton.disabled = false;
        sendButton.style.opacity = '1';
        sendButton.style.cursor = 'pointer';
      }

      console.log(err);
      showAlert("Error sending message. Please try again later.", "error");
    });
}

// Loader functions
function showLoader() {
  const loaderElement = document.querySelector('.loader-overlay');
  if (loaderElement) {
    loaderElement.style.display = 'flex';
  }
}

function hideLoader() {
  const loaderElement = document.querySelector('.loader-overlay');
  if (loaderElement) {
    loaderElement.style.display = 'none';
  }
}

// Alert functions (fixed duplicate event listener)
function hideAlert() {
  const alertElement = document.querySelector('.alert-custom')
  const bgElement = document.querySelector('.bg-alert-message')
  if (alertElement) alertElement.style.display = 'none'
  if (bgElement) bgElement.style.display = 'none'
}

function showAlert(message, type) {
  const alertElement = document.querySelector('.alert-custom')
  const bgElement = document.querySelector('.bg-alert-message')
  
  if (alertElement && bgElement) {
    alertElement.style.display = 'block'
    bgElement.style.display = 'block'
    document.getElementById("alert-message").innerText = message
    
    if (type === "error") {
      alertElement.style.backgroundColor = "#353635"
      bgElement.style.backgroundColor = "#000000d6"
    } else {
      alertElement.style.backgroundColor = "#3B82F6"
      bgElement.style.backgroundColor = "#000000d6"
    }

    // Hide the alert and background after a few seconds
    setTimeout(() => {
      hideAlert()
    }, 6000)
  }
}

// Event listeners (fixed duplicate)
document.addEventListener('DOMContentLoaded', function() {
  const closeButton = document.querySelector('.alert-close');
  const bgAlert = document.querySelector('.bg-alert-message');
  
  if (closeButton) {
    closeButton.addEventListener('click', hideAlert);
  }
  
  if (bgAlert) {
    bgAlert.addEventListener('click', hideAlert);
  }
});


document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function (e) {
	if (
		e.key === 'F12' ||
		(e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
		(e.ctrlKey && e.key === 'U')
	) {
		e.preventDefault();
	}
});
