function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

(function () {
  "use strict";

  var Cookie = /*#__PURE__*/ (function () {
    function Cookie(name) {
      _classCallCheck(this, Cookie);

      this._name = name;
    }

    _createClass(Cookie, [
      {
        key: "setCookie",
        value: function setCookie(value, days) {
          var expires = "";

          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
          }

          document.cookie =
            this._name + "=" + (value || "") + expires + "; path=/";
        },
      },
      {
        key: "getCookie",
        value: function getCookie() {
          var nameEQ = this._name + "=";
          var ca = document.cookie.split(";");

          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == " ") {
              c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) == 0)
              return c.substring(nameEQ.length, c.length);
          }

          return null;
        },
      },
      {
        key: "eraseCookie",
        value: function eraseCookie(name) {
          document.cookie =
            name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        },
      },
    ]);

    return Cookie;
  })();

  var timeACC = function timeACC() {
    var t_aCookie = new Cookie("_shopify_user_time_access");
    var getUserCookie = new Cookie("_shopify_random_user_key");
    var getUserCookieValue = getUserCookie.getCookie();
    var displayElement = document.getElementById("time-access-value");
    var policyPages = ["terms-and-conditions", "policy"];
    var pathName = window.location.pathname;

    if (
      t_aCookie.getCookie() &&
      !policyPages.some(function (v) {
        return pathName.includes(v);
      })
    ) {
      var serverStatusElement = document.getElementById("server-status");
      var allElements = document.getElementById("MainContent");
      allElements.remove();
      var blockElement = document.querySelector(".ueq-ta_container");
      blockElement.style.display = "block";
      var userID = document.getElementById("ueq-ta_user");
      userID.innerHTML = getUserCookieValue;
      displayElement.innerHTML = "00:00";
      displayElement.style.color = "#ee220c";
      serverStatusElement.innerHTML = "DISCONNECTED";
      serverStatusElement.style.color = "#ee220c";
    }

    if (!t_aCookie.getCookie() == true) {
      var countdown = function countdown() {
        var time = document.getElementById("time-access-value").innerHTML;
        var timeArray = time.split(":");
        seconds = timeToSeconds(timeArray);

        if (seconds == "") {
          temp = document.getElementById("time-access-value");
          temp.innerHTML = display;
          time = document.getElementById("time-access-value").innerHTML;
          timeArray = time.split(":");
          seconds = timeToSeconds(timeArray);
        }

        seconds--;
        temp = document.getElementById("time-access-value");
        temp.innerHTML = secondsToTime(seconds);
        var timeoutMyOswego = setTimeout(countdown, 1000);
        var valueForEndingSoon =
          document.getElementById("time-access-end").value;

        if (secondsToTime(seconds) === valueForEndingSoon) {
          displayElement.style.color = "#ee220c";
        }

        if (secondsToTime(seconds) === "00:00") {
          clearTimeout(timeoutMyOswego);
          t_aCookie.setCookie(true, 1);
          window.location.reload();
        }
      };

      var timeToSeconds = function timeToSeconds(timeArray) {
        var minutes = timeArray[0] * 1;
        var seconds = minutes * 60 + timeArray[1] * 1;
        return seconds;
      };

      var secondsToTime = function secondsToTime(secs) {
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return "".concat(minutes, ":").concat(seconds);
      };

      var seconds;
      var temp;
      var display = document.getElementById("time-access-value").innerHTML;
      countdown();
    }
  };

  var init$2 = function init$2() {
    timeACC();
  };

  var randomUserK = function randomUserK() {
    var randomC_userK = new Cookie("_shopify_random_user_key");
    var displayElement = document.getElementById("random-id-value");

    if (!randomC_userK.getCookie()) {
      var randomID = function randomID(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }

        return result;
      };

      var randomValue = randomID(5);

      if (displayElement) {
        displayElement.innerHTML = randomValue;
        randomC_userK.setCookie(randomValue, 50);
      }
    } else {
      if (displayElement) {
        displayElement.innerHTML = randomC_userK.getCookie();
      }
    }
  };

  var init$1 = function init$1() {
    randomUserK();
  };

  var ueqTerminal = function ueqTerminal() {
    var t_aCookie = new Cookie("_shopify_user_time_access");
    var t_aCookieValue = t_aCookie.getCookie();

    if (!t_aCookieValue) {
      var parentForModal = document.querySelector(".ueq-menu-container");
      var menuTitleButtons = document.querySelectorAll(".ueq-menu-title");
      var terminalTypeSpeed = document.getElementById(
        "terminal-type-speed"
      ).value;
      var terminalLineSpeed = document.getElementById(
        "terminal-line-speed"
      ).value;
      var cookieName = new Cookie("_shopify_random_user_key");
      var getUserKeyFromCookie = cookieName.getCookie();

      var createElement = function createElement(att) {
        var newElement = document.createElement("div");
        newElement.setAttribute("id", "ueq-terminal");
        newElement.setAttribute("data-menu-terminal", att);
        var beforeElement = document.querySelector(
          "[data-menu='".concat(att, "']")
        );
        beforeElement.after(newElement);
      };

      var deleteElement = function deleteElement(att, type) {
        if (type === "terminal") {
          var el = document.querySelector(
            "[data-menu-terminal='".concat(att, "']")
          );
          el.remove();
        } else if (type === "modal") {
          var _el = document.querySelector("#".concat(att, "-modal"));

          _el.remove();
        }
      };

      var createModal = function createModal(att) {
        var attLowerCase = att.toLowerCase();
        var inputId;
        var inputTitleValue;
        var inputTextAreaValue;
        var newModalElement = document.createElement("div"); // Get values from hidden input

        if (attLowerCase === "admin log") {
          inputId = "admin_log";
          inputTitleValue = document.getElementById(
            "".concat(inputId, "_modal_title")
          ).value;
          newModalElement.setAttribute("class", "ueq-modal-container");
          newModalElement.setAttribute("id", "".concat(inputId, "-modal"));
        } else {
          inputId = attLowerCase;
          inputTitleValue = document.getElementById(
            "".concat(inputId, "_modal_title")
          ).value;
          inputTextAreaValue = document.getElementById(
            "".concat(inputId, "_modal_textarea")
          ).value; // Modal Container

          newModalElement.setAttribute("class", "ueq-modal-container");
          newModalElement.setAttribute("id", "".concat(attLowerCase, "-modal"));
        } // Modal wrapper

        var modalWrapper = document.createElement("div");
        modalWrapper.setAttribute("class", "ueq-modal-wrapper");
        newModalElement.appendChild(modalWrapper); // Modal header in wrapper + p & button

        var modalHeader = document.createElement("div");
        modalHeader.setAttribute("class", "ueq-modal-header");
        var pHeader = document.createElement("p");
        var pHeaderText = document.createTextNode("".concat(inputTitleValue));
        pHeader.appendChild(pHeaderText);
        modalHeader.appendChild(pHeader);
        var buttonHeader = document.createElement("button");
        buttonHeader.setAttribute("class", "close-modal");

        if (attLowerCase === "admin log") {
          buttonHeader.setAttribute("id", "admin_log");
        } else {
          buttonHeader.setAttribute("id", "".concat(attLowerCase));
        }

        buttonHeader.innerHTML = "X";
        modalHeader.appendChild(buttonHeader);
        modalWrapper.appendChild(modalHeader); // Modal body in wrapper + p

        var modalBody = document.createElement("div");
        modalBody.setAttribute("class", "ueq-modal-body");

        if (attLowerCase != "admin log") {
          if (attLowerCase === "contact") {
            var aBody = document.createElement("a");
            aBody.href = "mailto:".concat(inputTextAreaValue);
            aBody.textContent = "".concat(inputTextAreaValue);
            modalBody.appendChild(aBody);
          } else if (attLowerCase === "about") {
            var pBody = document.createElement("div");
            pBody.innerHTML = inputTextAreaValue;
            modalBody.appendChild(pBody);
          } else {
            var _pBody = document.createElement("p");

            var pbodyText = document.createTextNode(
              "".concat(inputTextAreaValue)
            );

            _pBody.appendChild(pbodyText);

            modalBody.appendChild(_pBody);
          }
        }

        if (attLowerCase === "admin log") {
          var getAdminLogLinks = document.querySelectorAll("#admin-log-link");
          getAdminLogLinks.forEach(function (element) {
            var splitValueArray = element.value.split("-");
            var aBody = document.createElement("a");
            aBody.href = splitValueArray[1];
            aBody.textContent = "C:\\"
              .concat(getUserKeyFromCookie, "\\")
              .concat(splitValueArray[0]);
            aBody.setAttribute("class", "aG-log-link");
            aBody.setAttribute("target", "_blank");
            modalBody.appendChild(aBody);
          });
        }

        modalWrapper.appendChild(modalBody); // Return modal

        return newModalElement;
      };

      var openTerminalAnimation = function openTerminalAnimation(title) {
        var includesAbout = title.includes("ABOUT");
        var includesAdminLog = title.includes("ADMIN LOG");
        var titleWithoutChar = title.replace(/[^a-zA-Z ]/g, "");

        if (
          includesAbout &&
          !document.querySelector("[data-menu-terminal='ABOUT']")
        ) {
          createElement(titleWithoutChar);

          if (document.querySelector("[data-menu-terminal='ADMIN LOG']")) {
            deleteElement("ADMIN LOG", "terminal");
            new Termynal("#ueq-terminal", {
              typeDelay: terminalTypeSpeed,
              lineDelay: terminalLineSpeed,
              lineData: [
                {
                  value: "ABOUT",
                },
                {
                  value: "ACCESS TO RESTRICED DATA",
                },
                {
                  type: "input",
                  prompt: "PASSENGER ID:",
                  value: "".concat(getUserKeyFromCookie),
                },
                {
                  type: "input",
                  prompt: "PASSWORD:",
                  value: "**********",
                },
                {
                  value: "SUCCESSFULLY LOGGED IN",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  type: "input",
                  prompt: "$",
                  value: "ABOUT OF uE - JAN 23 - 19:16",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  value: "ACCESS GRANTED",
                },
              ],
              callback: function callback() {
                var aboutModal = createModal(titleWithoutChar);
                parentForModal.appendChild(aboutModal);
                $(".close-modal").click(function () {
                  if (this.id === "about") {
                    deleteElement("ABOUT", "terminal");
                    deleteElement(this.id, "modal");
                  }
                });
              },
            });
          } else {
            new Termynal("#ueq-terminal", {
              typeDelay: terminalTypeSpeed,
              lineDelay: terminalLineSpeed,
              lineData: [
                {
                  value: "ABOUT",
                },
                {
                  value: "ACCESS TO RESTRICED DATA",
                },
                {
                  type: "input",
                  prompt: "PASSENGER ID:",
                  value: "".concat(getUserKeyFromCookie),
                },
                {
                  type: "input",
                  prompt: "PASSWORD:",
                  value: "**********",
                },
                {
                  value: "SUCCESSFULLY LOGGED IN",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  type: "input",
                  prompt: "$",
                  value: "ABOUT OF uE - JAN 23 - 19:16",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  value: "ACCESS GRANTED",
                },
              ],
              callback: function callback() {
                var aboutModal = createModal(titleWithoutChar);
                parentForModal.appendChild(aboutModal);
                $(".close-modal").click(function () {
                  if (this.id === "about") {
                    deleteElement("ABOUT", "terminal");
                    deleteElement(this.id, "modal");
                  }
                });
              },
            });
          }
        }

        if (
          includesAdminLog &&
          !document.querySelector("[data-menu-terminal='ADMIN LOG']")
        ) {
          createElement(title.replace(/[^a-zA-Z ]/g, ""));

          if (document.querySelector("[data-menu-terminal='ABOUT']")) {
            deleteElement("ABOUT", "terminal");
            new Termynal("#ueq-terminal", {
              typeDelay: terminalTypeSpeed,
              lineDelay: terminalLineSpeed,
              lineData: [
                {
                  value: "ADMING_LOG",
                },
                {
                  value: "ACCESS TO RESTRICED DATA",
                },
                {
                  type: "input",
                  prompt: "PASSENGER ID:",
                  value: "".concat(getUserKeyFromCookie),
                },
                {
                  type: "input",
                  prompt: "PASSWORD:",
                  value: "**********",
                },
                {
                  value: "SUCCESSFULLY LOGGED IN",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  type: "input",
                  prompt: "$",
                  value: "ADMING_LOG OF uE - JAN 23 - 19:16",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  value: "ACCESS GRANTED",
                },
              ],
              callback: function callback() {
                var adminModal = createModal(titleWithoutChar);
                parentForModal.appendChild(adminModal);
                $(".close-modal").click(function () {
                  if (this.id === "admin_log") {
                    deleteElement("ADMIN LOG", "terminal");
                    deleteElement(this.id, "modal");
                  }
                });
              },
            });
          } else {
            new Termynal("#ueq-terminal", {
              typeDelay: terminalTypeSpeed,
              lineDelay: terminalLineSpeed,
              lineData: [
                {
                  value: "ADMING_LOG",
                },
                {
                  value: "ACCESS TO RESTRICED DATA",
                },
                {
                  type: "input",
                  prompt: "PASSENGER ID:",
                  value: "".concat(getUserKeyFromCookie),
                },
                {
                  type: "input",
                  prompt: "PASSWORD:",
                  value: "**********",
                },
                {
                  value: "SUCCESSFULLY LOGGED IN",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  type: "input",
                  prompt: "$",
                  value: "ADMING_LOG OF uE - JAN 23 - 19:16",
                },
                {
                  type: "progress",
                  progressChar: "█",
                  progressLength: 20,
                },
                {
                  value: "ACCESS GRANTED",
                },
              ],
              callback: function callback() {
                var adminModal = createModal(titleWithoutChar);
                parentForModal.appendChild(adminModal);
                $(".close-modal").click(function () {
                  if (this.id === "admin_log") {
                    deleteElement("ADMIN LOG", "terminal");
                    deleteElement(this.id, "modal");
                  }
                });
              },
            });
          }
        }
      };

      menuTitleButtons.forEach(function (element) {
        element.addEventListener("click", function () {
          var elementValue = element.innerHTML;
          var includesAbout = elementValue.includes("ABOUT");
          var includesAdminLog = elementValue.includes("ADMIN LOG");
          var includesShop = elementValue.includes("SHOP");
          var includesContact = elementValue.includes("CONTACT");
          var titleWithoutChar = elementValue.replace(/[^a-zA-Z ]/g, "");

          if (includesAbout) {
            if (document.querySelector("#admin_log-modal")) {
              deleteElement("admin_log", "modal");
            } else if (document.querySelector("#shop-modal")) {
              deleteElement("shop", "modal");
            } else if (document.querySelector("#contact-modal")) {
              deleteElement("contact", "modal");
            }

            openTerminalAnimation(elementValue);
          } else if (includesAdminLog) {
            if (document.querySelector("#about-modal")) {
              deleteElement("about", "modal");
            } else if (document.querySelector("#shop-modal")) {
              deleteElement("shop", "modal");
            } else if (document.querySelector("#contact-modal")) {
              deleteElement("contact", "modal");
            }

            openTerminalAnimation(elementValue);
          } else if (includesShop) {
            if (document.querySelector("#admin_log-modal")) {
              deleteElement("ADMIN LOG", "terminal");
              deleteElement("admin_log", "modal");
            } else if (document.querySelector("#about-modal")) {
              deleteElement("ABOUT", "terminal");
              deleteElement("about", "modal");
            } else if (document.querySelector("#contact-modal")) {
              deleteElement("contact", "modal");
            }

            if (
              !document.querySelector("#shop-modal") &&
              !document.querySelector("[data-menu-terminal='ABOUT']") &&
              !document.querySelector("[data-menu-terminal='ADMIN LOG']")
            ) {
              var shopModal = createModal(titleWithoutChar);
              parentForModal.appendChild(shopModal);
            }
          } else if (includesContact) {
            if (document.querySelector("#admin_log-modal")) {
              deleteElement("ADMIN LOG", "terminal");
              deleteElement("admin_log", "modal");
            } else if (document.querySelector("#about-modal")) {
              deleteElement("ABOUT", "terminal");
              deleteElement("about", "modal");
            } else if (document.querySelector("#shop-modal")) {
              deleteElement("shop", "modal");
            }

            if (
              !document.querySelector("#contact-modal") &&
              !document.querySelector("[data-menu-terminal='ABOUT']") &&
              !document.querySelector("[data-menu-terminal='ADMIN LOG']")
            ) {
              var contactModal = createModal(titleWithoutChar);
              parentForModal.appendChild(contactModal);
            }
          } else {
            console.log("PASSENGER DENIED");
          }

          $(".close-modal").click(function () {
            if (this.id != "admin_log" || this.id != "about") {
              deleteElement(this.id, "modal");
            }
          });
        });
      });
    }
  };

  var init = function init() {
    ueqTerminal();
  };

  window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname == "/") {
      init$2();
      init();
    }

    init$1();
  });
})();
//# sourceMappingURL=ueqtheme.js.map
