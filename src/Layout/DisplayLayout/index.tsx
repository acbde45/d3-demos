import * as React from 'react';
import s from './index.module.scss';

class Header extends React.PureComponent {
  static displayName = 'Header';

  render() {
    return this.props.children;
  }
}

class SideBar extends React.PureComponent {
  static displayName = 'SideBar';

  render() {
    return this.props.children;
  }
}

class Content extends React.PureComponent {
  static displayName = 'Content';

  render() {
    return this.props.children;
  }
}

class Layout extends React.PureComponent {
  static displayName = 'Layout';
  static Header = Header;
  static SideBar = SideBar;
  static Content = Content;

  getNode = (type: any) => {
    return React.Children
      ?.toArray(this.props?.children)
      ?.find((child: any) => {
        return child?.type?.displayName === type;
      });
  };

  render () {
    const header: any = this.getNode(Header.displayName);
    const sidebar: any = this.getNode(SideBar.displayName);
    const content: any = this.getNode(Content.displayName);

    return (
      <div className={s.container}>
        {header && <div className={s.header}>
          {header}
        </div>}
        <div className={s.main}>
          {sidebar && <div className={s.sidebar}>
            {sidebar}
          </div>}
          {content && <div className={s.content}>
            {content}
          </div>}
        </div>
      </div>
    );
  }
}

export default Layout;
