<div align="center">
    <img src="https://github.com/frappe/design/blob/master/logos/logo-2019/frappe-gantt-logo.png" height="128">
    <h2>Frappe Gantt</h2>
    <p align="center">
        <p>A simple, interactive, modern gantt chart library for the web</p>
        <a href="https://frappe.github.io/gantt">
            <b>View the demo »</b>
        </a>
    </p>
</div>

<p align="center">
    <a href="https://frappe.github.io/gantt">
        <img src="https://cloud.githubusercontent.com/assets/9355208/21537921/4a38b194-cdbd-11e6-8110-e0da19678a6d.png">
    </a>
</p>

### Install
```
npm install frappe-gantt
```

### Usage
Include it in your HTML:
```
<script src="frappe-gantt.min.js"></script>
<link rel="stylesheet" href="frappe-gantt.css">
```

And start hacking:
```js
var tasks = [
  {
    id: 'Task 1',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3',
    custom_class: 'bar-milestone' // optional
  },
  ...
];
var gantt = new Gantt("#gantt", tasks);
```

You can also pass various options to the Gantt constructor:
```js
var gantt = new Gantt("#gantt", tasks, {
    header_height: 50,
    column_width: 30,
    step: 24,
    view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
    bar_height: 20,
    bar_corner_radius: 3,
    arrow_curve: 5,
    padding: 18,
    view_mode: 'Day',   
    date_format: 'YYYY-MM-DD',
    custom_popup_html: null
});
```

### Multiple periods per Task
Although uncommon in GANTT charts you can specify an additional array for the `periods`
key of a task to show additional bars in the task row of the generated chart

The following example shows the task from above with three additional periods:

```js
var tasks = [
  {
    id: 'Task 1',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: 'Task 2, Task 3',
    custom_class: 'bar-milestone', // optional
    periods: [
    	{
    		start: '2017-01-05',
    		end: '2017-01-07'
    	},
    	{
    		start: '2017-01-09',
    		end: '2017-01-14'
    	},
    	{
    		start: '2017-01-15',
    		end: '2017-01-17'
    	}
    ]
  },
  ...
];
var gantt = new Gantt("#gantt", tasks);
```

Supported formats for `start` and `end` keys of each object in `periods` are the same as for `start` and `end` on 
the main task definition. Please be advised, that it is not supported to enable mouse events for tasks that have periods.
You should disable user interaction for the task bar manipulation if you use the `period` feature.

Due to the structure of the library even if you use periods you have to specify a `start` and `end` attribute for the 
task. If e.g. you want bars inside the row of a task the first period is specified in `start` and `end` and the second 
one in the `periods` attribute:

```js
var tasks = [
  {
    id: 'task1',
    name: 'two time period task',
    start: '2016-12-28',
    end: '2016-12-31',
    periods: [
    	{
    		start: '2017-01-05',
    		end: '2017-01-07'
    	}
    ]
  }
];
var gantt = new Gantt("#gantt", tasks);
```

If a period is clicked, the period definition is passed to the `on_click` handler as second parameter after the task.

### Checkpoints

If you want to display a diamond shaped item for a task to indicate a checkpoint you can specify a period with the
key `type` set to checkpoint. This will render a diamond shape at the specified `start` date.
```js
var tasks = [
  {
     id: 'task1',
     name: 'My checkpoint task',
     start: '2016-12-28',
     end: '2016-12-31',
     periods: [
     	{
            type: 'checkpoint',
            start: '2017-01-05'
     	}
     ]
   }
];
```

### Custom CSS class and fill color

If you want to specify custom classes for tasks and/or periods you may do so with the `custom_class` or `fill` property.
Task classes specifed via `custom_class` on task level are inherited to its periods. This is also true for the `fill`
property. However, if a period defines a `fill` property it overrides the one specified on task level, whereas a
`custom_class` on period level is simply added alongside a `custom_class`on task level. 
```js
var tasks = [
  {
     id: 'task1',
     name: 'My checkpoint task',
     start: '2016-12-28',
     end: '2016-12-31',
     custom_class: 'my-task-css-class',
     periods: [
     	{
            start: '2017-01-05',
            end: '2017-01-07'
     	},
     	{
            start: '2017-01-08',
            end: '2017-01-09',
            custom_class: 'my-period-css-class',
            fill: '#ff0000'
     	}
     ]
   }
];

var gantt = new Gantt("#gantt", tasks);
```

### Contribute

If you want to contribute:

1. Clone this repo.
2. `cd` into project directory
3. `yarn`
4. `yarn run dev`

License: MIT

------------------
Project maintained by [frappe](https://github.com/frappe)
