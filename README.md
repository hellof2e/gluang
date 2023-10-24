# Gluang

### Simple shared app state management for Quarkc.

Gluang automatically re-renders your Quarkc components, when a shared app
state variable they use changes. It's like Quarkc's
[properties](https://quarkc.hellobike.com/#/zh-CN/docs/reactive), but
then shared over multiple components.


## Installation

```
npm install gluang
```


## Basic idea

You keep your shared state in a `Gluang` derived class. This class contains
`stateVar` variables that contain the state. This class can also contain helper
functions that modify the state. Decorate your `Quarkc` classes with the
`connectStore()` mixin. This makes your components automatically re-render
whenever a `stateVar` they use changes.


## Usage

### 1. Create a `Gluang` object:

```javascript
import { createGluang, stateVar } from 'gluang';

class MyState extends createGluang {
    static get stateVars() {
        return {
            counter: 0
        };
    }
}

export const myState = new MyState();
```

### 2. Make your component aware of your state:

By using the `connectStore()` mixin on your `Quarkc component` class and then just
using the `stateVar` variables in your render method:

```javascript
import { QuarkElement, customElement } from "quarkc";
import { connectStore } from 'gluang';
import { myState } from './my-state.js';

@customElement({ tag: "my-component"})
class MyComponent extends connectStore(QuarkElement) {

    render() {
        return (
            <h1>Counter: {myState.counter}</h1>
            <button onClick={() => myState.counter++}></button>
        )
    }

}
```

The components that read `myState.counter` will automatically re-render when
any (other) component updates it.

In more technical words:

A component using the `connectStore()` mixin will re-render when any
`stateVar` - which it read in the last render cycle - changes.


## Docs

For more information about how to use Gluang, check the

TODO: [docs](https://TODO).


## How does this work?


### Basics

When you define a `stateVar` variable, Gluang will observe those variables
whenever they're get or set. When using the `connectStore()` mixin on a
component, during the render of that component, there is a recorder active that
records any `stateVar` that is accessed during the render of that component. At
the end of the render, the recorded `stateVar` variables are collected and
whenever one of them changes, the component will be re-rendered. If the
re-render uses different `stateVar` variables, they are again recorded and
observed for possible rerenders.


### Implementation details

To re-render the component, the `connectStore()` mixin calls Quarkc's
`this.update()`. This will enqueue an update request for the component. The
component will re-render at the end of the execution queue.
`this.update()` can be called multiple times during a particular
JavaScript event (like a click), and it will only update the component once, at
the end of the execution queue. So it doesn't matter when it is called multiple
times when multiple `stateVar` variables are changed during a JavaScript event.
This is an optimization feature built-in in Quarkc. Quarkc uses this
optimization for it's own
[properties](https://quarkc.hellobike.com/#/zh-CN/docs/reactive). This
optimization works in the same way for Gluang's `stateVar` variables.


## Notes

### You can create and use multiple `Gluang` classes at the same time.

It is even encouraged to keep things separate. You can of course have one big
`Gluang` derived class which contains all global app state variables. But it
is probably cleaner if you categorize it into multiple smaller `Gluang`
derived classes. For example, you can put each state class in a separate file,
collected in a `state/` folder, and import them at the places you need.


### You can nest states

If your state requires more hierarchy, you can also nest states. It doesn't
matter to your components how your state is structured, as long as it uses the
correct references to your `stateVar` variables. Refer to the
[docs](TODO: #state-handling/nested-states/)
for more information about nesting states.


### Only new assigns trigger a re-render. Updating an object/array won't trigger a re-render.

Just like Quarkc's
[properties](https://quarkc.hellobike.com/#/zh-CN/docs/reactive), only a
new assign of the `stateVar` triggers a re-render. For example if you have a
state like this:

```javascript
MyState extends Gluang {
    @stateVar() myObj = {myKey: 'myValue'};
    @stateVar() myArray = ['one', 'two', 'three'];
}
```

Then this won't trigger a re-render:

```javascript
myState = new MyState();
myState.myObj.mykey = 'newValue';
myState.myArray.push('four');
```

You'll instead need to assign a new object to the `stateVar`:

```javascript
myState.myObj = {...myState.myObj, myKey: 'newValue'};
myState.myArray = [...myState.myArray, 'four'];
```

Watching for changes inside objects is very complex matter and would make
Gluang way more complicated than desirable. If you are interested in this
kind of thing, check out
[observable-slim](https://github.com/ElliotNB/observable-slim).


## Extra features

### Custom `stateVar` variables

You can easily extend Gluang with a custom `stateVar` handler. An example of
this is the [asyncStateVar](TODO: async-state-var),
which is a `stateVar` variation that makes handling with asynchronous data
easy. To make a custom `stateVar` yourself, create a class that extends from
`StateVar`, exported by Gluang.
[Check out the documentation on this.](TODO: #advanced-usage/state-var-handler/)


## FAQ


### Why should I use shared state for my components? Doesn't that oppose the concept of web components?

The big feature of web components is that they are encapsulated through the
[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).
That means that their internal state isn't affected by state from the outside.
And also that the component's internal state doesn't affect other elements on
the page. This makes web components great for creating reusable elements.
Reusable elements should have no side-effects, meaning that they shouldn't
change state outside of themselves.

Reusable elements are great and we should use them a lot. When you're building
a full application however, it is also desirable to have application-specific
components that have application-specific side-effects. For example, changing
the global app state. And it is of course desirable, that when this global app
state changes, the components that use this global app state are synchronized
with it.

And you can also have a reusable component that has several internal
sub-components. They all might need to share some common internal state.

Gluang is created for these use cases, and is meant to make it as simple as
possible for the developer.


## Notes

Gluang is fork from [lit-state](https://github.com/gitaarik/lit-state) and I rewrote it to work with Quarkc.

###### Changes in this fork
- Renamed to Gluang - so you can use npx gluang directly.
- Add `this.update()` in connectStore in order to it can work with quarkc.
- Remove connectedCallback，disconnectedCallback function in observerState(connectStore),
Because there is no these functions in Quarkc.
- Renamed some functions' name. Also made some changes to the readme.