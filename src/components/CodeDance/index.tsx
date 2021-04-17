import * as React from 'react';
import * as d3 from 'd3';
import s from './index.module.scss';

const alphabet = 'abcdefjhijklmnopqrstuvwxyz'.split('');

const getRandomStr = () => {
  return d3.shuffle(alphabet).slice(0, Math.floor(Math.random() * 16 + 10)).sort();
};

const getTransition = (): any => {
  return d3.transition().duration(750);
};

export default React.memo(function() {
  const update = (g: any, charArray: string[]) => {
    const selection = g.selectAll('text').data(charArray, (d: string): any => d);

    selection
      .transition(getTransition())
      .attr('class', 'update')
      .attr('x', (d: string, i: number) => i * 42);

    selection
      .enter()
      .append('text')
      .attr('class', 'enter')
      .attr('y', '-60')
      .attr('x', (d: string, i: number) => i * 42)
      .transition(getTransition())
      .attr('y', '0')
      .text((d: string): any  => d);

    selection
      .exit()
      .attr('class', 'exit')
      // .attr('dy', '0em')
      .transition(getTransition())
      .attr('y', '60')
      .style('fill-opacity', 1e-6)
      .remove();
  };

  React.useEffect(() => {
    const mainSvg = d3.select('#svg');
    const g = mainSvg.append('g').attr('transform', 'translate(32, 200)');
    update(g, getRandomStr());
    const timer = d3.interval(() => {
      update(g, getRandomStr());
    }, 1000);

    return () => {
      g.remove();
      timer.stop();
    };
  }, []);

  return (
    <div className={s.container}>
      <svg id="svg" className="w-full h-full" />
    </div>
  );
});
