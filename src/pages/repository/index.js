import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssuesList,
  ButtonContainer,
  ButtonFilter,
  ButtonPageContainer,
  ButtonPage,
} from './styles';
import Container from '../../components/Container/index';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    allActivity: false,
    openActivity: false,
    closedActivity: false,
    disable: true,
    page: 1,
  };

  async componentDidMount() {
    this.handleIssues('all');
    this.setState({
      allActivity: true,
    });
  }

  /**
   * function que faz as request das issues de acordo com o state e a page
   */
  handleIssues = async (state, page = 1) => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  };

  getState = () => {
    /*
      vejo qual o button que esta abilitado para pegar o state da issue
     */

    let state = '';
    const { openActivity, closedActivity, allActivity } = this.state;

    if (openActivity === true) {
      state = 'open';
    }

    if (closedActivity === true) {
      state = 'closed';
    }

    if (allActivity === true) {
      state = 'all';
    }

    return state;
  };

  handleDisableButton = () => {
    /**
     * verifico o numero da page e se ela for igual a 1 eu
     * desabilito o button de voltar
     */
    const { page } = this.state;
    if (page === 1) {
      this.setState({ disable: true });
    } else {
      this.setState({ disable: false });
    }
  };

  backPage = async () => {
    const state = this.getState();
    // pego o state da issue
    const { page } = this.state;
    this.setState({ loading: true });
    // chamo a function que retorna as issue passando a page -1 e o state
    this.handleIssues(state, page - 1);
    await this.setState({ page: page - 1 });
    // chamo a function que vai veriricar o numero da page e desabitar o button
    this.handleDisableButton();
  };

  nextPage = async () => {
    const state = this.getState();
    // pego o state da issue
    const { page } = this.state;
    this.setState({ loading: true });
    // chamo a function que retorna as issue passando a page + 1 e o state
    this.handleIssues(state, page + 1);
    await this.setState({ page: page + 1 });
    // chamo a function que vai veriricar o numero da page e desabitar o button
    this.handleDisableButton();
  };

  /**
   * functions responsaveis por fazer o filtro das issues
   */

  handleAll = async () => {
    await this.setState({ loading: true, page: 1 });
    this.handleDisableButton();
    this.handleIssues('all');

    this.setState({
      openActivity: false,
      closedActivity: false,
      allActivity: true,
    });
  };

  handleOpen = async () => {
    await this.setState({ loading: true, page: 1 });
    this.handleDisableButton();
    this.handleIssues('open');

    this.setState({
      openActivity: true,
      closedActivity: false,
      allActivity: false,
    });
  };

  handleClosed = async () => {
    await this.setState({ loading: true, page: 1 });
    this.handleDisableButton();
    this.handleIssues('closed');

    this.setState({
      openActivity: false,
      closedActivity: true,
      allActivity: false,
    });
  };

  /**
   * functions responsaveis por fazer o filtro das issues
   */

  render() {
    const {
      repository,
      issues,
      loading,
      allActivity,
      openActivity,
      closedActivity,
      disable,
    } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositorios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <ButtonContainer>
          <ButtonFilter activity={allActivity} onClick={this.handleAll}>
            all
          </ButtonFilter>
          <ButtonFilter activity={openActivity} onClick={this.handleOpen}>
            open
          </ButtonFilter>
          <ButtonFilter activity={closedActivity} onClick={this.handleClosed}>
            closed
          </ButtonFilter>
        </ButtonContainer>
        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
        <ButtonPageContainer>
          <ButtonPage disabled={disable} onClick={this.backPage}>
            <FaArrowLeft />
          </ButtonPage>
          <ButtonPage onClick={this.nextPage}>
            <FaArrowRight />
          </ButtonPage>
        </ButtonPageContainer>
      </Container>
    );
  }
}
