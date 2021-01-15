import React from "react";
import Articles from "../components/Articles";
import axios from "axios";
import ArticleForm from "../components/ArticleForm";
import { Modal, Button, Row, Col, List, Input } from "antd";
import "./ArticleList.scss";

class ArticleList extends React.Component {
  state = {
    articles: [],
    tags: ["Все"],
    countries: ["Все"],
    visible: false,
    choosedTag: "",
    choosedCountry: "",
    searchSrting: "",
    comments: null
  };

  async componentDidMount() {
    await axios
      .get("http://127.0.0.1:8000/api/articles/")
      .then(res => this.setState({ articles: [...res.data] }));

    await axios
      .get("http://127.0.0.1:8000/api/comments/")
      .then(res => this.setState({ comments: [...res.data] }));

    await axios
      .get("http://127.0.0.1:8000/api/country/")
      .then(res =>
        res.data.map(t => this.setState({ countries: [...this.state.countries, t.name] }))
      );

    await axios
    .get("http://127.0.0.1:8000/api/tag/")
    .then(res =>
      res.data.map(t => this.setState({ tags: [...this.state.tags, t.name] }))
    );
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChangeTag = tag =>
    tag === "Все"
      ? this.setState({ choosedTag: "" })
      : this.setState({ choosedTag: tag });

  handleChangeCountry = country =>
    country === "Все"
      ? this.setState({ choosedCountry: "" })
      : this.setState({ choosedCountry: country });
    

  handleSearch = e =>
    e.target.value === ""
      ? this.setState({ searchSrting: "" })
      : this.setState({ searchSrting: e.target.value });

  render() {
    let searchSrting = this.state.searchSrting.trim().toLowerCase();
    let articles = this.state.searchSrting
      ? this.state.articles.filter(a =>
          a.title.toLowerCase().match(searchSrting)
        )
      : this.state.articles;

    let choosedTag = this.state.choosedTag;
    if (this.state.choosedTag) {
      articles = articles.filter(a => a.tag.name === choosedTag);
    }

    let choosedCountry = this.state.choosedCountry;
    if (this.state.choosedCountry) {
      articles = articles.filter(a => a.country.name === choosedCountry);
    }

    const Search = Input.Search;
    return (
      <Row>
        <Col lg={{ span: 17, offset: 0 }} xs={{ span: 26 }}>
          <Articles data={articles} />

          <Modal
            title="Написание статьи"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            centered
            footer={null}
          >
            <ArticleForm
              requestType="post"
              articleID={null}
              btnText="Создать"
              {...this.props}
            />
          </Modal>
        </Col>
        <Col lg={{ span: 6, offset: 1 }} xs={{ span: 26 }}>
          <div className="sidebar">
            {localStorage.user ? (
              <Button
                className="create_article"
                type="primary"
                onClick={this.showModal}
              >
                Написать статью
              </Button>
            ) : (
              <p>Авторизируйтесь, чтобы написать статью.</p>
            )}
            <Search placeholder="Найти статью" onChange={this.handleSearch} />
            <br />
            <List
              size="small"
              header={
                <div>
                  <b>Страны</b>
                </div>
              }
              bordered
              dataSource={this.state.countries}
              renderItem={item => (
                <List.Item onClick={() => this.handleChangeCountry(item)}>
                  {item}
                </List.Item>
              )}
            />
            <br />
            <List
              size="small"
              header={
                <div>
                  <b>Разделы</b>
                </div>
              }
              bordered
              dataSource={this.state.tags}
              renderItem={item => (
                <List.Item onClick={() => this.handleChangeTag(item)}>
                  {item}
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default ArticleList;
