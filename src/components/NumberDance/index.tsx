import * as React from 'react';
import * as d3 from 'd3';
import s from './index.module.scss';

interface IProps {
  max: number;
  children: React.ReactNode;
}

export default React.memo(function({ max = 90000 }: IProps) {
  const danceNumber = React.useRef(0);

  const toCharArray = (num: number): string[] => {
    const str = (num + '').split('');
    console.log(str);
    return str;
  };

  const update = (g: any, charArray: string[]) => {
    const selection = g.selectAll('text').data(charArray, (d: string): any => d);

    selection
      .attr('class', 'update')
      .attr('x', (d: string, i: number) => i * 42);

    selection
      .enter()
      .append('text')
      .attr('x', (d: string, i: number) => i * 42)
      .attr('y', '0')
      .text((d: string): any  => d);

    selection
      .exit()
      .remove();
  };

  React.useEffect(() => {
    const mainSvg = d3.select('#svg');
    const g = mainSvg.append('g').attr('transform', 'translate(32, 200)');
    const step = () => {
      danceNumber.current += (danceNumber.current + '').length;
      update(g, toCharArray(danceNumber.current));
      if (danceNumber.current > max) {
        update(g, toCharArray(max));
      } else if (danceNumber.current < max) {
        requestAnimationFrame(step);
      }
    };
    const requestId = requestAnimationFrame(step);
    return () => {
      g.remove();
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className={s.container}>
      <svg id="svg" className="w-full h-full" />
    </div>
  );
});
