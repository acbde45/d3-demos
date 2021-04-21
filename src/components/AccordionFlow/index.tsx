import * as React from 'react';
import * as d3 from 'd3';
import faker from 'faker';
import produce from 'immer';
import { Circle, Rectangle, Triangle } from './icons';
import Content from './Content';

const icons = [<Circle />, <Rectangle />, <Triangle />];
const flowData = d3.range(10).map(i => [
  icons[i % 3],
  <Content title={`Row ${i}`}>
    {d3.range(10).slice(0, d3.randomInt(10)()).map(() => faker.lorem.paragraph())}
  </Content>,
]);

const defaultHeight = 50;

interface IRowProps {
  y: number;
  width: number;
  height: number;
  icon: React.ReactNode;
  content: JSX.Element;
  reportHeight: (height: number) => void;
}

const Row = React.memo((props: IRowProps) => {
  const rowRef: any = React.useRef();
  const contentRef: any = React.useRef();

  React.useEffect(() => {
    if (contentRef.current) {
      props.reportHeight(contentRef.current?.getBoundingClientRect()?.height + 20);
    }
  }, [contentRef.current]);

  return (
    <g transform={`translate(5, ${props.y})`} ref={rowRef}>
      <g className="cursor-pointer">{props.icon}</g>
      <foreignObject style={{ width: props.width, height: props.height }} x={30} y={-14}>
        <div className="w-full" ref={contentRef}>
          {props.content}
        </div>
      </foreignObject>
    </g>
  );
});

export default React.memo(function() {
  const [data, setData] = React.useState(flowData);
  const [heights, setHeights] = React.useState(() => data.map(_ => defaultHeight));
  const svgRef: any = React.useRef();

  const width = React.useMemo(() => {
    if (svgRef.current) {
      return svgRef.current?.getBoundingClientRect()?.width - 100;
    }
    return 1000;
  }, [svgRef.current]);

  return (
    <svg ref={svgRef} className="w-full" height={heights.reduce((sum, h) => sum + h, 0)}>
      <g transform="translate(0, 20)">
        <line
          x1={15}
          x2={15}
          y1={10}
          y2={heights.reduce((sum, h) => sum + h, 0)}
          stroke="lightgrey"
          strokeWidth={1.5}
        />
        {data.map(([icon, content], i) => (
          <Row
            icon={icon}
            width={width}
            height={heights[i]}
            content={content}
            y={heights.slice(0, i).reduce((sum, h) => sum + h, 0)}
            key={i}
            reportHeight={(height: number) => {
              setHeights(produce(draft => {
                draft[i] = height !== undefined && height > defaultHeight ? height : defaultHeight;
              }));
            }}
          />
        ))}
      </g>
    </svg>
  );
})
