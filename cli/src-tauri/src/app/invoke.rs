use crate::util::{
    check_file_or_append, clear_runtime_url, get_download_message_with_lang,
    get_package_name_from_config, get_runtime_config_path, read_runtime_url, show_toast,
    write_runtime_url, MessageType,
};
use std::fs::{self, File};
use std::io::Write;
use std::str::FromStr;
use tauri::http::Method;
use tauri::{command, AppHandle, Manager, Url, WebviewWindow};
use tauri_plugin_http::reqwest::{ClientBuilder, Request};

#[cfg(target_os = "macos")]
use tauri::Theme;

#[cfg(target_os = "windows")]
use windows::Win32::UI::WindowsAndMessaging::{
    GetWindowLongW, SetWindowPos, GWL_EXSTYLE, HWND_NOTOPMOST, HWND_TOPMOST, SWP_ASYNCWINDOWPOS,
    SWP_NOMOVE, SWP_NOSIZE, SWP_NOACTIVATE, SWP_SHOWWINDOW, WS_EX_TOPMOST,
};

#[derive(serde::Deserialize)]
pub struct DownloadFileParams {
    url: String,
    filename: String,
    language: Option<String>,
}

#[derive(serde::Deserialize)]
pub struct BinaryDownloadParams {
    filename: String,
    binary: Vec<u8>,
    language: Option<String>,
}

#[derive(serde::Deserialize)]
pub struct NotificationParams {
    title: String,
    body: String,
    icon: String,
}

#[derive(serde::Deserialize)]
pub struct SetCurrentAppUrlParams {
    url: String,
}

#[command]
pub async fn download_file(app: AppHandle, params: DownloadFileParams) -> Result<(), String> {
    let window: WebviewWindow = app.get_webview_window("pake").ok_or("Window not found")?;

    show_toast(
        &window,
        &get_download_message_with_lang(MessageType::Start, params.language.clone()),
    );

    let download_dir = app
        .path()
        .download_dir()
        .map_err(|e| format!("Failed to get download dir: {}", e))?;

    let output_path = download_dir.join(&params.filename);

    let path_str = output_path.to_str().ok_or("Invalid output path")?;

    let file_path = check_file_or_append(path_str);

    let client = ClientBuilder::new()
        .build()
        .map_err(|e| format!("Failed to build client: {}", e))?;

    let url = Url::from_str(&params.url).map_err(|e| format!("Invalid URL: {}", e))?;

    let request = Request::new(Method::GET, url);

    let response = client.execute(request).await;

    match response {
        Ok(mut res) => {
            let mut file =
                File::create(file_path).map_err(|e| format!("Failed to create file: {}", e))?;

            while let Some(chunk) = res
                .chunk()
                .await
                .map_err(|e| format!("Failed to get chunk: {}", e))?
            {
                file.write_all(&chunk)
                    .map_err(|e| format!("Failed to write chunk: {}", e))?;
            }

            show_toast(
                &window,
                &get_download_message_with_lang(MessageType::Success, params.language.clone()),
            );
            Ok(())
        }
        Err(e) => {
            show_toast(
                &window,
                &get_download_message_with_lang(MessageType::Failure, params.language),
            );
            Err(e.to_string())
        }
    }
}

#[command]
pub async fn download_file_by_binary(
    app: AppHandle,
    params: BinaryDownloadParams,
) -> Result<(), String> {
    let window: WebviewWindow = app.get_webview_window("pake").ok_or("Window not found")?;

    show_toast(
        &window,
        &get_download_message_with_lang(MessageType::Start, params.language.clone()),
    );

    let download_dir = app
        .path()
        .download_dir()
        .map_err(|e| format!("Failed to get download dir: {}", e))?;

    let output_path = download_dir.join(&params.filename);

    let path_str = output_path.to_str().ok_or("Invalid output path")?;

    let file_path = check_file_or_append(path_str);

    match fs::write(file_path, &params.binary) {
        Ok(_) => {
            show_toast(
                &window,
                &get_download_message_with_lang(MessageType::Success, params.language.clone()),
            );
            Ok(())
        }
        Err(e) => {
            show_toast(
                &window,
                &get_download_message_with_lang(MessageType::Failure, params.language),
            );
            Err(e.to_string())
        }
    }
}

#[command]
pub fn send_notification(app: AppHandle, params: NotificationParams) -> Result<(), String> {
    use tauri_plugin_notification::NotificationExt;
    app.notification()
        .builder()
        .title(&params.title)
        .body(&params.body)
        .icon(&params.icon)
        .show()
        .map_err(|e| format!("Failed to show notification: {}", e))?;
    Ok(())
}

#[command]
pub async fn update_theme_mode(app: AppHandle, mode: String) {
    #[cfg(target_os = "macos")]
    {
        if let Some(window) = app.get_webview_window("pake") {
            let theme = if mode == "dark" {
                Theme::Dark
            } else {
                Theme::Light
            };
            let _ = window.set_theme(Some(theme));
        }
    }
    #[cfg(not(target_os = "macos"))]
    {
        let _ = app;
        let _ = mode;
    }
}

#[command]
pub fn get_always_on_top(app: AppHandle) -> Result<bool, String> {
    let window: WebviewWindow = app.get_webview_window("pake").ok_or("Window not found")?;
    #[cfg(target_os = "windows")]
    {
        return read_windows_always_on_top(&window);
    }

    #[cfg(not(target_os = "windows"))]
    {
        window
            .is_always_on_top()
            .map_err(|e| format!("Failed to read always on top state: {}", e))
    }
}

#[command]
pub fn toggle_always_on_top(app: AppHandle) -> Result<bool, String> {
    let window: WebviewWindow = app.get_webview_window("pake").ok_or("Window not found")?;
    #[cfg(target_os = "windows")]
    let next_state = !read_windows_always_on_top(&window)?;

    #[cfg(not(target_os = "windows"))]
    let next_state = !window
        .is_always_on_top()
        .map_err(|e| format!("Failed to read always on top state: {}", e))?;

    #[cfg(target_os = "windows")]
    apply_windows_always_on_top(&window, next_state)?;

    #[cfg(not(target_os = "windows"))]
    window
        .set_always_on_top(next_state)
        .map_err(|e| format!("Failed to update always on top state: {}", e))?;

    Ok(next_state)
}

#[command]
pub fn get_current_app_url(app: AppHandle) -> Result<String, String> {
    let package_name = get_package_name_from_config(app.config());
    let config_path = get_runtime_config_path(&app, package_name)
        .map_err(|e| format!("Failed to resolve runtime config path: {}", e))?;

    if let Some(saved_url) =
        read_runtime_url(&config_path).map_err(|e| format!("Failed to read runtime URL: {}", e))?
    {
        return Ok(saved_url);
    }

    let default_url = app
        .state::<crate::app::window::MultiWindowState>()
        .pake_config
        .windows
        .first()
        .map(|window| window.url.clone())
        .ok_or("Window configuration not found")?;

    Ok(default_url)
}

#[command]
pub fn set_current_app_url(
    app: AppHandle,
    params: SetCurrentAppUrlParams,
) -> Result<String, String> {
    Url::from_str(params.url.trim()).map_err(|e| format!("Invalid URL: {}", e))?;

    let package_name = get_package_name_from_config(app.config());
    let config_path = get_runtime_config_path(&app, package_name)
        .map_err(|e| format!("Failed to resolve runtime config path: {}", e))?;

    write_runtime_url(&config_path, &params.url)
        .map_err(|e| format!("Failed to save runtime URL: {}", e))
}

#[command]
pub fn reset_app_url(app: AppHandle) -> Result<String, String> {
    let package_name = get_package_name_from_config(app.config());
    let config_path = get_runtime_config_path(&app, package_name)
        .map_err(|e| format!("Failed to resolve runtime config path: {}", e))?;

    clear_runtime_url(&config_path).map_err(|e| format!("Failed to reset runtime URL: {}", e))?;

    app.state::<crate::app::window::MultiWindowState>()
        .pake_config
        .windows
        .first()
        .map(|window| window.url.clone())
        .ok_or_else(|| "Window configuration not found".to_string())
}

#[cfg(target_os = "windows")]
fn apply_windows_always_on_top(window: &WebviewWindow, pinned: bool) -> Result<(), String> {
    let hwnd = window
        .hwnd()
        .map_err(|e| format!("Failed to get native window handle: {}", e))?;

    let insert_after = if pinned {
        HWND_TOPMOST
    } else {
        HWND_NOTOPMOST
    };

    unsafe {
        SetWindowPos(
            hwnd,
            Some(insert_after),
            0,
            0,
            0,
            0,
            SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE | SWP_SHOWWINDOW | SWP_ASYNCWINDOWPOS,
        )
    }
    .map_err(|e| format!("Failed to update native always on top state: {}", e))?;

    Ok(())
}

#[cfg(target_os = "windows")]
fn read_windows_always_on_top(window: &WebviewWindow) -> Result<bool, String> {
    let hwnd = window
        .hwnd()
        .map_err(|e| format!("Failed to get native window handle: {}", e))?;

    let style = unsafe { GetWindowLongW(hwnd, GWL_EXSTYLE) } as u32;
    Ok((style & WS_EX_TOPMOST.0) != 0)
}

#[command]
#[allow(unreachable_code)]
pub fn clear_cache_and_restart(app: AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("pake") {
        match window.clear_all_browsing_data() {
            Ok(_) => {
                // Clear all browsing data successfully
                app.restart();
                Ok(())
            }
            Err(e) => {
                eprintln!("Failed to clear browsing data: {}", e);
                Err(format!("Failed to clear browsing data: {}", e))
            }
        }
    } else {
        Err("Main window not found".to_string())
    }
}
