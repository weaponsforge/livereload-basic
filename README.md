## livereload-basic

Simple localhost static website development environment for plain HTML, CSS, and JavaScript files with live reload.

Its development static hosting and file-serving architecture are closer to traditional static web servers. Uses **Gulp** and **Browser-Sync**

> [!NOTE]
> An alternate localhost static development environment using **Webpack**, also with live reload, is available at<br>
> https://github.com/weaponsforge/livereload-webpack

> [!TIP]
> Are you using **VSCode** and **want to do live reload** but **do not want to install livereload-basic's Node dependencies** or **run it using Docker**?
> [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) might be the tool for you. Check it out from from the Visual Studio Marketplace.

### Content

- [Dependencies](#dependencies)
- [Installation](#nstallation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Usage with Docker](#usage-with-docker)
   - [Using the Pre-Built Docker Image](#using-the-pre-built-docker-image)
   - [Local-Built Development Image](#local-built-development-image)
- [Building Docker Images](#building-docker-images)
- [Deployment with GitHub Actions](#deployment-with-github-actions)
- [Deployment URLs](#deployment-urls)
- [Debugging Notes](#debugging-notes)
   - [Debugging Traditional Web Apps in VSCode](#debugging-traditional-webapps-in-vscode)
- [References](#references)

### Dependencies

The following dependecies are used for this project. Feel free to experiment using other dependencies and versions.

1. Windows 64-bit OS
2. nvm version 1.1.12 (for Windows)
3. NodeJS 16.14.2 installed using nvm
   - node v20.15.0
   - npm v10.7.0
4. yarn v1.22.22
   - installed using NodeJS
3. NodeJS modules (installed using yarn)
	- gulp v5.0.0
	- browser-sync v3.0.3


## Installation

1. Clone this repository.<br>
`https://github.com/weaponsforge/livereload-basic.git`

2. Install dependencies.<br>
`yarn install`


## Usage

These steps use **Node** and **Yarn** to run the development app.

1. Run the localhost static website development environment.<br>
`yarn dev`

2. Launch the local development website at:<br>
`http://localhost:3000`

3.  Edit the existing static files from the **./public** directory and wait for live reload. Your updates will reflect on the web browser.

4. To include new static website files on live reload:
	- Create new static (.html, .js, .css) files inside the **./public** directory.
	- Refresh the web browser.
	- Restart the web server if updates don't show after a while.<br>
   `yarn dev`

5. Run the production static website (does not use live reload).<br>
`yarn start`

## Available Scripts

### `npm run dev`

Runs the Gulp and Browser-Sync tasks, launching the local website for development mode.

### `npm run dev:docker`

Sets the `IS_DOCKER=true` environment variable before running the Gulp and Browser-Sync tasks inside a Docker container. It doesn't launch the local website for development mode.
> This command runs only in a Linux environment.

### `npm start`

Runs a simple ExpressJS web server serving the static website app using its static middleware.

## Usage with Docker

### Using the Pre-Built Docker Image

This project deploys the latest **development** Docker image to Docker Hub on the creation of new Release/Tags. It is available at:

https://hub.docker.com/r/weaponsforge/livereload-basic

1. Pull the "latest" pre-built development Docker image using any of the two (2) options:
   - Open a terminal and run:<br>
	 `docker pull weaponsforge/livereload-basic`
   - Navigate to the livereload-basic root project directory, then run:<br>
	 `docker compose -f docker-compose.dev.yml pull`

2. Run the development image.
   - Using only Docker (1st option):
	    > **INFO:** This option requires having the static website development HTML, CSS, and JavaScript files inside a `FILE_DIRECTORY` directory in the host machine. This example uses a `FILE_DIRECTORY` named `"/public"`, which contains at least:

		```
		├─ my-website-project
		│   ├─ public
		│   ├─── index.html
		│   ├─── ...
		```
		Navigate to the root project directory (for example, `"my-website-project"`) using a terminal, then run:

		```bash
		# On Linux OS
		docker run -it --rm -p 3000:3000 -v $(pwd)/FILE_DIRECTORY:/opt/app/public weaponsforge/livereload-basic

		# On Windows OS (Command Prompt)
		docker run -it --rm -p 3000:3000 -v %cd%\FILE_DIRECTORY:/opt/app/public -e USE_POLLING=true weaponsforge/livereload-basic
		```

      > 💡**TIP:**<br>
      > _To use other port bindings aside from the default `3000`:_
      > 1. Add a `PORT` environment variable eg., `-e PORT=3003`
      > 2. Replace `-p 3000:3000` with the `PORT` environment variable.

	- Using Docker compose (2nd option):<br>
	    - `docker compose -f docker-compose.dev.yml up`
      - > **INFO:** Uncomment the following lines in the `docker-compose.dev.yml` file when working in a **Windows host**.
         ```yml
         environment:
           # Enable USE_POLLING if working in Windows WSL2 to enable live reload
           - USE_POLLING=true
         ```
      - > **INFO:** Enable using **other ports** - uncomment the following lines in the `docker-compose.dev.yml` and expose the new port under the `"ports"` section.
         ```yml
         ports:
           - "3002:3002"
         environment:
           # Use other ports aside from the 3000 default
           # Ensure to map and expose this port under the "ports" section eg., -"3002:3002"
           - PORT=3002
         ```
3. Refer to the [Usage](#usage) section steps **# 2 - # 4** for local development.

### Local-Built Development Image

1. Build the Docker image for local development.
   - `docker compose -f docker-compose.dev.yml build`
	    > **INFO:** Do this step only once or after installing new packages in the package.json file.
   - Refer to the [Development Image](#development-image) section for more information.

2. Run the development image.<br>
`docker compose -f docker-compose.dev.yml up`

3. Refer to the [Usage](#usage) section steps **# 2 - # 3** for local development.

4. Stop and exit the development container.<br>
`docker compose -f docker-compose.dev.yml down`

## Building Docker Images

### Development Image

The **development** Docker image contains Node runtime, Gulp, Browser-Sync and Yarn dependencies, and the latest repository source codes for local development. Build it with:

`docker compose -f docker-compose.dev.yml build`

### Production Image

The **production** Docker image contains the static website running in an Nginx container for minimal production website build. Build it with:

`docker compose -f docker-compose.prod.yml build`

## Deployment with GitHub Actions

This repository deploys the **local development** Docker image to Docker Hub on the creation of new Release/Tags.

Add the following GitHub Secrets and Variables to enable deployment to Docker Hub.

#### GitHub Secrets

| GitHub Secret | Description |
| --- | --- |
| DOCKERHUB_USERNAME | (Optional) Docker Hub username. Required to enable pushing the development image to Docker Hub. |
| DOCKERHUB_TOKEN | (Optional) Deploy token for the Docker Hub account. Required to enable pushing the development image to Docker Hub. |

#### GitHub Variables

| GitHub Variable | Description |
| --- | --- |
| DOCKERHUB_USERNAME | (Optional) Docker Hub username. Required to enable pushing the development image to Docker Hub. |

## Deployment URLs

**Docker Hub**<br>
https://hub.docker.com/r/weaponsforge/livereload-basic

**Live Preview (Sample Website)**<br>
https://weaponsforge.github.io/livereload-basic/


## Debugging Notes

<details>
<summary id="debugging-traditional-webapps-in-vscode">
	<b>Debugging Traditional Web Apps in VSCode</b>
</summary>

<br>

> Debugging regular (traditional) web apps with VSCode is similar to debugging and adding breakpoints from the Chrome or Edge browser's **Sources** tab.

> **TIP**<br>
> Take note of its VSCode launch settings with a `"pathMapping"` key. It is quite similar to the VSCode launch settings of [web apps launched with Webpack](https://github.com/weaponsforge/livereload-webpack#other-notes).

1. Add breakpoints in the JavaScript (`*.js`) files inside the website's directory entry point at the `"public/"` directory.

2. Copy the following VSCode launch configurations to the `/.vscode/launch.json` file's `configurations[]` array:

   **Debug with MS Edge**

   ```
   {
     "name": "Debug Regular App in Edge",
     "request": "launch",
     "type": "msedge",
     "url": "http://localhost:3000",
     "pathMapping": {
      "/": "${workspaceFolder}/public",
     }
   }
   ```

   **Debug with Chrome**

   ```
   {
     "name": "Debug Regular App in Chrome",
     "request": "launch",
     "type": "chrome",
     "url": "http://localhost:3000",
     "pathMapping": {
       "/": "${workspaceFolder}/public",
     }
   }
   ```

3. Run the app using Node or from a container.

4. Select a debugger to run in VSCode. Press `Ctrl + Shift + D`
   - Select `"Debug Regular App in Edge"` to launch an Edge web browser.
   - Select `"Debug Regular App in Chrome"` to launch a Chrome web browser.

5. Run and use the app from the launched browser instance on **step # 4**.

</details>

## References

[[1]](https://github.com/ciatph/webtools) - live reload using gulp v.3.9.1 (older gulp version)<br>
[[2]](https://trello.com/c/gFN68i6k) - gulp notes (trello)

@weaponsforge<br>
20200630<br>
20241008
