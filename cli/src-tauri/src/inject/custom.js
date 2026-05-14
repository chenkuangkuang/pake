window.addEventListener('DOMContentLoaded', (_event) => {
        const css = "#pake-pin-btn {\n    position: fixed;\n    top: 14px;\n    right: 14px;\n    z-index: 2147483647;\n    padding: 8px 12px;\n    border: 0;\n    border-radius: 999px;\n    background: #111827;\n    color: #ffffff;\n    font:\n        600 12px/1 system-ui,\n        -apple-system,\n        BlinkMacSystemFont,\n        \"Segoe UI\",\n        sans-serif;\n    cursor: pointer;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);\n}\n\n#pake-pin-btn:hover {\n    filter: brightness(1.08);\n}\n\n#pake-pin-btn[data-pinned=\"true\"] {\n    background: #dc2626;\n}\n\n#pake-url-btn {\n    position: fixed;\n    top: 56px;\n    right: 14px;\n    z-index: 2147483647;\n    padding: 8px 12px;\n    border: 0;\n    border-radius: 999px;\n    background: #2563eb;\n    color: #ffffff;\n    font:\n        600 12px/1 system-ui,\n        -apple-system,\n        BlinkMacSystemFont,\n        \"Segoe UI\",\n        sans-serif;\n    cursor: pointer;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);\n}\n\n#pake-url-btn[data-open=\"true\"] {\n    background: #1d4ed8;\n}\n\n#pake-url-panel {\n    position: fixed;\n    top: 96px;\n    right: 14px;\n    z-index: 2147483647;\n    width: 360px;\n    max-width: calc(100vw - 28px);\n    padding: 14px;\n    border-radius: 16px;\n    background: rgba(17, 24, 39, 0.96);\n    color: #ffffff;\n    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);\n    font:\n        500 12px/1.4 system-ui,\n        -apple-system,\n        BlinkMacSystemFont,\n        \"Segoe UI\",\n        sans-serif;\n}\n\n#pake-url-panel[hidden] {\n    display: none !important;\n}\n\n.pake-url-panel__title {\n    font-size: 14px;\n    font-weight: 700;\n}\n\n.pake-url-panel__hint {\n    margin-top: 6px;\n    color: rgba(255, 255, 255, 0.75);\n}\n\n.pake-url-panel__input {\n    width: 100%;\n    margin-top: 12px;\n    padding: 10px 12px;\n    border: 1px solid rgba(255, 255, 255, 0.15);\n    border-radius: 10px;\n    background: rgba(255, 255, 255, 0.08);\n    color: #ffffff;\n    outline: none;\n    box-sizing: border-box;\n}\n\n.pake-url-panel__actions {\n    display: flex;\n    gap: 8px;\n    margin-top: 12px;\n    flex-wrap: wrap;\n}\n\n.pake-url-panel__actions button {\n    border: 0;\n    border-radius: 999px;\n    padding: 8px 12px;\n    cursor: pointer;\n    font-weight: 600;\n}\n\n.pake-url-panel__actions button[data-action=\"save\"] {\n    background: #22c55e;\n    color: #052e16;\n}\n\n.pake-url-panel__actions button[data-action=\"reset\"] {\n    background: #f59e0b;\n    color: #451a03;\n}\n\n.pake-url-panel__actions button[data-action=\"close\"] {\n    background: rgba(255, 255, 255, 0.12);\n    color: #ffffff;\n}\n\n.pake-url-panel__status {\n    min-height: 18px;\n    margin-top: 10px;\n    color: #bfdbfe;\n}\n\n.pake-url-panel__status[data-error=\"true\"] {\n    color: #fca5a5;\n}\n\n.api-input-wide-card,\n.glass-strong.mb-4.rounded-2xl {\n    display: none;\n}\n.card.flex.h-full.flex-col.p-3 {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n}\n";
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
      });
window.addEventListener('DOMContentLoaded', (_event) => { (function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
        return;
    }

    const api = factory();
    root.pakePinHelpers = api;

    const PIN_BUTTON_ID = "pake-pin-btn";
    const URL_BUTTON_ID = "pake-url-btn";
    const URL_PANEL_ID = "pake-url-panel";
    const REFRESH_BUTTON_ID = "pake-refresh-btn";

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

    function safeReloadTo(url) {
        if (url && typeof url === "string") {
            root.location.href = url;
            return;
        }
        root.location.reload();
    }

    function ensurePinButton() {
        if (!root.document?.body || root.document.getElementById(PIN_BUTTON_ID) || !hasInvoke()) {
            return;
        }

        const btn = root.document.createElement("button");
        btn.id = PIN_BUTTON_ID;
        btn.type = "button";
        btn.className = "pake-pin-btn";
        btn.textContent = api.getPinButtonText(false);

        async function refresh() {
            try {
                const pinned = await readPinnedState();
                btn.textContent = api.getPinButtonText(pinned);
                btn.setAttribute("data-pinned", pinned ? "true" : "false");
                btn.title = pinned ? "Cancel always on top" : "Keep always on top";
            } catch (error) {
                console.error("[Pake Inject] failed to read pin state", error);
            }
        }

        btn.addEventListener("click", async () => {
            try {
                const pinned = await togglePinnedState();
                btn.textContent = api.getPinButtonText(pinned);
                btn.setAttribute("data-pinned", pinned ? "true" : "false");
                btn.title = pinned ? "Cancel always on top" : "Keep always on top";
            } catch (error) {
                console.error("[Pake Inject] failed to toggle pin", error);
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
        button.className = "pake-url-btn";
        button.textContent = "URL";
        button.title = "Change startup URL";

        const panel = root.document.createElement("div");
        panel.id = URL_PANEL_ID;
        panel.className = "pake-url-panel";
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
                console.error("[Pake Inject] failed to load current URL", error);
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

                setStatus("Saving URL...", false);

                try {
                    const savedUrl = await setCurrentAppUrl(nextUrl);
                    setStatus("Saved. Opening...", false);
                    safeReloadTo(savedUrl);
                } catch (error) {
                    console.error("[Pake Inject] failed to save URL", error);
                    setStatus(String(error), true);
                }
                return;
            }

            if (action === "reset") {
                setStatus("Resetting to default URL...", false);

                try {
                    const defaultUrl = await resetAppUrl();
                    setStatus("Reset. Opening default URL...", false);
                    safeReloadTo(defaultUrl);
                } catch (error) {
                    console.error("[Pake Inject] failed to reset URL", error);
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

    function ensureRefreshButton() {
        if (!root.document?.body || root.document.getElementById(REFRESH_BUTTON_ID)) {
            return;
        }

        const isMobile =
            /(iPhone|iPad|iPod|iOS)/i.test(root.navigator.userAgent) ||
            /(Android)/i.test(root.navigator.userAgent);

        const btn = root.document.createElement("button");
        btn.id = REFRESH_BUTTON_ID;
        btn.type = "button";

        btn.style.position = "fixed";
        btn.style.zIndex = "99999";

        if (isMobile) {
            btn.style.top = "10px";
            btn.style.right = "10px";
            btn.style.width = "60px";
            btn.style.height = "60px";
        } else {
            btn.style.bottom = "20px";
            btn.style.left = "20px";
            btn.style.width = "62px";
            btn.style.height = "62px";
        }

        btn.style.background = "linear-gradient(135deg, #4f46e5, #7c3aed)";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "18px";
        btn.style.cursor = "pointer";
        btn.style.display = "flex";
        btn.style.flexDirection = "column";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.gap = "4px";
        btn.style.fontWeight = "bold";
        btn.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
        btn.style.backdropFilter = "blur(10px)";
        btn.style.opacity = "0.92";
        btn.style.transition = "all 0.2s ease";

        btn.onmouseenter = () => {
            btn.style.transform = "scale(1.05)";
            btn.style.opacity = "1";
            root.location.reload();
        };

        btn.onmouseleave = () => {
            btn.style.transform = "scale(1)";
            btn.style.opacity = "0.92";
        };

        const title = root.document.createElement("div");
        title.innerText = "悬浮刷新";
        title.style.fontSize = isMobile ? "12px" : "12px";

        const timer = root.document.createElement("div");
        timer.style.fontSize = "10px";
        timer.style.opacity = "0.9";

        btn.appendChild(title);
        btn.appendChild(timer);
        root.document.body.appendChild(btn);

        let countdown = 60;
        timer.innerText = `${countdown}s`;

        root.setInterval(() => {
            countdown -= 1;
            timer.innerText = `${countdown}s`;

            if (countdown <= 0) {
                root.location.reload();
            }
        }, 1000);
    }

    function boot() {
        ensurePinButton();
        ensureUrlPanel();
        ensureRefreshButton();
        root.setInterval(() => {
            ensurePinButton();
            ensureUrlPanel();
            ensureRefreshButton();
        }, 1500);
    }

    if (root.document) {
        if (root.document.readyState === "loading") {
            root.document.addEventListener("DOMContentLoaded", boot, {
                once: true,
            });
        } else {
            boot();
        }
    }
})(typeof window !== "undefined" ? window : globalThis, function () {
    function getPinButtonText(pinned) {
        return pinned ? "Unpin" : "Pin";
    }

    return {
        getPinButtonText,
    };
});
 });