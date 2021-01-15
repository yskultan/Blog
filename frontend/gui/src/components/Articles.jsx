import React from "react";
import { List, Icon, Avatar } from "antd";
import { Link } from "react-router-dom";
import "./Articles.scss";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Articles extends React.Component {
  state = {
    likedArticles: []
  };

  render() {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 4
        }}
        dataSource={this.props.data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              // <IconText type="star-o" text="156" />,
              <IconText type="like-o" text={item.likes} />,
              <IconText type="message" text={item.comments_count} />
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://images.vexels.com/media/users/3/157970/isolated/preview/c156b4270aea292b9b335dd463ea17eb-earth-planet-icon-earth-icon-by-vexels.png" />
              }
              title={
                <div>
                  <p className="username">Автор: {item.user.username}</p>
                  <Link to={`/articles/${item.id}`}>{item.title}</Link>
                  <br />
                </div>
              }
              description={item.name}
            />
            {item.content.length > 200
              ? item.content.substr(0, 200) + "..."
              : item.content}
          </List.Item>
        )}
      />
    );
  }
}

export default Articles;
