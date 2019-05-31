import React from 'react'
import { Layout} from 'antd';
const { Header} = Layout;

export default function nav(props) {

    return (
        <div>
        <Header className="header">
          <div className="brand">
          {props.children}
          </div>
        </Header>
</div>
    )
}
