use axum::{routing, serve, Router};
use backend::handlers::{contact_details, contact_form, contact_form_post, homepage};
use tower_http::services::ServeDir;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(
            tracing_subscriber::filter::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();

    info!("Cargando rutas...");

    // Path to static files
    let src_path = std::env::current_dir()?.join("public");

    let static_files = Router::new()
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
        );

    let router = Router::new()
        .route("/", routing::get(homepage))
        .route(
            "/contactForm",
            routing::get(contact_form).post(contact_form_post),
        )
        .route("/contactDetails", routing::get(contact_details))
        .nest("/", static_files);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:4242").await?;

    info!("Servidor listo - http://localhost:4242");
    serve(listener, router).await?;
    Ok(())
}
