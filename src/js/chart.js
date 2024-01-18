import * as d3 from "d3"
import { PI } from "./utility"

const DATA = [
  { label: "Utilities", value: "20" },
  { label: "Food Cost", value: "40" },
  { label: "Labor Cost", value: "30" }
]

class Chart {
  constructor(selector) {
    /**
     * Creating a canvas element on dom
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.createElement("canvas")

    // Setting canvas element's context
    this.ctx = this.canvas.getContext("2d")

    // Container selector
    this.selector = selector

    // Animation transition time
    this.transitionTime = 1000

    // Set data
    this.data = DATA

    // Slices list
    this.slices = []

    // Set canvas size
    this.resize()

    // Initializing draw
    this.#_init()
  }

  resize() {
    // Set width and height
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.minSide = Math.min(this.width, this.height)
  }

  draw(t = chart.transitionTime) {
    // Base
    let chart = this
    let alpha = t / chart.transitionTime
    if (alpha > 1) alpha = 1

    // Clear screen
    chart.ctx.setTransform(1, 0, 0, 1, 0, 0)
    chart.ctx.clearRect(0, 0, chart.width, chart.height)

    // Set slice data
    let sliceData = d3.pie().value((e) => parseFloat(e["value"]))(chart.data)

    // Create slices
    chart.slices = []
    sliceData.forEach((sliceRow) =>
      chart.slices.push(new Slice(chart.ctx, sliceRow, alpha))
    )

    // Draw slices
    chart.slices.forEach((slice) => slice.draw())

    // Transition animation callback
    if (alpha < 1)
    requestAnimationFrame(chart.draw.bind(chart))
  }

  // Privates
  #_init() {
    // Base
    let chart = this

    // Appending canvas element
    document.querySelector(chart.selector).appendChild(chart.canvas)

    // Draw chart
    requestAnimationFrame(chart.draw.bind(chart))
  }

  // Getters
  get resScale(){
    return this.minSide / 1000
  }
}
class Slice {
  constructor(context, data, alpha) {
    /** @type {CanvasRenderingContext2D} */
    this.context = context
    /** @type {d3.Arc} */

    // Arc data including (start,end) angle
    this.data = data

    // D3's arc
    this.arc = d3
      .arc()
      .outerRadius(chart.minSide / 2 * 0.9)
      .innerRadius(chart.minSide / 2 * 0.5)
      .cornerRadius(20 * chart.resScale)
      .padAngle((0.05 * PI) * chart.resScale)
      .startAngle(this.data.startAngle * alpha)
      .endAngle(this.data.endAngle * alpha)
      .context(this.context)
  }

  draw() {
    chart.ctx.translate(chart.width / 2, chart.height / 2)
    chart.ctx.beginPath()
    this.arc()
    chart.ctx.fillStyle = "steelblue"
    chart.ctx.fill()
    chart.ctx.closePath()
    chart.ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}

// Adding event listeners for window
window.addEventListener("load", init_handler)
window.addEventListener("resize", resize_handler)

/** @type {Chart} */
let chart
function init_handler() {
  chart = new Chart("#chart-wrapper")
}

function resize_handler() {
  if (typeof chart != "undefined") {
    chart.resize()
    chart.draw()
  } else {
    chart = new Chart("#chart-wrapper")
  }
}
