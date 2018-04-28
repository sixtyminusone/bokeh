import {GestureEvent, MoveEvent} from "core/ui_events"
import {BoxAnnotation} from "../../annotations/box_annotation"
import {Range1d} from "../../ranges/range1d"
import {logger} from "core/logging"
import * as p from "core/properties"
import {GestureTool, GestureToolView} from "./gesture_tool"

export class RangeToolView extends GestureToolView {
  model: RangeTool

  connect_signals(): void {
    super.connect_signals()
  }

  _move(ev: MoveEvent): void {
    ev
  }

  _pan_start(ev: GestureEvent): void {
    ev
  }

  _pan(ev: GestureEvent): void {
    ev
  }

  _pan_end(ev: GestureEvent): void {
    ev
  }

}
const DEFAULT_RANGE_OVERLAY = () => {
  return new BoxAnnotation({
    level: "overlay",
    render_mode: "css",
    fill_alpha: {value: 0.5},
    line_color: {value: "black"},
    line_alpha: {value: 1.0},
    line_width: {value: 2},
    line_dash: {value: [4, 4]},
    })
  }

export namespace RangeTool {
  export interface Attrs extends GestureTool.Attrs {
    x_range: Range1d | null
    y_range: Range1d | null
    overlay: BoxAnnotation
  }

  export interface Props extends GestureTool.Props {}
}

export interface RangeTool extends RangeTool.Attrs {}

export class RangeTool extends GestureTool {

  properties: RangeTool.Props

  constructor(attrs?: Partial<RangeTool.Attrs>) {
    super(attrs)
    this.update_overlay_from_ranges()
  }

  static initClass(): void {
    this.prototype.type = "RangeTool"
    this.prototype.default_view = RangeToolView

    this.define({
        x_range: [ p.Instance, null                 ],
        y_range: [ p.Instance, null                 ],
        overlay: [ p.Instance, DEFAULT_RANGE_OVERLAY ],
    })
  }

  update_overlay_from_ranges() : void {
    if (this.x_range == null && this.y_range == null) {
      this.overlay.left = null
      this.overlay.right = null
      this.overlay.bottom = null
      this.overlay.top = null
      logger.warn('RangeTool not configured with any Ranges.')
    }

    if (this.x_range == null) {
      this.overlay.left = null
      this.overlay.right = null
    }
    else {
      this.overlay.left = this.x_range.start
      this.overlay.right = this.x_range.end
    }

    if (this.y_range == null) {
      this.overlay.bottom = null
      this.overlay.top = null
    }
    else {
      this.overlay.bottom = this.y_range.start
      this.overlay.top = this.y_range.end
    }
  }

  tool_name = "Range Tool"
  icon = "bk-tool-icon-range"
  event_type = ["pan" as "pan", "move" as "move"]
  default_order = 1
}
RangeTool.initClass()
