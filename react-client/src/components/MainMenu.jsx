import React from 'react';
import { Button, Modal, Icon, Link, Card } from 'semantic-ui-react';

const src = './assets/misc/testcardimage.png';

const MainMenu = () => (
  <Modal
    size="tiny"
    trigger={
      <Button
        icon
        circular
        size="huge"
        color="orange"
        className="menubutton"
      ><Icon name="tasks" />
      </Button>}
  >
    <Modal.Content>
      <Card.Group itemsPerRow={3}>
        <Card raised image={src} as={Link} href="/yard" header="yard" />
        <Card raised image={src} as={Link} href="/incubator" header="incubator" />
        <Card raised image={src} as={Link} href="/goals" header="goals" />
        <Card raised image={src} as={Link} href="/goals" header="deets" />
        <Card raised image={src} as={Link} href="/goals" header="squad" />
        <Card raised image={src} as={Link} href="/logout" header="logout" />
      </Card.Group>
    </Modal.Content>
  </Modal>
);

export default MainMenu;
