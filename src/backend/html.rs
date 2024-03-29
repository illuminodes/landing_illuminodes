use askama::Template;

#[derive(Template)]
#[template(path = "home.html")]
pub struct HomepageTemplate;

#[derive(Template)]
#[template(path = "contactForm.html")]
pub struct ContactFormTemplate;

#[derive(Template)]
#[template(path = "contactDetails.html")]
pub struct ContactDetailsTemplate;

#[derive(Template)]
#[template(path = "contactResponse.html")]
pub struct ContactResponseTemplate;
