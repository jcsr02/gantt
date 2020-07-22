import date_utils from './date_utils';
import { $, createSVG, animateSVG } from './svg_utils';

export default class Checkpoint {
    constructor(gantt, task, period) {
        this.set_defaults(gantt, task, period);
        this.prepare();
        this.draw();
        this.bind();
    }

    set_defaults(gantt, task, period) {
        this.gantt = gantt;
        this.task = task;
        this.period = period;
    }

    prepare() {
        this.invalid = this.task.invalid;
        this.size = this.gantt.options.bar_height / Math.sqrt(2);
        this.x = this.compute_x();
        this.y = this.compute_y();

        let group_classes = ['checkpoint-wrapper'];
        if (this.period.custom_class) {
            group_classes.push(this.period.custom_class);
        }
        if (this.task.custom_class) {
            group_classes.push(this.task.custom_class);
        }

        this.group = createSVG('g', {
            class: group_classes.join(' '),
            'data-id': this.task.id
        });
    }

    draw() {
        const attrs = {
            x: 0,
            y: 0,
            width: this.size,
            height: this.size,
            transform: 'translate(' + this.x + ',' + this.y + '), rotate(45)',
            class: 'checkpoint',
            append_to: this.group
        };

        if (this.period && this.period.fill) {
            attrs['style'] = 'fill: ' + this.period.fill;
        } else if (this.task.fill) {
            attrs['style'] = 'fill: ' + this.period.fill;
        }
        this.$e = createSVG('rect', attrs);

        animateSVG(this.$e, 'opacity', 0, 255);

        if (this.invalid) {
            this.$e.classList.add('checkpoint-invalid');
        }
    }

    bind() {
        if (this.invalid) return;
        this.setup_click_event();
    }

    setup_click_event() {
        $.on(this.group, 'click', e => {
            this.gantt.trigger_event('click', [this.task, this.period]);
            this.gantt.unselect_all();
            this.group.classList.toggle('active');
        });
    }

    compute_x() {
        const { step, column_width } = this.gantt.options;
        const task_start = this.period._start;
        const gantt_start = this.gantt.gantt_start;

        const diff = Math.max(
            0,
            date_utils.diff(task_start, gantt_start, 'hour')
        );
        let x = diff / step * column_width;

        if (this.gantt.view_is('Month')) {
            const diff = Math.max(
                0,
                date_utils.diff(task_start, gantt_start, 'day')
            );
            x = diff * column_width / 30;
        }
        return x;
    }

    compute_y() {
        return (
            this.gantt.options.header_height +
            this.gantt.options.padding +
            this.task._index *
                (this.gantt.options.bar_height + this.gantt.options.padding)
        );
    }
}
