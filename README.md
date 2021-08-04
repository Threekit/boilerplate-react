# Threekit React Dev-Kit

**All you need to build a Web Experience for your Threekit Configurator.**

The **Threekit React Dev-Kit** is a feature-rich React boilerplate containing an extensive library of components, hooks, tools, functionality and deployment workflows needed to build an intuitive and engaging web experience for a Threekit Configurator. We have everything you need to get started!

**Useful Links**

- **[Threekit Docs](https://docs.threekit.com/docs)**
- **[Component Library](https://threekit.github.io/react-threekit)**
- **[Threekit Website](https://www.threekit.com/)**
- **[Threekit Platform - Preview Environment](https://preview.threekit.com/)**
- **[Threekit Platform - Admin-FTS Environment](https://admin-fts.threekit.com/)**

## Table of Contents

- [Threekit React Dev-Kit](#threekit-react-dev-kit)
  - [Table of Contents](#table-of-contents)
  - [Project Setup](#project-setup)
    - [Quick Start](#quick-start)
    - [Development Kit Overview](#development-kit-overview)
      - [Components](#components)
      - [Functionality](#functionality)
      - [Tools](#tools)
  - [Scripts and Deployment Strategies](#scripts-and-deployment-strategies)
    - [Development Server Scripts](#development-server-scripts)
      - [`yarn start-react`](#yarn-start-react)
      - [`yarn start-server`](#yarn-start-server)
      - [`yarn start-storybook`](#yarn-start-storybook)
    - [Build Scripts](#build-scripts)
      - [`yarn build-react`](#yarn-build-react)
      - [`yarn build-server`](#yarn-build-server)
      - [`yarn build`](#yarn-build)
  - [React Features](#react-features)
    - [Threekit Provider](#threekit-provider)
    - [Player](#player)
    - [Forms](#forms)
      - [Form](#form)
    - [Hooks](#hooks)
      - [Use Attribute](#use-attribute)
      - [Use Attributes](#use-attributes)
      - [Use Camera](#use-camera)
      - [Use Camera Toggle](#use-camera-toggle)
      - [Use History](#use-history)
      - [Use Languages](#use-languages)
      - [Use Metadata](#use-metadata)
      - [Use Name](#use-name)
      - [Use Nested Attribute](#use-nested-attribute)
      - [Use Nested Configurator](#use-nested-configurator)
      - [Use Zoom](#use-zoom)
    - [Input Components](#input-components)
    - [Widgets](#widgets)
      - [CameraToggle](#cameratoggle)
      - [Language Selector](#language-selector)
      - [Share](#share)
      - [Snapshot](#snapshot)
      - [Undo](#undo)
      - [Redo](#redo)
      - [Zoom](#zoom)
    - [Displays](#displays)
      - [Title](#title)
      - [Description](#description)
      - [Attribute Title](#attribute-title)
      - [Attribute Value](#attribute-value)
      - [Price](#price)
    - [Wrappers](#wrappers)
      - [Await Loader](#await-loader)
      - [Portal to Element](#portal-to-element)
    - [Layouts](#layouts)
      - [Accordion](#accordion)
      - [Tabs](#tabs)
      - [Steps](#steps)
      - [Modal](#modal)
      - [Drawer](#drawer)
      - [PopOver](#popover)
  - [Tools](#tools-1)
    - [Tooltip](#tooltip)
    - [Animate Item](#animate-item)
  - [API](#api)
    - [Player API](#player-api)
    - [Configurator API](#configurator-api)
    - [Controller API](#controller-api)
      - [Save Configuration](#save-configuration)
      - [Resume Configuration](#resume-configuration)

## Project Setup

### Quick Start

1. Click the `Use this template` button and create a new repo for your project.

2. Clone the new project repo using the following command (replacing PROJECT_REPO with the name of your new project repository).

```sh
git clone https://github.com/Threekit/PROJECT_REPO.git
cd ./PROJECT_REPO
```

3. Install all the dependencies with the following command: `yarn install`
4. Rename the `.env.sample` file to `.env` and replace all the credentials and constants in the file
5. Start up the local development server with the command `yarn start-react`. Your project will be available locally on `http://localhost:3000`.

### Development Kit Overview

**It is strongly recommended that you avoid making any changed to the code in the /threekit folder. To update the React Dev-Kit for projects in active development we recommend replacing the threekit folder with the updated version. This is only manageable if there is no project specific code in the threekit folder.**

The Dev-Kit follows a 'Provider' Pattern where all the React code that interacts with the Threekit API is placed inside the ThreekitProvider. Within the ThreekitProvider context all Threekit components and hooks have complete flexibility in where and how they're used while still fully connected to the Threekit API, the 3D Player, and each other.

The Dev-Kit's provides 3 main family of features: Expanded **functionality**, including react-hooks, that provide direct ways to implement higher-level features, **components** built using that functionality to provide UI presentational elements for the configurator and many other features, and **tools** which allow us to add new and custom interactivity to the 3D.

#### Components

- **Input Components** -> Components that can connect and control Attributes. (i.e. Buttons, Swatch)
- **Widgets** -> Components for Integration Features. (i.e. Snapshot, Zoom)
- **Forms** -> Component for an entire configurator, built up of Input Components. (i.e. Form)
- **Layouts** -> Organizational components for adding structure and visual heirarchy. (i.e. Modal, Accordion)
- **Display** -> Displays information sourced from Threekit. (i.e. Attribute Title, Price)
- **Wrappers** -> Components that wrap a block of express code. (i.e. PortalToElement, AwaitPlayerLoad)

#### Functionality

- **Controller API** -> An extension of the Threekit JS API that adds a variety of higher level functions. (i.e. saveConfiguration, takeSnapshot)
- **Hooks** -> React Redux hooks to build Threekit powered and connected components. (i.e. useAttribute, usePrice).

#### Tools

Tools are extensions for the Threekit Player that allow us to add new functionality to interactions with the 3D, including click, drag, hover, etc. These interactions also have full access to our Redux store and work seemsly between the 3D space and and any browser space UI.

## Scripts and Deployment Strategies

All scripts are expected to be run from the project root directory. These include:

### Development Server Scripts

#### `yarn start-react`

Starts up the React local development server on `localhost:3000`.

#### `yarn start-server`

Starts up the Express.js local development server on `localhost:5000`. In development mode this server will not be responsible for serving the React development server.

#### `yarn start-storybook`

Starts up the local Storybook server on `localhost:6006`, where you can explore and play around with our UI component library.

We use [Storybook](https://storybook.js.org/) to build, test, and showcase our components. You can also use Storybook to support any further development using the boilerplate by adding stories for your own components.

### Build Scripts

#### `yarn build-react`

Bundles React in production mode into the directory `/build_react`.

#### `yarn build-server`

Bundles the Express Server in production mode into the directory `/build_server`.

#### `yarn build`

A single command to build the entire App (React + Express). It executes both the `build-server` and `build-react` scripts as described above.

This command is used by our Dockerfile as part of the build process.

## React Features

### Threekit Provider

The `<ThreekitProvider />` should be wrapped around the portion of the React app where the Threekit API is being used. It initializes the Threekit Player and sets up a store to power all the hooks and connected components that will be used to build the UI to interact with the Player.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { ThreekitProvider } from 'threekit';
import { tooltip } from 'threekit/tools';
import App from './App';

const config = {
  //  While the project credentials should ideally be defined
  //  in a .env file, they can also be passed-in or overwritten
  //  in this config object
  authToken: '3fb4asd5d-ea38-4a05-a1c3-6cf9d8dd3d48',
  assetId: 'a9a66218-bkid-4106-96fe-a0709fdc3dc1',
  orgId: '20df501b-1ef8-4bh0-sfda-2b99426624de',
  threekitEnv: 'admin-fts.threekit.com',
  //  Any additional parameters to pass to the player initialization
  //  can also be added here. For example setting the showShare
  //  property
  showShare: true,
  //  This is where we will setup out additionalTools...
  additionalTools: [tooltip()],
  // We can pass overwrites to the default theme
  theme: { primaryColor: '#54AA54' },
};

ReactDOM.render(
  <ThreekitProvider config={config}>
    <App /> // All Threekit related code goes here
  </ThreekitProvider>,
  document.getElementById('root')
);
```

### Player

The `<Player />` component renders the **Threekit Player**.

```jsx
import { Player } from 'threekit/components';

const ThreekitApp = () => {
  return (
    <div>
      <Player />
    </div>
  );
};
```

The Player Component also comes with **widget containers** that can be used to position widgets or any component in pre-defined locations around the player.

```jsx
import { Player } from 'threekit/components';

//  We can seperate out the widget container component
//  or use the component directly from the Player component
const { TopRightWidgets } = Player;

const ThreekitApp = () => {
  return (
    <div>
      <Player>
        <TopRightWidgets>
          <div>This will show up in the top-right of the player</div>
        </TopRightWidgets>

        <Player.BottomRightWidgets>
          <div>This will show up in the bottom-right of the player</div>
        </Player.BottomRightWidgets>
      </Player>
    </div>
  );
};
```

### Forms

Forms can be used to render out complete configurators as a single component.

#### Form

The `<Form>` component is used to render out an item's entire configurator. By default this is the configurator for the initialized item, however, it can also be for an item nested as a selection in an Attribute.

```jsx
import { Form } from 'threekit/components';

const App = () => {
  return (
    <div>
      <Form />
    </div>
  );
};
```

The Form can take a prop of `attributeComponents` that allow us to specify, which component to use for an attribute or if we want to hide any attributes.

By default the Form will not render reserved attributes. This can be controlled/over-written by using the prop `includeReservedAttributes=false}`

```jsx
import { Form } from 'threekit/components';

const App = () => {
  const attributeComponents = {
    //  This will render out 'Attribute 1' using the Buttons component
    'Attribute 1': 'buttons',
    //  This will prevent 'Attribute 2' from being rendered.
    'Attribute 2': undefined,
  };

  return (
    <div>
      <Form attributeComponents={attributeComponents} />
    </div>
  );
};
```

### Hooks

#### Use Attribute

The `useAttribute` hook allows us to connect a component to an Attribute in our configurator.

It takes the name of the attribute that you want to interact with and returns an array where the first element is the data for that attribute, as returned by the `getDisplayAttributes()` function, and the second element is a function that can be used to update the value of that attribute, by prepping and passing the value on to `setConfiguration()`.

```jsx
import { useAttribute } from 'threekit/hooks';

const AttributeComponent = () => {
  const [attribute, setAttribute] = useAttribute('Attribute Name');

  const selected = attribute.value;

  return (
    <div>
      <div>{attribute.name}</div>
      <div>
        {attribute.values.map((option, i) => (
          <div key={i} onClick={setAttribute(option.assetId)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### Use Attributes

The `useAttributes` hook allows us to connect to all our attributes in the intialized item's configurator.

The hook returns an array of two items. The first item is almost identical to the value returned by `getDisplayAttributes()`. The second item is a change handler function that passes the value passed in straight through to `setConfiguration()`.

```jsx
import { useAttributes } from 'threekit/hooks';

const AttributeComponent = () => {
  const [attributes, setConfiguration] = useAttributes();
  return <div>Attributes Component example</div>;
};
```

#### Use Camera

The `useCamera` hook allows us to use the reserved metadata camera attribute.

The hook will return an array of two items. The first is the camera attributes data, which includes the options available and selected. The second item is the change handler, which allows us to change the active camera.

```jsx
import { useCamera } from 'threekit/hooks';

const Component = () => {
  const [cameraAttribute, handleCameraSelect] = useCamera();

  return (
    <div>
      {cameraAttribute.values.map(el => (
        <button onClick={() => handleCameraSelect(el.value)}>{el.labe}</button>}
      ))}
    </div>
  );
};
```

#### Use Camera Toggle

The `useCameraToggle` hook allows us to toggle through a list of camera options using the reserved camera attribute.

The hook will return an array of two items. The first is the camera attributes data, which includes the options available and selected. This list can be filtered by providing a list of allowed cameras as a property in the hook's config object - `{ cameras: ['Camera 1', 'Camera 2']}`.

The second item is the step change handler where calling the function will update the camera to the next one in the list, looping around if its at the end.

```jsx
import { useCameraToggle } from 'threekit/hooks';

const Component = () => {
  const [cameraAttribute, handleCameraSelect] = useCameraToggle();

  return (
    <div>
      {cameraAttribute.values.map(el => (
        <button onClick={() => handleCameraSelect(el.value)}>{el.labe}</button>}
      ))}
    </div>
  );
};
```

#### Use History

The `useHistory` hook allows us to step forward and backward in our configuration history

The hook returns a function that takes the value we want to step in our history, where negative numbers step us backward (undo) and positive numbers step us forward (redo) assuming we have already stepped back in the history.

```jsx
import { useHistory } from 'threekit/hooks';

const Component = () => {
  const stepHistory = useHistory();

  const handleUndo = () => {
    stepHistory(-1);
  };

  const handleRedo = () => {
    stepHistory(1);
  };

  return (
    <div>
      <button onClick={handleUndo}>Click to Undo</button>
      <button onClick={handleRedo}>Click to Redo</button>
    </div>
  );
};
```

#### Use Languages

The `useLanguages` hook allows us to select and update the language we want our Threekit sourced data (i.e the configurator) to be displayed in.

The hook returns an array that includes, respectively, the selected language, an array of language options (strings) and a change handler for updating the language.

It is used to build the [LanguageSelector Widget](#language-selector)

**Note: The languages have to be defined and populated in your org on the Threekit Platform.**

```jsx
import { useLanguages } from 'threekit/hooks';

const LanguageSelector = () => {
  const [selected, options, handleChange] = useLanguages();
  return <div>// Any custom component to use languages</div>;
};
```

#### Use Metadata

The `useMetadata` hook provides the metadata present on the item used to initialize the player.

The hook returns an object with the metadata.

It is used to build the [Description Display component](#description)

```jsx
import { useMetadata } from 'threekit/hooks';

const MetadataComponent = () => {
  const metadata = useMetadata();
  return (
    <div>
      {Object.entries(metadata).map(([key, value], i) => (
        <div>
          {key}: {value}
        </div>
      ))}
    </div>
  );
};
```

#### Use Name

The `useName` hook provides the name of the item used to initialize the player.

The hook a single string value.

It is used to build the [Title Display component](#title)

```jsx
import { useName } from 'threekit/hooks';

const TitleComponent = () => {
  const name = useName();
  return <div>{name}</div>;
};
```

#### Use Nested Attribute

The `useNestedAttribute` hook allows us to connect a component to an Attribute in the active nested configurator. Except for targetting the nested configurator, it works identically to the [useAttribute() hook](#use-attribute).

```jsx
import { useNestedAttribute } from 'threekit/hooks';

const AttributeComponent = () => {
  const [attribute, setAttribute] = useNestedAttribute('Attribute Name');

  const selected = attribute.value;

  return (
    <div>
      <div>{attribute.name}</div>
      <div>
        {attribute.values.map((option, i) => (
          <div key={i} onClick={setAttribute(option.assetId)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### Use Nested Configurator

The `useNestedConfigurator` allows us to interact with the configurator of an Item that is nested as the selection on an attribute. For example, if the there is a part-reference type attribute where each of the values (items) have their own configurators, the useNestedConfigurator() hook can be used to target the configurator of the selected value (item).

The hook returns an array of four items, in order:

- `attributes` - The Attributes found in the nested configurator
- `address` - The attributes address of the nested configurator.
- `handleSelectAttribute` - To update the address for which attribute's selection to target
- `handleSetConfiguration` - A change handler to update the value of an attribute in the nested configurator. This functions identically to the change handler on the [useAttribute() hook](#use-attribute).

```jsx
import { useNestedConfigurator } from 'threekit/hooks';

const AttributeComponent = () => {
  const [
    attributes,
    address,
    handleSelectAttribute,
    handleSetConfiguration,
  ] = useNestedConfigurator('Attribute Name');

  const selected = attribute.value;

  return <div>Nested Configurator</div>;
};
```

#### Use Zoom

The `useZoom` hook provides functionality to control the zoom property in the Threekit Player.

The hook returns an array of 2 functions: zoom-in and zoom-out. Both functions accept a single argument: the zoom increment step.

The default increment value is `1`.

It is used to build the [Zoom Widget](#zoom).

```jsx
import { useZoom } from 'threekit/hooks';

const ZoomComponent = () => {
  const [zoomIn, zoomOut] = useZoom();
  return (
    <div>
      // Changes zoom by +1
      <button onClick={zoomIn}>Zoom In</button>
      // Changes zoom -3
      <button onClick={() => zoomOut(3)}>Zoom Out</button>
    </div>
  );
};
```

### Input Components

```jsx
import { Buttons, RadioButtons, Dropdown, Swatch } from 'threekit/components';

const App = () => {
  return(
    <Buttons attribute="Attribute Name">
  )
}
```

To explore our Input Components library on Storybook, [click here](https://threekit.github.io/react-threekit).

### Widgets

#### CameraToggle

The `<CameraToggle />` widget is a single button that allows the user to cycle through the cameras defined using the attribute reserverd camera attribute.

The component is built using the [useCameraToggle hook`](#use-camera-toggle).

```jsx
import { CameraToggle } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <CameraToggle />
    </div>
  );
};
```

#### Language Selector

The `<LanguageSelector />` widget allows the user to view, select and update the language the Threekit Configuratos is presented in.

The component is built using the [useLanguages hook](#use-languages). It renders out a simple dropdown to toggle through all the language options.

```jsx
import { LanguageSelector } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <LanguageSelector />
    </div>
  );
};
```

#### Share

The `<Share />` widget renders a button, which when clicked copies a resumable link to the current configuration.

The share feature uses the Configuration Service for the relevant org on the Threekit Platform.

```jsx
import { Share } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <Share />
    </div>
  );
};
```

#### Snapshot

The `<Snapshot />` widget renders a button, which when clicked downloads the specified snapshots to the user's device.

The component can be given specifications for the output image, including `format : 'png'(default) | 'jpeg'`, `filename: string` and size.

The component can be provided with a list of Cameras to use for the snapshots as a prop - `cameras={['snapshot-camera', 'birdsey-camera']}`.

**Note:** These cameras must be setup to the configurator using the reserved camera attribute.

```jsx
import { Snapshot } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <Snapshot cameras={['snapshot-camera', 'birdsey-camera']} format="jpeg" />
    </div>
  );
};
```

#### Undo

The `<Undo />` widget allows the user to Undo or step backward in their configuration history.

The component is built using the [useHistory hook](#use-history). It renders a button that allows us to step our configuration backward.

```jsx
import { Undo } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <Undo />
    </div>
  );
};
```

#### Redo

The `<Redo />` widget allows the user to Redo or step forward in their configuration history, assuming they have already stepped backward.

The component is built using the [useHistory hook](#use-history). It renders a button that allows us to step our configuration backward.

```jsx
import { Redo } from 'threekit/components';

const Component = () => {
  return (
    <div>
      // Any React content
      <Redo />
    </div>
  );
};
```

#### Zoom

The `<Zoom />` widget allows the user to control the zoom property of the Threekit Player.

The component is built using the [useZoom hook](#use-zoom). It provides a simple pair of `+` and `-` buttons the user can click to update the zoom.

It defaults to single increments changes but also accepts increment values to use instead.

```jsx
import { Zoom } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <Zoom />
    </div>
  );
};
```

### Displays

Display components can be used to display specific information anywhere in the UI.

#### Title

The `<Title />` component will display the value of the metadata key `_title` on the Catalog Item used to initialize the Player.

The title can also be overwritten by passing in your own title in as a prop.

```jsx
import { Title } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <Title />
      // With a custom title
      <Title title="Custom Title" />
    </div>
  );
};
```

#### Description

The `<Description />` component will display the value of the metadata key `_description` on the Catalog Item used to initialize the Player.

The description can also be overwritten by passing in your own description in as a prop.

It is built using the [useMetadata() hook](#use-metadata).

```jsx
import { Description } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <Description />
      // With a custom description
      <Description description="This is a custom description." />
    </div>
  );
};
```

#### Attribute Title

The `<AttributeTitle>` will display the translated attribute name of an attribute.

It is built using the [useName() hook](#use-name).

```jsx
import { AttributeTitle } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <AttributeTitle attribute="Attribute Name" />
    </div>
  );
};
```

#### Attribute Value

The `<AttributeValue>` will display the translated selected value of an attribute.

```jsx
import { AttributeValue } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <AttributeValue attribute="Attribute Name">
    </div>
  );
};
```

#### Price

The `<Price>` component will display the total price of your configuration. It is calculated using the first Pricebook in the Org, and the first Curreny in that Pricebook.

It is built using the [usePrice() hook](#use-price).

**Support for multiple Pricebooks and Currencies coming soon**

```jsx
import { Price } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <Price />
    </div>
  );
};
```

### Wrappers

#### Await Loader

The `<AwaitPlayerLoad>` wrapper, is used to wrap any content that we don't want to render until the Threekit Player initialization process is complete.

```jsx
import { AwaitPlayerLoad } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <div>Content here will be rendered as normal</div>
      <AwaitPlayerLoad>
        This content will only be rendered after the Threekit Player
        intialization is complete
      </AwaitPlayerLoad>
    </div>
  );
};
```

#### Portal to Element

The `<PortalToElement>` wrapper can be used to place its content in any div anywhere in the DOM. This is can be very useful when embedding the app in an existing eCommerce page or Website, where you can split the app up into sections to be rendered independetly within the page's exisitng html structure.

The wrapper requries an `elementId` prop to specify the id of the div to render its contents into. It also optionally takes a `strict` prop, which determines the behavior if the element to render the content into is not found. `strict={true}` will only render the contents in the HTML element matching the provided element ID, while `strict={false} (default)` will render out its contents as part of the regular React flow, if the specified element is not found.

```jsx
import { AwaitPlayerLoad } from 'threekit/components';

const Component = () => {
  return (
    <div>
      <div>Content here will be rendered as normal</div>
      <PortalToElement elementId="form-container">
        This content will only be rendered in a div with the id 'form-container'
      </PortalToElement>
    </div>
  );
};
```

### Layouts

Layouts are organizational and design components that we can use to introduce visual heirarhcy and structure to our configurator and application. Most Layout components have no inherent connection to the Threekit API and can be used freely outside of the ThreekitProvider if needed.

#### Accordion

```jsx
import { Accordion } from 'threekit/components';
const { AccordionItem } = Accordion;

const App = () => {
  return (
    <Accordion>
      <AccordionItem label="Section 1 Heading">Section 1 content</AccordionItem>
      <AccordionItem label="Section 2 Heading">Section 2 content</AccordionItem>
    </Accordion>
  );
};
```

#### Tabs

```jsx
import { Tabs } from 'threekit/components';
const { TabPane } = Tabs;

const App = () => {
  return (
    <Tabs>
      <TabPane label="Section 1 Heading">Section 1 content</TabPane>
      <TabPane label="Section 2 Heading">Section 2 content</TabPane>
    </Tabs>
  );
};
```

#### Steps

```jsx
import { Steps } from 'threekit/components';
const { StepPane } = Steps;

const App = () => {
  return (
    <Steps>
      <StepPane label="Section 1 Heading">Section 1 content</StepPane>
      <StepPane label="Section 2 Heading">Section 2 content</StepPane>
    </Steps>
  );
};
```

#### Modal

A Modal is used to present an actionable pop-up to the user.

```jsx
import { useState } from 'react';
import { Modal } from 'threekit/components';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} handleClose={handleClose}>
      <div>
        Content to be placed in the modal is added as an HTML child element.
      </div>
    </Modal>
  );
};
```

#### Drawer

A Drawer can be used to present an actionable slide-out drawer to the user.

```jsx
import { useState } from 'react';
import { Drawer } from 'threekit/components';

const App = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClose = () => setShowDrawer(false);

  return (
    <Drawer show={showDrawer} handleClose={handleClose}>
      <div>
        Content to be placed in the drawer is added as an HTML child element.
      </div>
    </Drawer>
  );
};
```

#### PopOver

A PopOver renders out a button, which when clicken pops out a floating card aligned with one of its corners. The content of the floating card will be the content/children passed into the PopOver component.

```jsx
import { useState } from 'react';
import { PopOver } from 'threekit/components';

const App = () => {
  return (
    <PopOver label="Click me to open" position="bottom-left">
      <div>This content will be in the PopOver's floating card.</div>
    </PopOver>
  );
};
```

## Tools

Tools add functionality to the 3D-player beyond the out-of-the-box features such as scroll to zoom, drag to rotate, and right-click to pan the camera. To implement a tool it needs to be added to the array of `additionalTools` that is passed to the `<ThreekitProvider>` as part of it config object.

```jsx
import { exampleTool } from 'threekit/tools';

const config = {
  additionalTools: [exampleTool()],
};

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={config}>
      <App />
    </ThreekitProvider>
  );
};
```

### Tooltip

The `tooltip` tool displays a tooltip in the Threekit player when hovering over a model which has a tooltip value defined in it's model's Catalog Item Metadata.

The reserved metadata key for a tooltip is `_tooltip`. This metadata field can be overwritten by passing in an override as part of its configuration object.

```jsx
import { tooltip } from 'threekit/tools';

const config = {
  additionalTools: [tooltip({ metadataField: 'productName' })],
};

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={config}>
      <App />
    </ThreekitProvider>
  );
};
```

### Animate Item

The `animateItem` tool applies a transform (translation, rotation, re-scale) to an model over a specified duration.

To use the animateItem tool, the name of the attribute where the Catalog Item, for the Model to animate, is selected must match the name of the null/node that model is being applied to. The properties of the transform, including duration, are stored in the Metadata of the Catalog Item of the Model we intend to animate.

The format for the tranform in the Catalog Item's Metadata is `key=value`, where multiple key-value pairs are seperated by commas. For example `x=1.2, duration=1000`.

The reserved metadata keys for storing animation transforms are:

- Translate -> `_translate`
- Rotate -> `_rotate`

```jsx
import { animateItem } from 'threekit/tools';

const config = {
  additionalTools: [animateItem()],
};

const ThreekitApp = () => {
  return (
    <ThreekitProvider config={config}>
      <App />
    </ThreekitProvider>
  );
};
```

## API

```jsx
const { player, configurator, controller } = window.threekit;
```

The `player` and `configurator` API are the standard API interfaces returned when initializing the Threekit Player.

### Player API

For documentation on the Player API, [click here](https://docs.threekit.com/docs/player-api).

### Configurator API

For documentation on the Configurator API, [click here](https://docs.threekit.com/docs/configurator-api).

### Controller API

The controller API has all the higher-level functionality to interact with the 3D.

```jsx
const { controller } = window.threekit;
```

#### Save Configuration

Use this method to save a configuration on the Threekit platform, along with any additional metadata or thumbnail URLs related to that configuration.

```jsx
const { controller } = window.threekit;

//  optional
const saveData = {
  metadata: {
    color: 'blue',
    sku: 'ABCD-1',
  },
  productVersion: 'v5', // defaults to v1
  thumbnail:
    'https://www.threekit.com/hubfs/Logos%20and%20Trademarks/threekit_logo_black.svg',
};

const response = await controller.saveConfiguration(saveData);
```

#### Resume Configuration

Use this method to resume a configuration saved on the Threekit platform by passing it the saved configuration's ID.

```jsx
const { controller } = window.threekit;

await controller.resumeConfiguration('20df501b-1ef8-4bh0-sfda-2b99426624de');
```
