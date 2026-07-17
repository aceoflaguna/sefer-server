# Bible Reader Setup Guide

## Requirements

* Node.js 18 or later

## Installation

1. Clone or download the project.
2. Install the dependencies:

```bash
npm install
```

## Run the Server

Start the Express server:

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

## Features

* Book autocomplete (cached in the browser)
* Browse verses by Book, Chapter, and Verse
* Keyboard shortcuts:

  * **← Left Arrow** – Previous verse
  * **→ Right Arrow** – Next verse
* Last 10 viewed verses are stored in browser history (localStorage)
* Responsive Bootstrap 5 interface
* Full-screen verse reading experience

## Notes

* The application uses revised name based on ASV
