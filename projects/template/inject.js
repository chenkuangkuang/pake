(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  const api = factory();
  root.pakePinHelpers = api;

  const PIN_BUTTON_ID = "pake-pin-btn";
  const URL_BUTTON_ID = "pake-url-btn";
  const URL_PANEL_ID = "pake-url-panel";

  function hasInvoke() {
    return typeof root.__TAURI__?.core?.invoke === "function";
  }

  async function readPinnedState() {
    return root.__TAURI__.core.invoke("get_always_on_top");
  }

  async function togglePinnedState() {
    return root.__TAURI__.core.invoke("toggle_always_on_top");
  }

  async function getCurrentAppUrl() {
    return root.__TAURI__.core.invoke("get_current_app_url");
  }

  async function setCurrentAppUrl(url) {
    return root.__TAURI__.core.invoke("set_current_app_url", { params: { url } });
  }

  async function resetAppUrl() {
    return root.__TAURI__.core.invoke("reset_app_url");
  }

  function openUrl(url) {
    if (url && typeof url === "string") {
      root.location.href = url;
    }
  }

  function ensurePinButton() {
    if (!root.document?.body || root.document.getElementById(PIN_BUTTON_ID) || !hasInvoke()) {
      return;
    }

    const btn = root.document.createElement("button");
    btn.id = PIN_BUTTON_ID;
    btn.type = "button";
    btn.textContent = api.getPinButtonText(false);

    async function refresh() {
      try {
        const pinned = await readPinnedState();
        btn.textContent = api.getPinButtonText(pinned);
        btn.setAttribute("data-pinned", pinned ? "true" : "false");
      } catch (error) {
        console.error("[Pake Template] refresh failed", error);
      }
    }

    btn.addEventListener("click", async () => {
      try {
        const pinned = await togglePinnedState();
        btn.textContent = api.getPinButtonText(pinned);
        btn.setAttribute("data-pinned", pinned ? "true" : "false");
      } catch (error) {
        console.error("[Pake Template] toggle failed", error);
      }
    });

    root.document.body.appendChild(btn);
    refresh();
  }

  function ensureUrlPanel() {
    if (!root.document?.body || root.document.getElementById(URL_BUTTON_ID) || !hasInvoke()) {
      return;
    }

    const button = root.document.createElement("button");
    button.id = URL_BUTTON_ID;
    button.type = "button";
    button.textContent = "URL";

    const panel = root.document.createElement("div");
    panel.id = URL_PANEL_ID;
    panel.hidden = true;
    panel.innerHTML = [
      '<div class="pake-url-panel__title">Open URL</div>',
      '<div class="pake-url-panel__hint">Save a new page address and open it now.</div>',
      '<input class="pake-url-panel__input" type="text" spellcheck="false" placeholder="https://example.com" />',
      '<div class="pake-url-panel__actions">',
      '<button type="button" data-action="save">Save &amp; Open</button>',
      '<button type="button" data-action="reset">Reset Default</button>',
      '<button type="button" data-action="close">Close</button>',
      "</div>",
      '<div class="pake-url-panel__status" aria-live="polite"></div>',
    ].join("");

    const input = panel.querySelector(".pake-url-panel__input");
    const status = panel.querySelector(".pake-url-panel__status");

    function setStatus(message, isError) {
      status.textContent = message || "";
      status.setAttribute("data-error", isError ? "true" : "false");
    }

    async function openPanel() {
      panel.hidden = false;
      button.setAttribute("data-open", "true");
      setStatus("Loading current URL...", false);

      try {
        const currentUrl = await getCurrentAppUrl();
        input.value = currentUrl;
        input.focus();
        input.select();
        setStatus("Current URL loaded.", false);
      } catch (error) {
        console.error("[Pake Template] load URL failed", error);
        setStatus("Failed to load current URL.", true);
      }
    }

    function closePanel() {
      panel.hidden = true;
      button.setAttribute("data-open", "false");
      setStatus("", false);
    }

    button.addEventListener("click", () => {
      if (panel.hidden) {
        openPanel();
      } else {
        closePanel();
      }
    });

    panel.addEventListener("click", async (event) => {
      const action = event.target?.getAttribute("data-action");
      if (!action) {
        return;
      }

      if (action === "close") {
        closePanel();
        return;
      }

      if (action === "save") {
        const nextUrl = input.value.trim();
        if (!nextUrl) {
          setStatus("Please enter a valid URL.", true);
          input.focus();
          return;
        }

        try {
          const savedUrl = await setCurrentAppUrl(nextUrl);
          setStatus("Saved. Opening...", false);
          openUrl(savedUrl);
        } catch (error) {
          console.error("[Pake Template] save URL failed", error);
          setStatus(String(error), true);
        }
        return;
      }

      if (action === "reset") {
        try {
          const defaultUrl = await resetAppUrl();
          setStatus("Reset. Opening default URL...", false);
          openUrl(defaultUrl);
        } catch (error) {
          console.error("[Pake Template] reset URL failed", error);
          setStatus(String(error), true);
        }
      }
    });

    root.document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        closePanel();
      }
    });

    root.document.body.appendChild(button);
    root.document.body.appendChild(panel);
  }

  function boot() {
    ensurePinButton();
    ensureUrlPanel();
    root.setInterval(() => {
      ensurePinButton();
      ensureUrlPanel();
    }, 1500);
  }

  if (root.document) {
    if (root.document.readyState === "loading") {
      root.document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  function getPinButtonText(pinned) {
    return pinned ? "Unpin" : "Pin";
  }

  return { getPinButtonText };
});
