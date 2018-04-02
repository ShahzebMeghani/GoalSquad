import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Grid, Statistic, Segment, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import MainMenu from '../MainMenu';
import * as actions from '../actions';

class DeetsPage extends React.Component {
  constructor(props) {
    super(props);

    this.makeDisconnectButton = this.makeDisconnectButton.bind(this);
    if (!props.state.deets || props.state.needsUpdate) {
      props.actions.fetchStats();
      props.actions.turnOffUpdate();
    }
  }

  makeDisconnectButton() {
    if (this.props.state.user.fitbit_id) {
      return (
        <a href="/logout" >
          <Button onClick={() => {
            this.props.actions.deauthorizeFitbit();
          }}
          >
            Disconnect Fitbit
          </Button>
        </a>
      );
    }
    return <div />;
  }

  render() {
    const { deets } = this.props.state;

    const percentSuccess = (statSet) => {
      if (statSet.attempted - statSet.pending > 0) {
        return Math.ceil((statSet.success * 100) /
          (statSet.attempted - statSet.pending));
      }
      return 0;
    };

    const percentFailure = (statSet) => {
      if (statSet.attempted - statSet.pending > 0) {
        return Math.floor((statSet.fail * 100) /
          (statSet.attempted - statSet.pending));
      }
      return 0;
    };

    if (Object.keys(deets).length === 0) {
      return (<div />);
    }
    return (
      <div className="deetspage">
        <Grid centered>
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <Header as="h1" className="white" textAlign="right">Deets</Header>
            <Divider hidden />
            <Scrollbars autoHide style={{ height: '85vh' }}>
              <Segment.Group raised>
                <Segment compact>
                  <Header as="h2">{this.props.state.user.user_username}</Header>
                  <Header as="h4" sub>{deets.user.total.attempted} Lifetime Goals </Header>
                  {this.makeDisconnectButton()}
                </Segment>
              </Segment.Group>
              <Segment.Group raised>
                <Segment compact>
                  <Grid centered>
                    <Grid.Row columns={2} centered textAlign="center">
                      <Grid.Column width={8}>
                        <Statistic color="green" size="tiny">
                          <Statistic.Value>
                            {percentSuccess(deets.user.total)}%
                          </Statistic.Value>
                          <Statistic.Label>OF GOALS</Statistic.Label>
                          <Statistic.Value>COMPLETE</Statistic.Value>
                        </Statistic>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Statistic
                          color="red"
                          size="tiny"
                          floated="right"
                          style={{ marginRight: 5 }}
                        >
                          <Statistic.Value>
                            {percentFailure(deets.user.total)}%
                          </Statistic.Value>
                          <Statistic.Label>OF GOALS</Statistic.Label>
                          <Statistic.Value>FAILED</Statistic.Value>
                        </Statistic>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <Segment attached="bottom" compact>
                  <Grid centered>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Statistic horizontal size="mini">
                          <Statistic.Value>
                            {percentSuccess(deets.global.total)}%
                          </Statistic.Value>
                          <Statistic.Label>Global<br />Average</Statistic.Label>
                        </Statistic>
                        <Statistic
                          horizontal
                          floated="right"
                          size="mini"
                          style={{ marginRight: 5 }}
                        >
                          <Statistic.Value>
                            {percentFailure(deets.global.total)}%
                          </Statistic.Value>
                          <Statistic.Label>Global<br />Average</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Segment.Group>
              <Segment.Group raised>
                {Object.keys(deets.user).map((activity) => {
                  if (activity !== 'total' && activity !== 'custom') {
                    return (
                      <Segment key={activity}>
                        <Statistic
                          key={activity}
                          horizontal
                          size="tiny"
                          label={activity}
                          value={deets.user[activity].amountComplete
                            - deets.user[activity].amountStart}
                        />
                      </Segment>
                    );
                  }
                  return (<div key={activity} />);
                })}
              </Segment.Group>
            </Scrollbars>
          </Grid.Column>
          <MainMenu history={this.props.history} />
        </Grid>
      </div>
    );
  }
}

DeetsPage.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  state: PropTypes.shape({
    user: PropTypes.object,
    deets: PropTypes.object,
    needsUpdate: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => (
  {
    state: state.main,
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(actions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DeetsPage);