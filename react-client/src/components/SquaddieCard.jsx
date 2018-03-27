import React from 'react';
import { Card, Modal, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as squaddieActions from '../actions/squaddieActions';

const styles = {
  cardBackground: 'linear-gradient(to bottom, #faedc4, #ffebd8, #ffeff1, #fff8ff, #ffffff)',
};

class SquaddieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      yardstatus: false,
    };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  toggleSquaddieToYard(monID) {
    this.setState({ yardstatus: !this.state.yardstatus });
    this.props.squaddieActions.toggleYardStatus(monID);
  }

  show(dimmer, size) { this.setState({ dimmer, size, open: true }); }
  close() { this.setState({ open: false }); }

  render() {
    const {
      open, dimmer, size, yardstatus,
    } = this.state;

    return (

      <Modal
        trigger={
          <Card
            color="orange"
            raised
            image={this.props.squaddie.monster_icon}
            description={this.props.squaddie.monster_name}
            onClick={() => this.show(true, 'tiny')}
            className="squaddieicon"
          />
        }
        className="slideInDown"
        style={{ background: 'transparent', boxShadow: 'none' }}
        size={size}
        dimmer={dimmer}
        open={open}
        onClose={this.close}
      >
        <Modal.Content style={{ background: 'transparent' }}>
          <Card centered>
            <Image
              src={this.props.squaddie.monster_pic}
              style={{ backgroundImage: styles.cardBackground }}
            />
            <Card.Content>
              <Card.Header>
                {this.props.squaddie.monster_name}
              </Card.Header>
              <Card.Description>
                {this.props.squaddie.monster_description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                inverted
                floated="right"
                color={yardstatus ? 'red' : 'green'}
                content={yardstatus ? 'Remove From Yard' : 'Add to Yard'}
                onClick={() => { this.toggleSquaddieToYard(this.props.squaddie.monster_id); }}
              />
            </Card.Content>
          </Card>
        </Modal.Content>
      </Modal>
    );
  }
}

SquaddieCard.propTypes = {
  squaddieActions: PropTypes.objectOf(PropTypes.func).isRequired,
  squaddie: PropTypes.shape({
    monster_id: PropTypes.number,
    monster_name: PropTypes.string,
    monster_pic: PropTypes.string,
    monster_description: PropTypes.string,
    monster_icon: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    squaddieActions: bindActionCreators(squaddieActions, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(SquaddieCard);