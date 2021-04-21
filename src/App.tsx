import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Layout from './Layout/DisplayLayout';
import CodeDance from './components/CodeDance';
import NumberDance from './components/NumberDance';
import AccordionFlow from './components/AccordionFlow';

const routes = [
  { name: '字符跳动', path: '/codedance', component: CodeDance },
  { name: '数字跳动', path: '/numberdance', component: NumberDance },
  { name: '故事线', path: '/accordionflow', component: AccordionFlow },
];

function App() {
  return (
    <Router>
      <Layout>
        {/* <Layout.Header>Header</Layout.Header> */}
        <Layout.SideBar>
          <div className="border-b px-8 py-4 text-xl text-center">D3.js学习</div>
          <ul className="w-full pt-2">
            {routes.map(item => (
              <li key={item.path} className="px-10 py-2 text-gray-500 hover:text-gray-900 cursor-pointer">
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </Layout.SideBar>
        <Layout.Content>
          {routes.map(item => (
            <Route key={item.path} path={item.path} component={item.component} />
          ))}
        </Layout.Content>
      </Layout>
    </Router>
  );
};

export default App;
