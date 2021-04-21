import * as React from 'react';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export default React.memo(function({ title, children }: IProps) {
  let childNodes = React.Children.toArray(children);
  childNodes = Array.isArray(childNodes) ? childNodes : [childNodes];
  
  return (
    <>
      <h3 className="text-2xl pb-2">{title}</h3>
      {childNodes.map((c, index) => <p key={index}>{c}</p>)}
    </>
  );
});
