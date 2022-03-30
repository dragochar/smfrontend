import React from 'react';
import TopBar from './topbar';
import { Layout } from 'antd';
const { Header, Content } = Layout;

export default function BasicLayout( props ) {

  return (
    <React.Fragment>
        <Header>
            <TopBar />
        </Header>
        <Content style={{ flex: 1 }}>{props.children}</Content>
    </React.Fragment>
  );
}