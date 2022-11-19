## livereload-basic

> Localhost static website development environment for plain html, css and javascript files with live reload.  
> Uses **gulp** + **browser-sync**.


### Content

- [Dependencies](#dependencies)
- [Installation](#nstallation)
- [Usage](#usage)
- [References](#references)


### Dependencies

The following dependecies are used for this project. Feel free to experiment using other dependencies and versions.

1. Windows 64-bit OS
2. nvm version 1.1.9 (for Windows)
3. NodeJS 16.14.2 installed using nvm
   - node v16.14.2
   - npm v8.5.0
4. yarn v1.22.19
   - installed using NodeJS
3. NodeJS modules (installed using yarn)
	- gulp v.4.0.2
	- browser-sync v.2.27.10


## Installation

1. Clone this repository.  
`https://github.com/weaponsforge/livereload-basic.git`

2. Install dependencies.  
`yarn install`


## Usage

1. Run the localhost static website development environment.  
`yarn dev`

2.  Edit the existing static files from the **./public** directory and wait for live reload. Your updates will reflect on the web browser.

3. To include new static website files on live reload:
	- Stop the localhost **dev** server.
	- Create your new static (.html, .js, .css) files inside the **./public** directory.
	- Re-start the **dev** server.  
`npm run dev`

4. Run the production static website (does not use live reload).  
`yarn start`


## References

[[1]](https://github.com/ciatph/webtools) - live reload using gulp v.3.9.1 (older gulp version)  
[[2]](https://trello.com/c/gFN68i6k) - gulp notes (trello)

@weaponsforge  
20200630