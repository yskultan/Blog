import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { List } from "antd";

class MyArticles extends React.Component {
  state = { myArticles: null };

  async componentDidMount() {
    let res = await axios.get(
      `http://127.0.0.1:8000/api/users/${localStorage.user}`
    );
    await console.log(res.data);
    await this.setState({ myArticles: res.data });
  }
  render() {
    // const data = this.state.myArticles;
    const data = this.state.myArticles;

    return this.state.myArticles ? (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/articles/${item.id}`}>{item.title}</Link>}
              description={
                item.content.length > 300
                  ? item.content.substr(0, 300) + "..."
                  : item.content
              }
            />
          </List.Item>
        )}
      />
    ) : (
      <h2>No data</h2>
    );
  }
}

export default MyArticles;
