# Digital Edition Tools (Ionic 5)
### A rewrite of Digital Edition Tools for Ionic 5


## Project Structure
- src
  - app
    - components
      - grids
        - project-grid
      - tools
        - entity-editor
        - event-editor
        - facsimile-tool
        - publisher-tool
        - tei-selector
        - toc-editor
      - landing-page
    - guards
    - models
    - pages
      - login
    - services
    - tool-selector
  - assets
    - i18n
  - environments
  - theme
  - index.html
  
## Component Logic
The idea is to route the selection of a tool via the tool-selector. By giving the tool-selector a parameter of what tool to show. 

Furthermore the selected tool may have sub components, e.g. a project-grid. By creating sub-modules as individual components they may be added to any page where needed.

## Left Side Table of Contents Logic
The TOC for the App on the left side may be updated in app.component.ts. A data structure with pages and sub-pages are possible.
Example:
```
{   
  title: 'Publisher', url: '/tool-selector/Publisher-Tool', icon: 'mail', isOpen: false, subPages: [
      {title: 'Project Editor', url: 'Project-Editor', icon: 'bulb'}]
}
```
The routing is handeled in the app-routing.module.ts file.

## Explanations
### Components - tools
A collection tools, may inherit other sub components (e.g. components->grids).

### Components - grids
A collection of data-grid components for viewing and editing data.

### Components - landing-page
Useras are directed to this page after a successfull login.

### Guards
For making sure access restrictions apply in app-routing.module.ts.

### Models
For modeling data-structures, currently empty.

### Pages
Currently only hosts the login page. The login page is displayed if the user is not logged in.

A landing page might be added later.

### Services
Services handle the communication with the API.

### Tool-Selector
An Ionic Page for showing the tools in app->components->tools.

### Assets 
Contain images and translation files needed for the app.

### Environments 
Configuration for the App e.g. the URL for the API 
Copy the environment files

`cp src/environments/environment.example.ts src/environments/environment.ts`
`cp src/environments/environment.example.ts src/environments/environment.prod.ts`
`cp src/environments/environment.example.ts src/environments/environment.staging.ts`

and fill in the correct details.
