window.addEventListener('DOMContentLoaded', (_event) => {
        const css = ".pake-control-group {\n    position: fixed;\n    right: 14px;\n    bottom: 14px;\n    z-index: 2147483647;\n    display: inline-flex;\n    align-items: stretch;\n    overflow: hidden;\n    border-radius: 999px;\n    background: rgba(17, 24, 39, 0.94);\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);\n    backdrop-filter: blur(10px);\n}\n\n#pake-pin-btn,\n#pake-refresh-btn,\n#pake-refresh-settings-btn {\n    padding: 6px 8px;\n    border: 0;\n    background: transparent;\n    color: #ffffff;\n    font:\n        400 10px/1 system-ui,\n        -apple-system,\n        BlinkMacSystemFont,\n        \"Segoe UI\",\n        sans-serif;\n    cursor: pointer;\n}\n\n#pake-pin-btn {\n    min-width: 39px;\n}\n\n#pake-pin-btn:hover,\n#pake-refresh-settings-btn:hover,\n#pake-refresh-settings-btn[data-open=\"true\"] {\n    background: rgba(255, 255, 255, 0.08);\n}\n\n#pake-pin-btn:hover {\n    filter: brightness(1.08);\n}\n\n#pake-pin-btn[data-pinned=\"true\"] {\n    background: #dc2626;\n}\n\n#pake-refresh-settings-btn {\n    width: 34px;\n    padding: 4px 8px;\n    border-left: 1px solid rgba(255, 255, 255, 0.12);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    transition:\n        transform 0.2s ease,\n        background 0.2s ease;\n}\n\n#pake-refresh-settings-btn svg {\n    width: 18px;\n    height: 18px;\n    fill: currentColor;\n}\n\n#pake-refresh-btn {\n    min-width: 94px;\n    height: 30px;\n    padding: 0 8px;\n    border-left: 1px solid rgba(255, 255, 255, 0.12);\n    border-radius: 0;\n    background: linear-gradient(\n        135deg,\n        rgba(79, 70, 229, 0.94),\n        rgba(124, 58, 237, 0.9)\n    );\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    gap: 5px;\n    font-weight: 400;\n    opacity: 0.92;\n    transition:\n        transform 0.2s ease,\n        opacity 0.2s ease,\n        background 0.2s ease;\n}\n\n#pake-refresh-btn:hover {\n    background: linear-gradient(\n        135deg,\n        rgba(99, 102, 241, 0.98),\n        rgba(139, 92, 246, 0.94)\n    );\n}\n\n#pake-refresh-btn[data-mode=\"timer-only\"] {\n    width: auto;\n    min-width: 56px;\n    height: 30px;\n    padding: 0 8px;\n    border-radius: 0;\n    background: rgba(17, 24, 39, 0.92);\n}\n\n#pake-refresh-btn[data-mode=\"button-only\"] {\n    gap: 0;\n    min-width: 59px;\n}\n\n.pake-refresh-btn__title {\n    font-size: 10px;\n    line-height: 1;\n}\n\n.pake-refresh-btn__separator {\n    font-size: 10px;\n    line-height: 1;\n    color: rgba(255, 255, 255, 0.72);\n}\n\n.pake-refresh-btn__timer {\n    font-size: 8px;\n    line-height: 1;\n    opacity: 0.9;\n}\n\n#pake-refresh-settings-panel {\n    position: fixed;\n    right: 14px;\n    bottom: 62px;\n    z-index: 2147483647;\n    width: 360px;\n    max-width: calc(100vw - 28px);\n    padding: 14px;\n    border-radius: 16px;\n    background: rgba(17, 24, 39, 0.96);\n    color: #ffffff;\n    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);\n    font:\n        500 12px/1.4 system-ui,\n        -apple-system,\n        BlinkMacSystemFont,\n        \"Segoe UI\",\n        sans-serif;\n}\n\n#pake-refresh-settings-panel[hidden] {\n    display: none !important;\n}\n\n.pake-refresh-settings-panel__title {\n    font-size: 14px;\n    font-weight: 700;\n}\n\n.pake-refresh-settings-panel__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n}\n\n.pake-refresh-settings-panel__close {\n    width: 28px;\n    height: 28px;\n    border: 0;\n    border-radius: 999px;\n    background: rgba(255, 255, 255, 0.08);\n    color: #ffffff;\n    cursor: pointer;\n    font-size: 18px;\n    line-height: 1;\n}\n\n.pake-refresh-settings-panel__close:hover {\n    background: rgba(255, 255, 255, 0.14);\n}\n\n.pake-refresh-settings-panel__hint {\n    margin-top: 6px;\n    color: rgba(255, 255, 255, 0.75);\n}\n\n.pake-refresh-settings-panel__toggle {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    margin-top: 12px;\n    color: rgba(255, 255, 255, 0.9);\n    width: 100%;\n}\n\n.pake-refresh-settings-panel__toggle + .pake-refresh-settings-panel__toggle {\n    margin-top: 16px;\n}\n\n.pake-refresh-settings-panel__checkbox {\n    width: 16px;\n    height: 16px;\n}\n\n.pake-refresh-settings-panel__input {\n    width: 100%;\n    padding: 10px 12px;\n    border: 1px solid rgba(255, 255, 255, 0.15);\n    border-radius: 10px;\n    background: rgba(255, 255, 255, 0.08);\n    color: #ffffff;\n    outline: none;\n    box-sizing: border-box;\n}\n\n.pake-refresh-settings-panel__grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 10px;\n    margin-top: 12px;\n}\n\n.pake-refresh-settings-panel__field {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n}\n\n.pake-refresh-settings-panel__field span {\n    color: rgba(255, 255, 255, 0.75);\n}\n\n.pake-refresh-settings-panel__field--url {\n    margin-top: 12px;\n}\n\n.pake-refresh-settings-panel__preview {\n    margin-top: 12px;\n    color: #bfdbfe;\n}\n\n.pake-refresh-settings-panel__preview[data-error=\"true\"] {\n    color: #fca5a5;\n}\n\n.pake-refresh-settings-panel__actions {\n    display: flex;\n    gap: 8px;\n    margin-top: 12px;\n    flex-wrap: wrap;\n}\n\n.pake-refresh-settings-panel__actions button {\n    border: 0;\n    border-radius: 999px;\n    padding: 8px 12px;\n    cursor: pointer;\n    font-weight: 600;\n}\n\n.pake-refresh-settings-panel__actions button[data-action=\"save\"] {\n    background: #22c55e;\n    color: #052e16;\n}\n\n.pake-refresh-settings-panel__actions button[data-action=\"default\"] {\n    background: #f59e0b;\n    color: #451a03;\n}\n\n.pake-refresh-settings-panel__status {\n    min-height: 18px;\n    margin-top: 10px;\n    color: #bfdbfe;\n}\n\n.pake-refresh-settings-panel__status[data-error=\"true\"] {\n    color: #fca5a5;\n}\n\n@media (max-width: 700px) {\n    .pake-control-group {\n        right: 10px;\n        bottom: 10px;\n    }\n\n    #pake-refresh-btn {\n        min-width: 80px;\n        height: 26px;\n        padding: 0 9px;\n    }\n\n    #pake-refresh-btn[data-mode=\"timer-only\"] {\n        min-width: 60px;\n        height: 26px;\n    }\n\n    #pake-refresh-settings-panel {\n        right: 10px;\n        bottom: 54px;\n    }\n\n    @media (max-width: 768px) {\n        /* 最外层只保留主内容容器 */\n        body > div:nth-of-type(1) > div:nth-of-type(1) > *:not(.min-h-screen) {\n            display: none !important;\n        }\n\n        /* min-h-screen 下只保留 tab-content */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > *:not(.tab-content) {\n            display: none !important;\n        }\n\n        /* tab-content 下只保留 fade-in */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > *:not(.fade-in) {\n            display: none !important;\n        }\n\n        /* fade-in 下只保留 glass 主卡片 */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > div.fade-in\n            > *:not(.glass-strong) {\n            display: none !important;\n        }\n\n        /* glass 卡片下只保留第 3 块 grid 区域 */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > div.fade-in\n            > div.glass-strong\n            > *:not(:nth-of-type(3)) {\n            display: none !important;\n        }\n\n        /* grid 下只保留第 2 列（限制配置列） */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > div.fade-in\n            > div.glass-strong\n            > div:nth-of-type(3)\n            > *:not(:nth-of-type(2)) {\n            display: none !important;\n        }\n\n        /* 该列下只保留第 1 个 card */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > div.fade-in\n            > div.glass-strong\n            > div:nth-of-type(3)\n            > div:nth-of-type(2)\n            > *:not(:nth-of-type(1)) {\n            display: none !important;\n        }\n\n        /* card 下只保留限制列表 */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > div.fade-in\n            > div.glass-strong\n            > div:nth-of-type(3)\n            > div:nth-of-type(2)\n            > div:nth-of-type(1)\n            > *:not(.space-y-4) {\n            display: none !important;\n        }\n\n        /* 限制列表里只保留第 3 项，也就是“时间窗口限制”所在块 */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > div.fade-in\n            > div.glass-strong\n            > div:nth-of-type(3)\n            > div:nth-of-type(2)\n            > div:nth-of-type(1)\n            > div.space-y-4\n            > *:not(:nth-of-type(3)) {\n            display: none !important;\n        }\n\n        /* 第 3 项里只保留 space-y-1 这个目标块 */\n        body\n            > div:nth-of-type(1)\n            > div:nth-of-type(1)\n            > div.min-h-screen\n            > div.tab-content\n            > div.fade-in\n            > div.glass-strong\n            > div:nth-of-type(3)\n            > div:nth-of-type(2)\n            > div:nth-of-type(1)\n            > div.space-y-4\n            > div:nth-of-type(3)\n            > *:not(.space-y-1) {\n            display: none !important;\n        }\n\n        /* 视觉精简 */\n        body,\n        body > div:nth-of-type(1),\n        body > div:nth-of-type(1) > div:nth-of-type(1),\n        body > div:nth-of-type(1) > div:nth-of-type(1) > div.min-h-screen {\n            background: #fff !important;\n        }\n\n        div.min-h-screen {\n            padding: 0 !important;\n            min-height: auto !important;\n        }\n\n        .glass-strong,\n        .card {\n            background: transparent !important;\n            box-shadow: none !important;\n            border: 0 !important;\n            padding: 0 !important;\n        }\n\n        .space-y-1 {\n            padding: 0 16px 12px 16px !important;\n            margin: -10px 0 0 0 !important;\n        }\n        /* 进度条所在这一块 */\n        .space-y-1 {\n            gap: 8px !important;\n        }\n        .space-y-1 > div:nth-of-type(1) {\n            display: none;\n        }\n\n        /* 灰色轨道 */\n        .space-y-1 .h-1.w-full.rounded-full.bg-gray-200,\n        .space-y-1 .h-1.rounded-full.bg-gray-200,\n        .space-y-1 [class*=\"bg-gray-200\"][class*=\"h-1\"] {\n            height: 10px !important;\n            border-radius: 999px !important;\n            background: #aaa !important;\n            overflow: hidden !important;\n        }\n\n        .space-y-1 .h-1.rounded-full.transition-all.duration-300 {\n            height: 10px !important;\n            border-radius: 999px !important;\n        }\n\n        /* 进度条下面的说明文字下移 */\n        .space-y-1 .text-xs.text-gray-500,\n        .space-y-1 .text-\\[11px\\].text-gray-500,\n        .space-y-1 p,\n        .space-y-1 span.text-gray-500:last-child {\n            margin-top: 6px !important;\n            display: block !important;\n            line-height: 1.45 !important;\n        }\n        .mt-4 {\n            margin-top: 0 !important;\n        }\n    }\n}\n";
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
    const CONTROL_GROUP_ID = "pake-control-group";
    const REFRESH_BUTTON_ID = "pake-refresh-btn";
    const REFRESH_SETTINGS_BUTTON_ID = "pake-refresh-settings-btn";
    const REFRESH_SETTINGS_PANEL_ID = "pake-refresh-settings-panel";
    const URL_SYNC_STATE_KEY = "pake-url-sync-state";
    const PINNED_STATE_STORAGE_KEY = "pake-pinned-state-preview";
    const REFRESH_INTERVAL_STORAGE_KEY = "pake-refresh-interval-seconds";
    const REFRESH_ENABLED_STORAGE_KEY = "pake-refresh-enabled";
    const REFRESH_BUTTON_VISIBLE_STORAGE_KEY = "pake-refresh-button-visible";
    const DEFAULT_REFRESH_INTERVAL_SECONDS = 60;

    function hasInvoke() {
        return typeof root.__TAURI__?.core?.invoke === "function";
    }

    async function readPinnedState() {
        if (!hasInvoke()) {
            return root.localStorage?.getItem(PINNED_STATE_STORAGE_KEY) === "true";
        }

        return root.__TAURI__.core.invoke("get_always_on_top");
    }

    async function togglePinnedState() {
        if (!hasInvoke()) {
            const nextPinned = !(await readPinnedState());
            root.localStorage?.setItem(PINNED_STATE_STORAGE_KEY, nextPinned ? "true" : "false");
            return nextPinned;
        }

        return root.__TAURI__.core.invoke("toggle_always_on_top");
    }

    async function setCurrentAppUrl(url) {
        return root.__TAURI__.core.invoke("set_current_app_url", { params: { url } });
    }

    async function resetAppUrl() {
        return root.__TAURI__.core.invoke("reset_app_url");
    }

    function safeNavigateTo(url) {
        if (url && typeof url === "string") {
            root.location.href = url;
        }
    }

    function readRefreshIntervalSeconds() {
        const rawValue = root.localStorage?.getItem(REFRESH_INTERVAL_STORAGE_KEY);
        const parsedValue = Number(rawValue);

        if (!Number.isFinite(parsedValue) || parsedValue < 5) {
            return DEFAULT_REFRESH_INTERVAL_SECONDS;
        }

        return Math.round(parsedValue);
    }

    function writeRefreshIntervalSeconds(seconds) {
        root.localStorage?.setItem(REFRESH_INTERVAL_STORAGE_KEY, String(seconds));
    }

    function readRefreshEnabled() {
        return root.localStorage?.getItem(REFRESH_ENABLED_STORAGE_KEY) !== "false";
    }

    function writeRefreshEnabled(enabled) {
        root.localStorage?.setItem(REFRESH_ENABLED_STORAGE_KEY, enabled ? "true" : "false");
    }

    function readRefreshButtonVisible() {
        return root.localStorage?.getItem(REFRESH_BUTTON_VISIBLE_STORAGE_KEY) !== "false";
    }

    function writeRefreshButtonVisible(visible) {
        root.localStorage?.setItem(REFRESH_BUTTON_VISIBLE_STORAGE_KEY, visible ? "true" : "false");
    }

    function formatCountdown(seconds) {
        const safeSeconds = Math.max(0, Math.round(seconds));
        if (safeSeconds <= 60) {
            return `${safeSeconds}秒`;
        }

        const minutes = Math.floor(safeSeconds / 60);
        const remainingSeconds = safeSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    function updateRefreshButtonDisplay() {
        const state = root.pakeRefreshState;
        if (!state) {
            return;
        }

        const { button, title, separator, timer, refreshEnabled, refreshButtonVisible, countdown } = state;

        if (!refreshEnabled && !refreshButtonVisible) {
            button.hidden = true;
            button.style.display = "none";
            return;
        }

        button.hidden = false;
        button.style.display = "flex";

        if (refreshButtonVisible) {
            title.hidden = false;
            title.textContent = "悬浮刷新";
            separator.hidden = !refreshEnabled;
            if (refreshEnabled) {
                timer.hidden = false;
                timer.textContent = formatCountdown(countdown);
            } else {
                timer.hidden = true;
                timer.textContent = "";
            }
            button.setAttribute("data-mode", refreshEnabled ? "button-with-timer" : "button-only");
            return;
        }

        title.hidden = true;
        separator.hidden = true;
        timer.hidden = false;
        timer.textContent = formatCountdown(countdown);
        button.setAttribute("data-mode", "timer-only");
    }

    function createUrlSyncState() {
        if (root[URL_SYNC_STATE_KEY]) {
            return root[URL_SYNC_STATE_KEY];
        }

        root[URL_SYNC_STATE_KEY] = {
            lastObservedUrl: root.location.href,
            lastQueuedUrl: "",
            lastSavedUrl: "",
            saveTimer: null,
            hooksInstalled: false,
        };

        return root[URL_SYNC_STATE_KEY];
    }

    function rememberUrl(url, options) {
        const state = createUrlSyncState();
        const nextUrl = typeof url === "string" ? url.trim() : "";
        const delay = options?.delay ?? 150;

        if (!hasInvoke() || !nextUrl || nextUrl === state.lastSavedUrl || nextUrl === state.lastQueuedUrl) {
            return;
        }

        state.lastQueuedUrl = nextUrl;

        if (state.saveTimer) {
            root.clearTimeout(state.saveTimer);
        }

        const persist = async () => {
            try {
                await setCurrentAppUrl(nextUrl);
                state.lastSavedUrl = nextUrl;
            } catch (error) {
                console.error("[Pake Inject] failed to persist current URL", error);
            } finally {
                if (state.lastQueuedUrl === nextUrl) {
                    state.lastQueuedUrl = "";
                }
            }
        };

        if (delay <= 0) {
            state.saveTimer = null;
            persist();
            return;
        }

        state.saveTimer = root.setTimeout(persist, delay);
    }

    function syncCurrentUrl(options) {
        const state = createUrlSyncState();
        const currentUrl = root.location.href;

        if (currentUrl !== state.lastObservedUrl) {
            state.lastObservedUrl = currentUrl;
        }

        rememberUrl(currentUrl, options);
    }

    function bindUrlPersistence() {
        if (!root.document?.body || !hasInvoke()) {
            return;
        }

        const state = createUrlSyncState();
        if (state.hooksInstalled) {
            return;
        }

        state.hooksInstalled = true;

        const originalPushState = root.history.pushState.bind(root.history);
        const originalReplaceState = root.history.replaceState.bind(root.history);

        root.history.pushState = function pushState() {
            const result = originalPushState(...arguments);
            syncCurrentUrl({ delay: 0 });
            return result;
        };

        root.history.replaceState = function replaceState() {
            const result = originalReplaceState(...arguments);
            syncCurrentUrl({ delay: 0 });
            return result;
        };

        root.addEventListener("popstate", () => syncCurrentUrl({ delay: 0 }));
        root.addEventListener("hashchange", () => syncCurrentUrl({ delay: 0 }));

        root.document.addEventListener(
            "click",
            (event) => {
                const anchor = event.target?.closest?.("a[href]");
                if (!anchor) {
                    return;
                }

                if (
                    event.defaultPrevented ||
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    anchor.target === "_blank" ||
                    anchor.hasAttribute("download")
                ) {
                    return;
                }

                rememberUrl(anchor.href, { delay: 0 });
            },
            true,
        );

        root.document.addEventListener(
            "submit",
            (event) => {
                const form = event.target;
                if (!(form instanceof root.HTMLFormElement)) {
                    return;
                }

                const action = form.action || root.location.href;
                rememberUrl(action, { delay: 0 });
            },
            true,
        );

        syncCurrentUrl({ delay: 0 });
        root.setInterval(() => syncCurrentUrl({ delay: 0 }), 1000);
    }

    function ensureControlGroup() {
        if (!root.document?.body) {
            return null;
        }

        let group = root.document.getElementById(CONTROL_GROUP_ID);
        if (group) {
            return group;
        }

        group = root.document.createElement("div");
        group.id = CONTROL_GROUP_ID;
        group.className = "pake-control-group";
        root.document.body.appendChild(group);
        return group;
    }

    function ensurePinButton() {
        if (!root.document?.body || root.document.getElementById(PIN_BUTTON_ID)) {
            return;
        }

        const group = ensureControlGroup();
        if (!group) {
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
                btn.title = hasInvoke()
                    ? pinned
                        ? "Cancel always on top"
                        : "Keep always on top"
                    : pinned
                      ? "Preview mode: simulated always-on-top is enabled"
                      : "Preview mode: simulated always-on-top is disabled";
            } catch (error) {
                console.error("[Pake Inject] failed to read pin state", error);
            }
        }

        btn.addEventListener("click", async () => {
            try {
                const pinned = await togglePinnedState();
                btn.textContent = api.getPinButtonText(pinned);
                btn.setAttribute("data-pinned", pinned ? "true" : "false");
                btn.title = hasInvoke()
                    ? pinned
                        ? "Cancel always on top"
                        : "Keep always on top"
                    : pinned
                      ? "Preview mode: simulated always-on-top is enabled"
                      : "Preview mode: simulated always-on-top is disabled";
            } catch (error) {
                console.error("[Pake Inject] failed to toggle pin", error);
            }
        });

        group.appendChild(btn);
        refresh();
    }

    function ensureRefreshSettingsButton() {
        if (!root.document?.body || root.document.getElementById(REFRESH_SETTINGS_BUTTON_ID)) {
            return;
        }

        const group = ensureControlGroup();
        if (!group) {
            return;
        }

        const settingsButton = root.document.createElement("button");
        settingsButton.id = REFRESH_SETTINGS_BUTTON_ID;
        settingsButton.type = "button";
        settingsButton.className = "pake-refresh-settings-btn";
        settingsButton.title = "设置自动刷新间隔";
        settingsButton.setAttribute("aria-label", "设置自动刷新间隔");
        settingsButton.innerHTML = [
            '<svg viewBox="0 0 24 24" aria-hidden="true">',
            '<path d="M12 8.6A3.4 3.4 0 1 0 12 15.4A3.4 3.4 0 1 0 12 8.6Z"></path>',
            '<path d="M19.4 13.5c.05-.5.05-1 0-1.5l1.66-1.3a1 1 0 0 0 .24-1.28l-1.57-2.71a1 1 0 0 0-1.2-.45l-1.95.78a7.54 7.54 0 0 0-1.3-.75l-.3-2.08A1 1 0 0 0 14 3h-3.14a1 1 0 0 0-.99.84l-.3 2.08c-.45.18-.89.43-1.3.75l-1.95-.78a1 1 0 0 0-1.2.45L3.55 9.05a1 1 0 0 0 .24 1.28L5.45 11.6a7.6 7.6 0 0 0 0 1.8l-1.66 1.3a1 1 0 0 0-.24 1.28l1.57 2.71a1 1 0 0 0 1.2.45l1.95-.78c.4.32.84.57 1.3.75l.3 2.08a1 1 0 0 0 .99.84H14a1 1 0 0 0 .99-.84l.3-2.08c.45-.18.89-.43 1.3-.75l1.95.78a1 1 0 0 0 1.2-.45l1.57-2.71a1 1 0 0 0-.24-1.28l-1.66-1.3Z"></path>',
            "</svg>",
        ].join("");

        const panel = root.document.createElement("div");
        panel.id = REFRESH_SETTINGS_PANEL_ID;
        panel.className = "pake-refresh-settings-panel";
        panel.hidden = true;
        panel.innerHTML = [
            '<div class="pake-refresh-settings-panel__header">',
            '<div class="pake-refresh-settings-panel__title">自动刷新设置</div>',
            '<button type="button" class="pake-refresh-settings-panel__close" data-action="close" aria-label="关闭设置">×</button>',
            "</div>",
            '<div class="pake-refresh-settings-panel__hint">支持按分和秒设置。默认 01:00，少于 60 秒时会直接显示秒数。</div>',
            '<label class="pake-refresh-settings-panel__toggle">',
            '<input class="pake-refresh-settings-panel__checkbox" data-role="refresh-enabled" type="checkbox" />',
            '<span>启用自动刷新</span>',
            "</label>",
            '<label class="pake-refresh-settings-panel__toggle">',
            '<input class="pake-refresh-settings-panel__checkbox" data-role="refresh-button-visible" type="checkbox" />',
            '<span>显示刷新按钮</span>',
            "</label>",
            '<div class="pake-refresh-settings-panel__grid">',
            '<label class="pake-refresh-settings-panel__field">',
            '<span>分钟</span>',
            '<input class="pake-refresh-settings-panel__input" data-unit="minutes" type="number" min="0" step="1" inputmode="numeric" />',
            "</label>",
            '<label class="pake-refresh-settings-panel__field">',
            '<span>秒</span>',
            '<input class="pake-refresh-settings-panel__input" data-unit="seconds" type="number" min="0" max="59" step="1" inputmode="numeric" />',
            "</label>",
            "</div>",
            '<div class="pake-refresh-settings-panel__preview"></div>',
            '<label class="pake-refresh-settings-panel__field pake-refresh-settings-panel__field--url">',
            '<span>自定义 URL</span>',
            '<input class="pake-refresh-settings-panel__input" data-role="custom-url" type="text" spellcheck="false" placeholder="https://example.com" />',
            "</label>",
            '<div class="pake-refresh-settings-panel__actions">',
            '<button type="button" data-action="save">保存</button>',
            '<button type="button" data-action="default">恢复默认url和间隔</button>',
            "</div>",
            '<div class="pake-refresh-settings-panel__status" aria-live="polite"></div>',
        ].join("");

        const minutesInput = panel.querySelector('[data-unit="minutes"]');
        const secondsInput = panel.querySelector('[data-unit="seconds"]');
        const refreshEnabledInput = panel.querySelector('[data-role="refresh-enabled"]');
        const refreshButtonVisibleInput = panel.querySelector('[data-role="refresh-button-visible"]');
        const customUrlInput = panel.querySelector('[data-role="custom-url"]');
        const preview = panel.querySelector(".pake-refresh-settings-panel__preview");
        const status = panel.querySelector(".pake-refresh-settings-panel__status");

        function setStatus(message, isError) {
            status.textContent = message || "";
            status.setAttribute("data-error", isError ? "true" : "false");
        }

        function splitDuration(totalSeconds) {
            const safeTotal = Math.max(0, Math.round(totalSeconds));
            return {
                minutes: Math.floor(safeTotal / 60),
                seconds: safeTotal % 60,
            };
        }

        function readDurationFromInputs() {
            const minutes = Number(minutesInput.value || "0");
            const seconds = Number(secondsInput.value || "0");

            if (!Number.isFinite(minutes) || minutes < 0 || !Number.isFinite(seconds) || seconds < 0 || seconds > 59) {
                return null;
            }

            return Math.round(minutes) * 60 + Math.round(seconds);
        }

        function syncPreview() {
            const totalSeconds = readDurationFromInputs();
            if (!refreshEnabledInput.checked) {
                preview.textContent = refreshButtonVisibleInput.checked ? "当前将显示为 悬浮刷新" : "当前将完全隐藏";
                preview.setAttribute("data-error", "false");
                return;
            }

            if (!refreshButtonVisibleInput.checked) {
                preview.textContent = totalSeconds === null ? "请输入有效的分钟和秒。" : `当前将只显示 ${formatCountdown(totalSeconds)}`;
                preview.setAttribute("data-error", totalSeconds === null ? "true" : "false");
                return;
            }

            preview.textContent = totalSeconds === null ? "请输入有效的分钟和秒。" : `当前将显示为 ${formatCountdown(totalSeconds)}`;
            preview.setAttribute("data-error", totalSeconds === null ? "true" : "false");
        }

        function setInputsFromSeconds(totalSeconds) {
            const parts = splitDuration(totalSeconds);
            minutesInput.value = String(parts.minutes);
            secondsInput.value = String(parts.seconds);
            syncPreview();
        }

        function applyRefreshInterval(seconds, persist) {
            const nextSeconds = Math.max(5, Math.round(seconds));
            const state = root.pakeRefreshState;
            if (!state) {
                return;
            }

            state.refreshIntervalSeconds = nextSeconds;
            state.countdown = nextSeconds;
            setInputsFromSeconds(nextSeconds);
            updateRefreshButtonDisplay();
            if (persist) {
                writeRefreshIntervalSeconds(nextSeconds);
            }
        }

        function applyRefreshEnabled(enabled, persist) {
            const state = root.pakeRefreshState;
            if (!state) {
                return;
            }

            state.refreshEnabled = enabled;
            refreshEnabledInput.checked = enabled;
            syncPreview();
            updateRefreshButtonDisplay();
            if (persist) {
                writeRefreshEnabled(enabled);
            }
        }

        function applyRefreshButtonVisible(visible, persist) {
            const state = root.pakeRefreshState;
            if (!state) {
                return;
            }

            state.refreshButtonVisible = visible;
            refreshButtonVisibleInput.checked = visible;
            syncPreview();
            updateRefreshButtonDisplay();
            if (persist) {
                writeRefreshButtonVisible(visible);
            }
        }

        function openPanel() {
            const state = root.pakeRefreshState;
            const currentSeconds = state ? state.refreshIntervalSeconds : readRefreshIntervalSeconds();
            const currentEnabled = state ? state.refreshEnabled : readRefreshEnabled();
            const currentVisible = state ? state.refreshButtonVisible : readRefreshButtonVisible();
            setInputsFromSeconds(currentSeconds);
            refreshEnabledInput.checked = currentEnabled;
            refreshButtonVisibleInput.checked = currentVisible;
            customUrlInput.value = root.location.href;
            syncPreview();
            setStatus("", false);
            panel.hidden = false;
            settingsButton.setAttribute("data-open", "true");
            minutesInput.focus();
            minutesInput.select();
        }

        function closePanel() {
            panel.hidden = true;
            settingsButton.setAttribute("data-open", "false");
            setStatus("", false);
        }

        settingsButton.addEventListener("click", () => {
            if (panel.hidden) {
                openPanel();
            } else {
                closePanel();
            }
        });

        [minutesInput, secondsInput].forEach((input) => {
            input.addEventListener("input", () => {
                syncPreview();
            });
        });

        refreshEnabledInput.addEventListener("change", () => {
            syncPreview();
        });

        refreshButtonVisibleInput.addEventListener("change", () => {
            syncPreview();
        });

        panel.addEventListener("click", (event) => {
            const action = event.target?.getAttribute("data-action");
            if (!action) {
                return;
            }

            if (action === "close") {
                closePanel();
                return;
            }

            if (action === "default") {
                applyRefreshInterval(DEFAULT_REFRESH_INTERVAL_SECONDS, true);
                applyRefreshEnabled(true, true);
                applyRefreshButtonVisible(true, true);
                setStatus("已恢复默认设置，正在打开默认地址...", false);
                resetAppUrl()
                    .then((defaultUrl) => {
                        root.setTimeout(() => {
                            closePanel();
                            safeNavigateTo(defaultUrl);
                        }, 150);
                    })
                    .catch((error) => {
                        console.error("[Pake Inject] failed to reset URL", error);
                        setStatus("重置默认 URL 失败。", true);
                    });
                return;
            }

            if (action === "save") {
                const nextSeconds = readDurationFromInputs();
                const nextUrl = customUrlInput.value.trim();

                if (refreshEnabledInput.checked && (nextSeconds === null || nextSeconds < 5)) {
                    setStatus("请输入至少 5 秒，且秒数需在 0 到 59 之间。", true);
                    return;
                }

                if (!nextUrl) {
                    setStatus("请输入有效的 URL。", true);
                    customUrlInput.focus();
                    return;
                }

                if (refreshEnabledInput.checked) {
                    applyRefreshInterval(nextSeconds, true);
                }
                applyRefreshEnabled(refreshEnabledInput.checked, true);
                applyRefreshButtonVisible(refreshButtonVisibleInput.checked, true);
                setStatus("正在保存设置...", false);
                setCurrentAppUrl(nextUrl)
                    .then((savedUrl) => {
                        root.setTimeout(() => {
                            closePanel();
                            if ((savedUrl || nextUrl) !== root.location.href) {
                                safeNavigateTo(savedUrl || nextUrl);
                            }
                        }, 150);
                    })
                    .catch((error) => {
                        console.error("[Pake Inject] failed to save settings URL", error);
                        setStatus("保存设置失败。", true);
                    });
            }
        });

        root.document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !panel.hidden) {
                closePanel();
            }
        });

        group.appendChild(settingsButton);
        root.document.body.appendChild(panel);
    }

    function ensureRefreshButton() {
        if (!root.document?.body || root.document.getElementById(REFRESH_BUTTON_ID)) {
            return;
        }

        const group = ensureControlGroup();
        if (!group) {
            return;
        }

        const btn = root.document.createElement("button");
        btn.id = REFRESH_BUTTON_ID;
        btn.type = "button";
        btn.className = "pake-refresh-btn";

        btn.onmouseenter = () => {
            const state = root.pakeRefreshState;
            btn.style.transform = "scale(1.05)";
            btn.style.opacity = "1";
            if (state?.refreshButtonVisible) {
                root.location.reload();
            }
        };

        btn.onmouseleave = () => {
            btn.style.transform = "scale(1)";
            btn.style.opacity = "0.92";
        };

        const title = root.document.createElement("div");
        title.innerText = "悬浮刷新";
        title.className = "pake-refresh-btn__title";

        const separator = root.document.createElement("div");
        separator.className = "pake-refresh-btn__separator";
        separator.setAttribute("aria-hidden", "true");
        separator.textContent = "|";

        const timer = root.document.createElement("div");
        timer.className = "pake-refresh-btn__timer";

        btn.appendChild(title);
        btn.appendChild(separator);
        btn.appendChild(timer);

        let countdown = readRefreshIntervalSeconds();
        let refreshIntervalSeconds = countdown;
        const refreshEnabled = readRefreshEnabled();
        const refreshButtonVisible = readRefreshButtonVisible();
        root.pakeRefreshState = {
            button: btn,
            countdown,
            refreshIntervalSeconds,
            refreshEnabled,
            refreshButtonVisible,
            title,
            separator,
            timer,
        };

        const settingsButton = root.document.getElementById(REFRESH_SETTINGS_BUTTON_ID);
        if (settingsButton?.parentElement === group) {
            group.insertBefore(btn, settingsButton);
        } else {
            group.appendChild(btn);
        }

        updateRefreshButtonDisplay();

        root.setInterval(() => {
            const state = root.pakeRefreshState;
            if (!state) {
                return;
            }

            if (!state.refreshEnabled) {
                updateRefreshButtonDisplay();
                return;
            }

            state.countdown -= 1;
            updateRefreshButtonDisplay();

            if (state.countdown <= 0) {
                root.location.reload();
            }
        }, 1000);
    }

    function boot() {
        ensurePinButton();
        ensureRefreshSettingsButton();
        bindUrlPersistence();
        ensureRefreshButton();
        root.setInterval(() => {
            ensurePinButton();
            ensureRefreshSettingsButton();
            bindUrlPersistence();
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
        return pinned ? "取消置顶" : "置顶";
    }

    return {
        getPinButtonText,
    };
});
 });