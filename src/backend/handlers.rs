use crate::html::{
    ContactDetailsTemplate, ContactFormTemplate, ContactResponseTemplate, HomepageTemplate,
};
use axum::Form;
use serde::{Deserialize, Serialize};
use tracing::info;

pub async fn homepage() -> HomepageTemplate {
    HomepageTemplate {}
}

pub async fn contact_form() -> ContactFormTemplate {
    ContactFormTemplate {}
}

pub async fn contact_details() -> ContactDetailsTemplate {
    ContactDetailsTemplate {}
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ContactForm {
    pub name: String,
    pub contact: String,
    pub message: String,
}

pub async fn contact_form_post(Form(form): Form<ContactForm>) -> ContactResponseTemplate {
    info!("Formulario recibido: {:?}", form);
    ContactResponseTemplate {}
}
