const svg = d3.select('.canvas')
  .append('svg')
    .attr('height', 600)
    .attr('width', 600);
//create margins and dimensions
const margin = {top:20, right:100, bottom:20, left:100};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left},  ${margin.top})`);
const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');
//join data
d3.json('food.json').then((data)=>{
  const max = d3.max(data, (d)=>{return d.orders});
  //Linear scale declaration
  const y = d3.scaleLinear()
    .domain([0,max])
    .range([graphHeight, 0])
  //bandscale declaration
  const x = d3.scaleBand()
    .domain(data.map(item=> item.food))
    .range([0,400])
    .paddingInner(0.2)
    .paddingOuter(0.2);
  const rects = graph.selectAll('rect')
    .data(data)
 //Binding attributes to elements already present
  rects.attr('width', x.bandwidth)
    .attr('x', (d)=>{return x(d.food)})
    .attr('fill', 'green')
    .attr('height', (d)=>{return graphHeight - y(d.orders)})
    .attr('y', (d)=>{return y(d.orders)})
    //Dynamic elements
  rects.enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('x', (d)=>{return x(d.food)})
    .attr('fill', 'green')
    .attr('height', (d)=>{return graphHeight - y(d.orders)})
    .attr('y', (d)=>{return y(d.orders)})

  //create graph axis
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y)
    .ticks(4)
    .tickFormat((d)=>{ return d +' ' + 'orders'})
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
    
})