import * as d3 from "d3"

class Chart {
  constructor(selector){
    /**
     * Create canvas element
     * @type {HTMLCanvasElement}
    */
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")

    // Appending canvas element
    document.querySelector(selector).appendChild(this.canvas)

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
  }

  // Private methods
  #_init() {
    requestAnimationFrame(this.#_draw())
  }

  #_draw() {
    requestAnimationFrame(this.#_draw())
  }
}

// Adding event listeners for window
window.addEventListener("load", init_handler)
window.addEventListener("resize", resize_handler)

/** @type {Chart} */
let chart
function init_handler(){
  chart = new Chart("#chart-wrapper")
}
function resize_handler(){
  if(typeof chart != "undefined") {
    chart.resize()
  } else {
    chart = new Chart("#chart-wrapper")
  }
}