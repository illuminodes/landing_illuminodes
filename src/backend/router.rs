use axum::{routing, serve, Router};
use backend::{consts::TCP_ADDRESS, handlers::homepage};
use tower_http::services::ServeDir;
use tracing::{info, error};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[derive(Debug)]
pub enum Errors {
    NotFound,
    AddrInUse,
    ServerError(String),
}

#[tokio::main]
async fn main() -> Result<(), Errors> {
    start_logger();
    info!("Loading server routes...");
    let static_files = static_files_router()?;
    let router = pages_router(static_files);
    let listener = tcp_listener().await?;
    info!("Server started at: http://{}", TCP_ADDRESS);
    if let Err(e) = serve(listener, router).await {
        error!("Server error: {}", e.to_string());
        return Err(Errors::ServerError(e.to_string()));
    }
    Ok(())
}

fn pages_router(static_files: Router) -> Router {
    Router::new()
        .route("/", routing::get(homepage))
        .nest("/", static_files)
}

fn static_files_router() -> Result<Router, Errors> {
    let src_path = std::env::current_dir()
        .map_err(|_| Errors::NotFound)?
        .join("public");

    Ok(Router::new()
        .nest_service(
            "/styles",
            ServeDir::new(format!("{}/styles", src_path.to_str().unwrap())),
        )
        .nest_service(
            "/js",
            ServeDir::new(format!("{}/js", src_path.to_str().unwrap())),
        )
        .nest_service(
            "/assets",
            ServeDir::new(format!("{}/assets", src_path.to_str().unwrap())),
        ))
}
fn start_logger() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(
            tracing_subscriber::filter::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();
}
async fn tcp_listener() -> Result<tokio::net::TcpListener, Errors> {
    tokio::net::TcpListener::bind(TCP_ADDRESS)
        .await
        .map_err(|_| Errors::AddrInUse)
}
