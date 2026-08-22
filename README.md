# My Website

A frontend-only draft website built with Angular, focused on responsive design, reusable components, and modern Angular features.

## Features

* Angular components built with **Signals**
* Fully **responsive design**
* Contact form using **Angular Signal Forms** and [`web3forms`](https://web3forms.com/)
* **hCaptcha** integration to help prevent automated/bot form submissions
* Pages:

  * `Home`
  * `About`
  * `Gallery`
  * `Calculator`
  * `Contact`
  * Three expandable `Services` sections
* Reusable **carousel component** shared by:

  * `Home` for text content
  * `Gallery` for images
* Designed with **reusability and universal usage** in mind
* Continuously enhanced as new features and improvements are added

## Environment

The contact form requires a Web3Forms access key.

Set your `web3FormKey` in:

```text
src/app/common/environment.ts
```

The Web3Forms access key is intended to be used on the frontend and can therefore be publicly exposed.

## Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version **22.0.6**.

## Development server

To start a local development server, run:

```bash
ng serve
```

Then open `http://localhost:4200/` in your browser.

The application automatically reloads whenever source files are modified.

## Build

To build the project for production:

```bash
ng build
```

The compiled application will be placed in the `dist/` directory.

## Project Status

This is a **frontend-only draft project** and is continuously evolving.

The main goal is to experiment with Angular features, reusable components, responsive UI, and frontend-only solutions while keeping the application suitable for further extension.
